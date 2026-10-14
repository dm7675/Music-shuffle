const http = require("node:http");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");
const { createAccountStore, sanitizeTrack } = require("./account-store.js");
const { createListeningSync } = require("./listening-sync.js");

const root = __dirname;
const defaultSpotifyClientId = "a2dd74d7ba8c439191d270fad6d2801a";
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
const secureCookies = expectedOrigin.startsWith("https:");
// The __Host- prefix makes browsers refuse the cookie unless it is Secure, host-only, and on Path=/.
const sessionCookieName = secureCookies ? "__Host-sideb_session" : "sideb_session";
// Only these files are served, so .env, the database, and server code are never downloadable.
const publicFiles = new Set([
  "index.html",
  "app.js",
  "styles.css",
  "music-platforms.js",
  "listening-rules.js",
  "service-worker.js",
  "manifest.json",
  "icon.svg"
]);

// Saved sign-ins and background listening need an encryption key. Local development gets one generated
// into the ignored .env file; a hosted server must be given TOKEN_ENCRYPTION_KEY explicitly.
if (!process.env.TOKEN_ENCRYPTION_KEY && !publicOrigin) {
  process.env.TOKEN_ENCRYPTION_KEY = crypto.randomBytes(32).toString("hex");
  fs.appendFileSync(localEnvPath, `${fs.existsSync(localEnvPath) ? "\n" : ""}TOKEN_ENCRYPTION_KEY=${process.env.TOKEN_ENCRYPTION_KEY}\n`);
  console.log("Generated a local TOKEN_ENCRYPTION_KEY in .env for saved Spotify sign-ins.");
}
let accounts = null;
let listeningSync = null;
if (process.env.TOKEN_ENCRYPTION_KEY) {
  try {
    accounts = createAccountStore({
      databasePath: process.env.DATABASE_PATH || path.join(root, "data", "sideb.db"),
      encryptionKey: process.env.TOKEN_ENCRYPTION_KEY
    });
    listeningSync = createListeningSync({ store: accounts });
    listeningSync.start(Math.max(5, Number(process.env.SYNC_INTERVAL_MINUTES) || 20));
  } catch (error) {
    accounts = null;
    listeningSync = null;
    console.error("Saved sign-ins and background listening are off:", error.message);
  }
} else {
  console.warn("TOKEN_ENCRYPTION_KEY is not set, so saved sign-ins and background listening are off.");
}
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
    spotify: { clientId: process.env.SPOTIFY_CLIENT_ID || defaultSpotifyClientId },
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
  const retryAfter = upstream.headers.get("retry-after");
  response.writeHead(upstream.status, {
    "Content-Type": upstream.headers.get("content-type") || "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    // Spotify's "slow down" replies say when to try again; the browser needs that to wait.
    ...(retryAfter ? { "Retry-After": retryAfter } : {})
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
  const targetPath = requestUrl.pathname.replace(/^\/spotify\/api/, "");
  if (!["GET", "POST", "PUT"].includes(request.method)) {
    reject(response, 405, "Method not allowed");
    return;
  }
  if (!targetPath.startsWith("/v1/") || targetPath.includes("..")) {
    reject(response, 404, "Spotify API route not found");
    return;
  }
  const body = request.method === "GET" ? undefined : await readRequestBody(request, response);
  if (body === null) return;

  const headers = { Accept: "application/json" };
  if (request.headers["content-type"]) headers["Content-Type"] = request.headers["content-type"];
  if (request.headers.authorization) headers.Authorization = request.headers.authorization;
  await forwardRequest(response, `https://api.spotify.com${targetPath}${requestUrl.search}`, request, headers,
    body?.length ? body : undefined);
}

function sendJson(response, status, body, extraHeaders = {}) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    ...extraHeaders
  }).end(body === undefined ? undefined : JSON.stringify(body));
}

function readCookie(request, name) {
  for (const part of (request.headers.cookie || "").split(";")) {
    const separator = part.indexOf("=");
    if (separator > 0 && part.slice(0, separator).trim() === name) return part.slice(separator + 1).trim();
  }
  return null;
}

function sessionCookie(value, maxAgeSeconds) {
  return [`${sessionCookieName}=${value}`, "Path=/", "HttpOnly", "SameSite=Lax", `Max-Age=${maxAgeSeconds}`,
    ...(secureCookies ? ["Secure"] : [])].join("; ");
}

function sessionUser(request) {
  return accounts?.findSessionUser(readCookie(request, sessionCookieName)) || null;
}

// The browser never receives the refresh token once the server keeps it; it asks here for fresh access tokens.
async function refreshFromSession(request, response, force) {
  const user = sessionUser(request);
  if (!user) {
    sendJson(response, 401, { error: "not_signed_in", error_description: "Connect Spotify to continue." });
    return;
  }
  if (user.needs_reconnect || !user.refresh_token_enc) {
    sendJson(response, 401, { error: "reconnect_required", error_description: user.sync_error || "Reconnect Spotify." });
    return;
  }
  try {
    const token = await listeningSync.accessTokenFor(user, { force });
    sendJson(response, 200, {
      access_token: token.accessToken,
      token_type: "Bearer",
      expires_in: Math.max(60, Math.floor((token.expiresAt - Date.now()) / 1000)),
      scope: token.scope,
      server_session: true
    });
  } catch (error) {
    sendJson(response, error.needsReconnect ? 401 : 502, {
      error: error.needsReconnect ? "reconnect_required" : "refresh_failed",
      error_description: error.message
    });
  }
}

// After Spotify sign-in, keep the refresh token encrypted on the server and give the browser a session cookie.
async function startServerSession(response, form, payload) {
  const profileResponse = await fetch("https://api.spotify.com/v1/me", {
    headers: { Accept: "application/json", Authorization: `Bearer ${payload.access_token}` },
    signal: AbortSignal.timeout(15_000)
  });
  const profile = await profileResponse.json().catch(() => null);
  if (!profileResponse.ok || typeof profile?.id !== "string") throw new Error(`Spotify profile lookup failed (${profileResponse.status}).`);
  accounts.upsertUser({
    id: profile.id,
    displayName: profile.display_name,
    clientId: form.get("client_id"),
    refreshToken: payload.refresh_token,
    scope: payload.scope
  });
  listeningSync.rememberAccessToken(profile.id, payload);
  const session = accounts.createSession(profile.id);
  const { refresh_token: _kept, ...browserPayload } = payload;
  sendJson(response, 200, { ...browserPayload, server_session: true }, {
    "Set-Cookie": sessionCookie(session.token, session.maxAgeSeconds)
  });
  void listeningSync.syncUser(profile.id).catch((error) => console.error("First listening sync failed:", error.message));
}

async function handleSpotifyToken(request, response, requestUrl) {
  if (request.method !== "POST") {
    reject(response, 405, "Method not allowed");
    return;
  }
  if (requestUrl.search) {
    reject(response, 400, "Unexpected token request parameters");
    return;
  }
  const body = await readRequestBody(request, response);
  if (body === null) return;
  const form = new URLSearchParams(body.toString("utf8"));
  if (form.get("grant_type") === "refresh_token" && !form.get("refresh_token")) {
    if (!accounts) {
      sendJson(response, 401, { error: "not_signed_in", error_description: "Connect Spotify to continue." });
      return;
    }
    await refreshFromSession(request, response, form.get("force") === "true");
    return;
  }
  form.delete("force");

  let upstream;
  try {
    upstream = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
      signal: AbortSignal.timeout(15_000)
    });
  } catch (error) {
    const timedOut = error.name === "TimeoutError" || error.name === "AbortError";
    reject(response, 502, timedOut ? "Spotify sign-in timed out" : "Could not reach Spotify sign-in");
    console.error("Spotify token request failed:", error.message);
    return;
  }
  const payload = await upstream.json().catch(() => null);
  if (upstream.ok && accounts && form.get("grant_type") === "authorization_code" && payload?.refresh_token) {
    try {
      await startServerSession(response, form, payload);
      return;
    } catch (error) {
      // Signing in still works without the server account; the browser keeps the token as before.
      console.error("Could not save the Spotify sign-in on the server:", error.message);
    }
  }
  sendJson(response, upstream.status, payload || { error: "invalid_response" });
}

function applyListeningEvent(userId, event) {
  const at = Date.now();
  if (event?.type === "heard" || event?.type === "skip") {
    const track = sanitizeTrack(event.track);
    if (!track) return;
    accounts.recordAppEvent(userId, track.id, at);
    if (event.type === "heard") {
      accounts.markHeard(userId, track, { discovery: event.discovery === true, at });
    } else {
      const progressRatio = Math.min(1, Math.max(0, Number(event.progressRatio) || 0));
      accounts.applySkip(userId, track, progressRatio, at);
    }
  } else if (event?.type === "release" && typeof event.trackId === "string" && event.trackId.length <= 120) {
    accounts.releaseHold(userId, event.trackId, event.blocked === true, at);
  } else if (event?.type === "like") {
    const track = sanitizeTrack(event.track);
    if (track) accounts.setLiked(userId, track, event.liked === true, at);
  } else if (event?.type === "remove-discovery" && typeof event.trackId === "string" && event.trackId.length <= 120) {
    accounts.removeDiscovery(userId, event.trackId);
  } else if (event?.type === "clear" && ["held", "discoveries"].includes(event.list)) {
    accounts.clearList(userId, event.list);
  }
}

async function readJsonBody(request, response) {
  const body = await readRequestBody(request, response);
  if (body === null) return undefined;
  try {
    return body.length ? JSON.parse(body.toString("utf8")) : {};
  } catch {
    reject(response, 400, "Invalid JSON");
    return undefined;
  }
}

async function handleAccountApi(request, response, requestUrl) {
  if (!accounts) {
    sendJson(response, 503, { error: "Saved sign-ins are not set up on this server." });
    return;
  }
  // Browsers always send Origin on these requests, so its absence means it didn't come from Side B's page.
  if (request.method !== "GET" && request.headers.origin !== expectedOrigin) {
    reject(response, 403, "Cross-origin requests are not allowed");
    return;
  }
  const user = sessionUser(request);
  if (!user) {
    sendJson(response, 401, { error: "Not signed in." });
    return;
  }
  const clearCookie = { "Set-Cookie": sessionCookie("", 0) };
  const route = `${request.method} ${requestUrl.pathname}`;
  if (route === "GET /api/listening") {
    sendJson(response, 200, { listening: accounts.listeningState(user.id) });
  } else if (route === "GET /api/listening/plays") {
    // The play log behind "Today" and "This week"; Spotify itself only returns the last 50 plays.
    const monthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const since = Math.max(monthAgo, Number(requestUrl.searchParams.get("since")) || monthAgo);
    const plays = accounts.recentPlays(user.id, since).map(({ playedAt, track }) => ({ playedAt, track }));
    sendJson(response, 200, { plays });
  } else if (route === "POST /api/listening/sync") {
    let recorded = null;
    let syncError = null;
    try {
      recorded = await listeningSync.syncUser(user.id, { minIntervalMs: 60_000 });
    } catch (error) {
      syncError = error.message;
    }
    sendJson(response, 200, { listening: accounts.listeningState(user.id), recorded, syncError });
  } else if (route === "POST /api/listening/events") {
    const body = await readJsonBody(request, response);
    if (body === undefined) return;
    if (!Array.isArray(body.events) || body.events.length > 50) {
      reject(response, 400, "Expected up to 50 listening events");
      return;
    }
    accounts.transaction(() => body.events.forEach((event) => applyListeningEvent(user.id, event)));
    sendJson(response, 200, { listening: accounts.listeningState(user.id) });
  } else if (route === "GET /api/saved-mixes") {
    sendJson(response, 200, accounts.savedMixes(user.id));
  } else if (route === "PUT /api/saved-mixes") {
    const body = await readJsonBody(request, response);
    if (body === undefined) return;
    if (!Array.isArray(body.mixes) || body.mixes.length > 300 || !Number.isFinite(body.updatedAt)) {
      reject(response, 400, "Expected up to 300 saved mixes and an update time");
      return;
    }
    // Last change wins: an older copy from another device doesn't overwrite a newer one.
    const current = accounts.savedMixes(user.id);
    if (body.updatedAt >= current.updatedAt) accounts.putSavedMixes(user.id, body.mixes, body.updatedAt);
    sendJson(response, 200, accounts.savedMixes(user.id));
  } else if (route === "POST /api/listening/import") {
    const body = await readJsonBody(request, response);
    if (body === undefined) return;
    accounts.importLocal(user.id, body);
    sendJson(response, 200, { listening: accounts.listeningState(user.id) });
  } else if (route === "POST /api/logout") {
    accounts.deleteSession(readCookie(request, sessionCookieName));
    sendJson(response, 204, undefined, clearCookie);
  } else if (route === "DELETE /api/account") {
    accounts.deleteUser(user.id);
    listeningSync.forget(user.id);
    sendJson(response, 204, undefined, clearCookie);
  } else {
    reject(response, 404, "Not found");
  }
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

  if (requestUrl.pathname === "/spotify/token") {
    await handleSpotifyToken(request, response, requestUrl);
    return;
  }
  if (requestUrl.pathname.startsWith("/spotify/api/")) {
    await proxySpotify(request, response, requestUrl);
    return;
  }
  if (requestUrl.pathname.startsWith("/api/")) {
    await handleAccountApi(request, response, requestUrl);
    return;
  }

  const relativePath = requestUrl.pathname === "/" ? "index.html" : requestUrl.pathname.slice(1);
  if (!["GET", "HEAD"].includes(request.method) || !publicFiles.has(relativePath)) {
    response.writeHead(404).end("File not found");
    return;
  }
  const filePath = path.join(root, relativePath);

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
