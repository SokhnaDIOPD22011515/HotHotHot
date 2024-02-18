import Tab from "./Tab.js";
import SensorInside from "./SensorInside.js";
import SensorOutside from "./SensorOutside.js";
import History from "./History.js";
import NotificationsInt from "./NotificationsInt.js";

document.addEventListener('DOMContentLoaded', async () => {
    let history = new History();
    let tab = new Tab();
    let notificationInt = new NotificationsInt();
    let notificationExt = new NotificationsExt();

    let sensorInt = new SensorInside(
        'thermometerFillInt',
        'temperatureIntInt',
        'messageInt',
        history
    );
    let sensorExt = new SensorOutside(
        'thermometerFillExt',
        'temperatureExtExt',
        'messageExt',
        history
    );
    tab.init();


    let dataExt = await sensorExt.fetchDataFromAPI();
    let valueSensorExt = dataExt.capteurs[0].Valeur;
    sensorExt.observable.subscribe(notificationExt);
    sensorExt.observable.notify(valueSensorExt);
    console.log("Valeur du capteur extérieur :", valueSensorExt);
    console.log(sensorExt.observable.observers);

    let dataInt = await sensorInt.fetchDataFromAPI();
    let valueSensorInt = dataInt.capteurs[0].Valeur;
    sensorInt.observable.subscribe(notificationInt);
    sensorInt.observable.notify(valueSensorInt);
    console.log("Valeur du capteur intérieur :", valueSensorInt);
    console.log(sensorInt.observable.observers);

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const installButton = document.querySelector('.add-button');
    installButton.style.display = 'block';

    installButton.addEventListener('click', (e) => {
        installButton.style.display = 'none';
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        });
    });
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
});