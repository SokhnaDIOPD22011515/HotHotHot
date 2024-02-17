let CACHE = 'mysweetpwa1';

self.addEventListener('install', function(evt) {
    evt.waitUntil(caches.open(CACHE).then(function (cache) {
        cache.addAll([
            "./assets/js/Main.js",
            "./assets/js/Tab.js",
            "./assets/js/SensorInside.js",
            "./assets/js/SensorOutside.js",
            "./assets/js/History.js",
            "./assets/js/websocket.js",
            "./assets/favicon/apple-touch-icon.png",
            "./assets/favicon/favicon-32x32.png",
            "./assets/favicon/favicon-16x16.png",
            "./assets/css/style.css",
            "./service-worker.js",
            "./index.html",
            "./manifest.webmanifest"
        ]);
    }));
});

self.addEventListener('fetch', function(evt) {
    evt.respondWith(fromCache(evt.request));
    evt.waitUntil(update(evt.request).then(refresh));
});

function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request);
    });
}

function update(request) {
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

// bouton pour s'abonner aux notifs.
let button = document.getElementById("notifications");
button.addEventListener('click', function(e) {
    Notification.requestPermission().then(function(result) {
        if(result === 'granted') {
            randomNotification();
        }
    });
});

function randomNotification() {
    let randomNumber = getRandomInt(5);
    console.log(randomNumber);
    if(randomNumber >= 2) {

        let notifTitle = "Chaud, non ?";
        let notifBody = 'Température : ' + randomNumber + '.';
        let notifImg = '/assets/images/android-chrome-192x192.png';
        let options = {
            body: notifBody,
            icon: notifImg
        }
        let notif = new Notification(notifTitle, options);
    }
    setTimeout(randomNotification, 30000);
}

//On génére un nombre aléatoire pour la démo
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = 'block';

    addBtn.addEventListener('click', (e) => {
        // hide our user interface that shows our A2HS button
        addBtn.style.display = 'none';
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
});