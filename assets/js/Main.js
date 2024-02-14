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
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker enregistré avec succès : ', registration);
        })
        .catch(error => {
            console.error("Erreur lors de l'enregistrement du Service Worker : ", error);
        });
}

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