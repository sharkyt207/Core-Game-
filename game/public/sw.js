/**
 * Service worker — makes COREBREAKER playable offline once it has been opened
 * a single time, which is what lets it behave like an installed app.
 *
 * Strategy per request type:
 *   navigations  -> network first, fall back to the cached shell (so a fresh
 *                   deploy is picked up when online, but a tunnel/plane still works)
 *   everything   -> cache first (Vite ships content-hashed filenames, so a cached
 *   else          asset is never stale; a new build simply requests new names)
 *
 * The cache name carries a version — bumping it drops every old entry on activate.
 */
const CACHE = "corebreaker-v1";
const SHELL = "./index.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll([SHELL, "./manifest.webmanifest", "./icons/icon-192.png"]))
      .catch(() => {
        /* a missing optional asset must never block installation */
      })
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // never touch cross-origin

  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(SHELL, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(SHELL).then((r) => r || Response.error())),
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          // Only cache real, complete responses.
          if (res && res.status === 200 && res.type === "basic") {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        }),
    ),
  );
});
