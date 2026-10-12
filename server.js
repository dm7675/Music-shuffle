const http = require("node:http");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");

const root = __dirname;
const localEnvPath = path.join(root, ".env");
if (fs.existsSync(localEnvPath)) {
  const localEnvironment = fs.readFileSync(localEnvPath, "utf8");
  for (const line of localEnvironment.split(/\r?\n/)) {
    const match = /^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/.exec(line);
    if (!match || process.env[match[1]] !== undefined) continue;
    const value = match[2].replace(/^(['"])(.*)\1$/, "$2");
    process.env[match[1]] = value;
  }
}
const port = Number(process.env.PORT || 4173);
const renderHostname = process.env.RENDER_EXTERNAL_HOSTNAME;
const configuredOrigin = process.env.PUBLIC_ORIGIN || (renderHostname ? `https://${renderHostname}` : "");
let publicOrigin = "";
if (configuredOrigin) {
  let parsedOrigin;
  try {
    parsedOrigin = new URL(configuredOrigin);
  } catch {
    throw new Error("PUBLIC_ORIGIN must be a valid HTTPS origin, such as https://side-b.onrender.com");
  }
  if (parsedOrigin.protocol !== "https:" || parsedOrigin.username || parsedOrigin.password || parsedOrigin.pathname !== "/" || parsedOrigin.search || parsedOrigin.hash) {
    throw new Error("PUBLIC_ORIGIN must be an HTTPS origin without a path, query, or fragment");
  }
  publicOrigin = parsedOrigin.origin;
}
const expectedOrigin = publicOrigin || `http://127.0.0.1:${port}`;
const expectedHost = new URL(expectedOrigin).host;
const bindHost = publicOrigin ? "0.0.0.0" : "127.0.0.1";
const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml"
};

function reject(response, status, message) {
  response.writeHead(status, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  }).end(message);
}

function base64Url(value) {
  return Buffer.from(value).toString("base64url");
}

function createAppleMusicDeveloperToken() {
  const teamId = process.env.APPLE_MUSIC_TEAM_ID;
  const keyId = process.env.APPLE_MUSIC_KEY_ID;
  const privateKey = process.env.APPLE_MUSIC_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!teamId || !keyId || !privateKey) return null;

  const issuedAt = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "ES256", kid: keyId }));
  const payload = base64Url(JSON.stringify({
    iss: teamId,
    iat: issuedAt,
    exp: issuedAt + 60 * 60 * 24 * 180
  }));
  const unsignedToken = `${header}.${payload}`;
  const signature = crypto.sign("sha256", Buffer.from(unsignedToken), {
    key: privateKey,
    dsaEncoding: "ieee-p1363"
  });
  return `${unsignedToken}.${signature.toString("base64url")}`;
}

function sendProviderConfig(response) {
  let appleMusic = { configured: false, developerToken: null };
  if (process.env.APPLE_MUSIC_TEAM_ID && process.env.APPLE_MUSIC_KEY_ID && process.env.APPLE_MUSIC_PRIVATE_KEY) {
    try {
      appleMusic = { configured: true, developerToken: createAppleMusicDeveloperToken() };
    } catch (error) {
      console.error("Could not sign the Apple Music developer token:", error.message);
      reject(response, 500, "Apple Music server credentials are invalid");
      return;
    }
  }

  const config = {
    spotify: { clientId: process.env.SPOTIFY_CLIENT_ID || "" },
    appleMusic,
    tidal: {
      clientId: process.env.TIDAL_CLIENT_ID || "",
      configured: Boolean(process.env.TIDAL_CLIENT_ID && process.env.TIDAL_CLIENT_SECRET)
    },
    deezer: {
      appId: process.env.DEEZER_APP_ID || "",
      configured: Boolean(process.env.DEEZER_APP_ID && process.env.DEEZER_APP_SECRET)
    },
    youtubeMusic: {
      clientId: process.env.YOUTUBE_CLIENT_ID || "",
      configured: Boolean(process.env.YOUTUBE_CLIENT_ID && process.env.YOUTUBE_CLIENT_SECRET)
    }
  };
  response.writeHead(200, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  }).end(JSON.stringify(config));
}

async function forwardRequest(response, targetUrl, request, headers, body) {
  let upstream;
  try {
    upstream = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
      signal: AbortSignal.timeout(15_000)
    });
  } catch (error) {
    const timedOut = error.name === "TimeoutError" || error.name === "AbortError";
    reject(response, 502, timedOut ? "Music provider request timed out" : "Could not reach music provider");
    console.error(`Music provider request failed for ${new URL(targetUrl).host}:`, error.message);
    return;
  }

  const payload = Buffer.from(await upstream.arrayBuffer());
  response.writeHead(upstream.status, {
    "Content-Type": upstream.headers.get("content-type") || "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  }).end(payload);
}

async function readRequestBody(request, response) {
  const chunks = [];
  let bodyBytes = 0;
  for await (const chunk of request) {
    bodyBytes += chunk.length;
    if (bodyBytes > 1_000_000) {
      reject(response, 413, "Request body too large");
      return null;
    }
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

async function proxyProviderToken(request, response, requestUrl) {
  const provider = requestUrl.pathname.split("/")[2];
  const target = provider === "tidal"
    ? { host: "auth.tidal.com", path: "/v1/oauth2/token", clientId: process.env.TIDAL_CLIENT_ID, secret: process.env.TIDAL_CLIENT_SECRET }
    : provider === "youtube"
      ? { host: "oauth2.googleapis.com", path: "/token", clientId: process.env.YOUTUBE_CLIENT_ID, secret: process.env.YOUTUBE_CLIENT_SECRET }
      : null;
  if (!target || !target.clientId || !target.secret) {
    reject(response, 503, "This music provider is not configured on the server");
    return;
  }
  if (request.method !== "POST" || requestUrl.search) {
    reject(response, 405, "Method not allowed");
    return;
  }
  const body = await readRequestBody(request, response);
  if (body === null) return;
  const form = new URLSearchParams(body.toString("utf8"));
  if (!["authorization_code", "refresh_token"].includes(form.get("grant_type"))) {
    reject(response, 400, "Unsupported token grant");
    return;
  }
  form.set("client_id", target.clientId);
  form.set("client_secret", target.secret);
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded"
  };
  if (provider === "tidal") {
    headers.Authorization = `Basic ${Buffer.from(`${target.clientId}:${target.secret}`).toString("base64")}`;
    form.delete("client_secret");
  }
  await forwardRequest(
    response,
    `https://${target.host}${target.path}`,
    { method: request.method },
    headers,
    form.toString()
  );
}

async function proxyMusicProvider(request, response, requestUrl) {
  let pathname;
  try {
    pathname = decodeURIComponent(requestUrl.pathname);
  } catch {
    reject(response, 400, "Invalid provider API path");
    return;
  }
  const segments = pathname.split("/").filter(Boolean);
  const provider = segments[1];
  const target = {
    apple: { host: "api.music.apple.com", prefix: "/v1/" },
    tidal: { host: "openapi.tidal.com", prefix: "/v2/" },
    deezer: { host: "api.deezer.com", prefix: "/" },
    youtube: { host: "www.googleapis.com", prefix: "/youtube/v3/" }
  }[provider];
  const targetPath = `/${segments.slice(2).join("/")}`;
  const methodAllowed = ["GET", "POST", "PUT", "DELETE"].includes(request.method);
  if (!target || !methodAllowed || !targetPath.startsWith(target.prefix)
    || targetPath.split("/").some((segment) => segment === "." || segment === ".." || segment.includes("\\"))) {
    reject(response, 404, "Music provider API route not found");
    return;
  }
  if (provider === "apple" && !process.env.APPLE_MUSIC_TEAM_ID) {
    reject(response, 503, "Apple Music is not configured on the server");
    return;
  }
  if (provider === "tidal" && !process.env.TIDAL_CLIENT_ID) {
    reject(response, 503, "TIDAL is not configured on the server");
    return;
  }
  if (provider === "deezer" && !process.env.DEEZER_APP_ID) {
    reject(response, 503, "Deezer is not configured on the server");
    return;
  }
  if (provider === "youtube" && !process.env.YOUTUBE_CLIENT_ID) {
    reject(response, 503, "YouTube is not configured on the server");
    return;
  }

  const authorization = request.headers.authorization;
  const headers = { Accept: "application/json" };
  if (authorization && provider !== "deezer") headers.Authorization = authorization;
  if (provider === "apple" && request.headers["music-user-token"]) {
    headers["Music-User-Token"] = request.headers["music-user-token"];
  }
  if (request.headers["content-type"]) headers["Content-Type"] = request.headers["content-type"];

  const upstreamUrl = new URL(`https://${target.host}${targetPath}`);
  upstreamUrl.search = requestUrl.search;
  if (provider === "deezer" && authorization?.startsWith("Bearer ")) {
    upstreamUrl.searchParams.set("access_token", authorization.slice("Bearer ".length));
  }
  if (provider === "youtube" && process.env.YOUTUBE_API_KEY) {
    upstreamUrl.searchParams.set("key", process.env.YOUTUBE_API_KEY);
  }
  const body = ["GET", "HEAD"].includes(request.method) ? undefined : await readRequestBody(request, response);
  if (body === null) return;
  await forwardRequest(response, upstreamUrl, request, headers, body);
}

async function proxySpotify(request, response, requestUrl) {
  const targetPath = requestUrl.pathname === "/spotify/token"
    ? "/api/token"
    : requestUrl.pathname.replace(/^\/spotify\/api/, "");
  const targetHost = requestUrl.pathname === "/spotify/token"
    ? "accounts.spotify.com"
    : "api.spotify.com";
  const methodAllowed = requestUrl.pathname === "/spotify/token"
    ? request.method === "POST"
    : ["GET", "POST", "PUT"].includes(request.method);
  if (!methodAllowed) {
    reject(response, 405, "Method not allowed");
    return;
  }
  if (targetHost === "api.spotify.com" && (!targetPath.startsWith("/v1/") || targetPath.includes(".."))) {
    reject(response, 404, "Spotify API route not found");
    return;
  }
  if (targetHost === "accounts.spotify.com" && requestUrl.search) {
    reject(response, 400, "Unexpected token request parameters");
    return;
  }

  const chunks = [];
  let bodyBytes = 0;
  for await (const chunk of request) {
    bodyBytes += chunk.length;
    if (bodyBytes > 1_000_000) {
      reject(response, 413, "Request body too large");
      return;
    }
    chunks.push(chunk);
  }

  const headers = { Accept: "application/json" };
  const contentType = request.headers["content-type"];
  const authorization = request.headers.authorization;
  if (contentType) headers["Content-Type"] = contentType;
  if (authorization && targetHost === "api.spotify.com") headers.Authorization = authorization;

  let upstream;
  try {
    upstream = await fetch(`https://${targetHost}${targetPath}${requestUrl.search}`, {
      method: request.method,
      headers,
      body: chunks.length && request.method !== "GET" ? Buffer.concat(chunks) : undefined,
      signal: AbortSignal.timeout(15_000)
    });
  } catch (error) {
    const timedOut = error.name === "TimeoutError" || error.name === "AbortError";
    reject(response, 502, timedOut ? "Spotify request timed out" : "Could not reach Spotify");
    console.error(`Spotify proxy request failed for ${targetPath}:`, error.message);
    return;
  }

  const payload = Buffer.from(await upstream.arrayBuffer());
  response.writeHead(upstream.status, {
    "Content-Type": upstream.headers.get("content-type") || "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  }).end(payload);
}

http.createServer(async (request, response) => {
  if (request.headers.host !== expectedHost) {
    reject(response, 403, "This server only accepts requests for its configured origin");
    return;
  }

  let requestUrl;
  try {
    requestUrl = new URL(request.url, `http://${request.headers.host}`);
  } catch {
    reject(response, 400, "Bad request");
    return;
  }

  const origin = request.headers.origin;
  if (origin && origin !== expectedOrigin) {
    reject(response, 403, "Cross-origin requests are not allowed");
    return;
  }

  if (requestUrl.pathname === "/platform-config" && request.method === "GET") {
    sendProviderConfig(response);
    return;
  }
  if (/^\/provider-token\/(tidal|youtube)$/.test(requestUrl.pathname)) {
    await proxyProviderToken(request, response, requestUrl);
    return;
  }
  if (/^\/provider-api\/(apple|tidal|deezer|youtube)\//.test(requestUrl.pathname)) {
    await proxyMusicProvider(request, response, requestUrl);
    return;
  }

  if (requestUrl.pathname === "/spotify/token" || requestUrl.pathname.startsWith("/spotify/api/")) {
    await proxySpotify(request, response, requestUrl);
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(requestUrl.pathname);
  } catch {
    response.writeHead(400).end("Bad request");
    return;
  }

  const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const filePath = path.resolve(root, relativePath);
  if (!filePath.startsWith(`${root}${path.sep}`)) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(error.code === "ENOENT" ? 404 : 500).end("File not found");
      return;
    }
    response.writeHead(200, {
      "Content-Type": types[path.extname(filePath)] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer"
    }).end(content);
  });
}).listen(port, bindHost, () => {
  console.log(`Side B is running on ${bindHost}:${port}`);
});
