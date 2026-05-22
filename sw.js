8px// ─── SOPilot Service Worker ───────────────────────────────────────────────
// Toastid Tech LLC · sopilot-v4
// Cache-first strategy for offline capability

const CACHE_NAME = 'sopilot-v4';

const STATIC_ASSETS = [
  '/sopilot/',
  '/sopilot/index.html',
  '/sopilot/manifest.json',
  '/sopilot/logo-192.png',
  '/sopilot/logo-512.png'
];

const EXTERNAL_ASSETS = [
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,300&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap'
];

// ── Install: pre-cache static assets ──────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('[SOPilot SW] Pre-cache failed for some assets:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// ── Activate: clear old caches ─────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SOPilot SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: cache-first for static, network-first for API ──────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Always pass through Cloudflare Worker API calls — never cache
  if (url.hostname.includes('workers.dev')) {
    return; // Let browser handle normally
  }

  // Always pass through Anthropic API calls
  if (url.hostname.includes('anthropic.com')) {
    return;
  }

  // Network-first for Google Fonts (allows updates)
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        }
        .catch(() => caches.match(request))
    );
    return;
  }

  // Cache-first 
  event.respondWith(
  caches.match(request).then(cached => {
    if (cached) return cached;
    return fetch(request).then(response => {
      if (!response || response.status !== 200 || response.type === 'opaque') {
        return response;
      }
      const clone = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
      return response; // Add this line to return the network response
    });
  })
);

        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
});
