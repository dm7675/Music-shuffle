const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");

const root = __dirname;
const port = Number(process.env.PORT || 4173);
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

async function proxySpotify(request, response, requestUrl) {
  const targetPath = requestUrl.pathname === "/spotify/token"
    ? "/api/token"
    : requestUrl.pathname.replace(/^\/spotify\/api/, "");
  const targetHost = requestUrl.pathname === "/spotify/token"
    ? "accounts.spotify.com"
    : "api.spotify.com";
  const methodAllowed = requestUrl.pathname === "/spotify/token"
    ? request.method === "POST"
    : ["GET", "POST"].includes(request.method);
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
  if (request.headers.host !== `127.0.0.1:${port}`) {
    reject(response, 403, "This development server is restricted to 127.0.0.1");
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
  if (origin && origin !== `http://127.0.0.1:${port}`) {
    reject(response, 403, "Cross-origin requests are not allowed");
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
}).listen(port, "127.0.0.1", () => {
  console.log(`Side B is running at http://127.0.0.1:${port}/`);
});
