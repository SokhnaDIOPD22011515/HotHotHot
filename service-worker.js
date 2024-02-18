let CACHE = 'mysweetpwa1';

self.addEventListener('install', function(evt) {
    evt.waitUntil(caches.open(CACHE).then(function (cache) {
        cache.addAll([
            "./", // Homepage
            "./documentation.html", // Documentation page
            "./assets/js/*",
            "./assets/favicon/*",
            "./assets/css/*",
            "./service-worker.js",
            "./index.html",
            "./offline.html",
            "./manifest.webmanifest",
        ]);
    }));
});

self.addEventListener('fetch', function(evt) {
    console.log('The service worker is serving the asset.');
    evt.respondWith(fromCache(evt.request));
    evt.waitUntil(
        update(evt.request)
            .then(refresh)
    );
});

function fromCache(request) {
    console.log('match cache request');
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (response) {
            if (response) {
                return response;
            } else if (request.headers.get('accept').includes('text/html')) {
                return caches.match('./offline.html');
            }
        });
    });
}

function update(request) {
    console.log('update cache');
    return caches.open(CACHE).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response.clone()).then(function () {
                return response;
            });
        });
    });
}

function refresh(response) {
    return self.clients.matchAll().then(function (clients) {
        clients.forEach(function (client) {
            let message = {
                type: 'refresh',
                url: response.url,
                eTag: response.headers.get('ETag')
            };
            client.postMessage(JSON.stringify(message));
        });
    });
}