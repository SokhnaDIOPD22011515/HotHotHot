import Tab from "./Tab.js";
import SensorInside from "./SensorInside.js";
import SensorOutside from "./SensorOutside.js";
import History from "./History.js";

document.addEventListener('DOMContentLoaded', () => {
    let history = new History();
    let tab = new Tab();

    let sensorInt = new SensorInside(
        document.getElementById('thermometerIntFillInt'),
        document.getElementById('temperatureIntInt'),
        document.getElementById('messageIntInt'),
        history
    );
    let sensorExt = new SensorOutside(
        document.getElementById('thermometerExtFillExt'),
        document.getElementById('temperatureExtExt'),
        document.getElementById('messageExtExt'),
        history
    );
    tab.init();
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(registration => {
            console.log('Service Worker registered successfully: ', registration);
        })
        .catch(error => {
            console.error("Error during Service Worker registration: ", error);
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
/*
let socket = new WebSocket(‘wss: url du serveur:numéro de port');
socket.onopen = function(event) {
    console.log("Connexion établie");

    //On indique sur notre page web que la connexion est établie
    let label = document.getElementById("status");
    label.innerHTML = "Connexion établie";

    //Envoi d'un message au serveur (obligatoire)
    socket.send("coucou !");

    // au retour...
    socket.onmessage = function(event) {
        var datas = document.getElementById("datas");
        datas.innerHTML = event.data;
    }
}*/