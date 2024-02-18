import Tab from "./Tab.js";
import SensorInside from "./SensorInside.js";
import SensorOutside from "./SensorOutside.js";
import History from "./History.js";
import NotificationsInt from "./NotificationsInt.js";
import NotificationsExt from "./NotificationsExt.js";



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


    let dataInt = await sensorInt.fetchDataFromAPI();
    let valueSensorInt = dataInt.capteurs[0].Valeur;
    sensorInt.observable.subscribe(notificationInt);
    sensorInt.observable.notify(valueSensorInt);
    console.log("Valeur du capteur intérieur :", valueSensorInt);


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