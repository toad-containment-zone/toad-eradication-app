// Service worker for the Toad Eradication app shell.
// Caches the single-file app so it opens instantly with zero signal; a background
// fetch on every load keeps the cache fresh for next time (stale-while-revalidate).
// The app itself still needs a live connection to sync records to ODK Central —
// this only covers the app shell loading, not the sync path.
const CACHE_NAME = 'tcz-eradication-shell-v1';
const APP_SHELL = ['./', './index.html', './toad-eradication-app.html', './manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Only the app shell and the Esri imagery tiles go through the cache. Everything else
// cross-origin (ODK Central's form manifest and site-list CSV) goes straight to the network:
// teammates poll that list waiting for a just-created site, and a cached copy would hide it.
function isCacheable(url) {
  return url.origin === self.location.origin || url.hostname === 'server.arcgisonline.com';
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (!isCacheable(new URL(event.request.url))) return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
