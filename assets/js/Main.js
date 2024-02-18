import Tab from "./Tab.js";
import SensorInside from "./SensorInside.js";
import SensorOutside from "./SensorOutside.js";
import History from "./History.js";
import NotificationsInt from "./NotificationsInt.js";

document.addEventListener('DOMContentLoaded', async () => {
    let history = new History();
    let tab = new Tab();
    let notificationInt = new NotificationsInt();

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

    let data = await sensorInt.fetchDataFromAPI();
    let valeurCapteurInterieur = data.capteurs[0].Valeur;
    console.log("Valeur du capteur intérieur :", valeurCapteurInterieur);


    sensorInt.observable.subscribe(notificationInt);
    console.log(sensorInt.observable.observers);
    sensorInt.observable.notify(valeurCapteurInterieur);

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
    navigator.serviceWorker.register('./service-worker.js')
        .then(registration => {
            console.log('Service Worker enregistré avec succès : ', registration);
        })
        .catch(error => {
            console.error("Erreur lors de l'enregistrement du Service Worker : ", error);
        });
}
});