const CACHE = 'reset-life-v3.6.4-final';
const ASSETS = [
  './', './index.html', './styles.css?v=3.6.4-final', './app.js?v=3.6.4-final', './manifest.webmanifest',
  './VERSION.txt', './icons/icon-180.png', './icons/icon-192.png', './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  const isNavigation = event.request.mode === 'navigate';
  event.respondWith(
    fetch(event.request, { cache: 'no-store' }).then(response => {
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(CACHE).then(cache => {
          if (isNavigation) cache.put('./index.html', copy);
          else cache.put(event.request, copy);
        });
      }
      return response;
    }).catch(async () => {
      const cached = await caches.match(event.request);
      if (cached) return cached;
      if (isNavigation) return caches.match('./index.html');
      return Response.error();
    })
  );
});
