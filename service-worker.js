// Nom du cache
const CACHE_NAME = 'my-cache';

// Fichiers à mettre en cache
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/assets/js/Main.js',
    '/manifest.webmanifest',
    '/assets/favicon/favicon-32x32.png',
    '/assets/favicon/favicon-16x16.png',
    '/assets/favicon/apple-touch-icon.png',
    // Assurez-vous que tous les fichiers js et css sont accessibles
    // et que les chemins sont corrects
];

// Installation du Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .catch(error => {
                        console.error('Failed to add files to cache:', error);
                    });
            })
            .catch(error => {
                console.error('Failed to open cache:', error);
            })
    );
});

// Activation du Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Ancien cache supprimé', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Récupération des requêtes pour les correspondances du cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});