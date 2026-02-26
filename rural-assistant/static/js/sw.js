// const CACHE_NAME = 'rural-assistant-v1';
// const ASSETS = [
//     '/',
//     '/static/css/style.css',
//     '/static/js/main.js',
//     'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'
// ];

// self.addEventListener('install', (event) => {
//     event.waitUntil(
//         caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
//     );
// });

// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.match(event.request).then((response) => {
//             // Return from cache OR fetch from network
//             return response || fetch(event.request);
//         })
//     );
// });





















const CACHE_NAME = 'gramin-sahayak-v2';
const ASSETS = [
    '/',
    '/static/css/style.css',
    '/static/js/main.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching assets');
                return cache.addAll(ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip API calls - don't cache them
    if (event.request.url.includes('/api/')) {
        event.respondWith(
            fetch(event.request)
                .catch(() => {
                    return new Response(
                        JSON.stringify({ 
                            error: 'offline', 
                            message: 'You are offline. Using local knowledge base.' 
                        }),
                        { headers: { 'Content-Type': 'application/json' } }
                    );
                })
        );
        return;
    }

    // For static assets - cache first
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return from cache if found
                if (response) {
                    return response;
                }
                
                // Otherwise fetch from network
                return fetch(event.request)
                    .then((networkResponse) => {
                        // Cache successful responses for future
                        if (networkResponse.status === 200) {
                            const responseToCache = networkResponse.clone();
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseToCache);
                                });
                        }
                        return networkResponse;
                    })
                    .catch(() => {
                        // If both cache and network fail, return offline page
                        if (event.request.mode === 'navigate') {
                            return caches.match('/');
                        }
                        return new Response('Offline', { status: 503 });
                    });
            })
    );
});