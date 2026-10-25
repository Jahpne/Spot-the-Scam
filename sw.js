/* ==========================================================================
   sw.js  |  SPOT THE SCAM  (Service Worker)
   ========================================================================== */
const VERSION = 'v3';
const CACHE = 'spot-the-scam-' + VERSION;

const ASSETS = [
  './',
  './index.html',
  './style.css',
  './data.js',
  './game.js',
  './checker.js',
  './scan.js',
  './manifest.json',
  'https://scam-db-five.vercel.app/scam-db.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k.startsWith('spot-the-scam-') && k !== CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => {
      return hit || fetch(req).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
