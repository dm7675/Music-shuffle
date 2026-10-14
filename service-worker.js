const CACHE_NAME = "sideb-app-shell-v28";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./music-platforms.js",
  "./listening-rules.js",
  "./manifest.json",
  "./icon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);
  if (event.request.method !== "GET" || requestUrl.origin !== self.location.origin
    || requestUrl.pathname.startsWith("/spotify/")
    || requestUrl.pathname.startsWith("/provider-")
    || requestUrl.pathname.startsWith("/api/")
    || requestUrl.pathname === "/platform-config") return;

  // Network first, so an update reaches the phone on the next load; the cache is only for offline use.
  // (Serving the cache first ran old app code against a new page after every deploy.)
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          void caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        return (await cache.match(event.request))
          || (event.request.mode === "navigate" ? cache.match("./index.html") : Response.error());
      })
  );
});
