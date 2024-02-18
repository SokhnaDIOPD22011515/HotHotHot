import Observable from "./Observable";

class LiveTempManager{
    constructor(sensor) {
        this.sensor = sensor;
        this.temperatureValue = sensor.fetchDataFromAPI().capteurs[0].Valeur;
        this.dailyMin = null;
        this.dailyMax = null;
        this.observable = new Observable();
        this.messageMin = document.getElementById("");
        this.messageMax = document.getElementById("");
    }

    update(data){
        this.dailyMin = Math.min(this.dailyMin, this.temperatureValue);
        this.dailyMax = Math.max(this.dailyMax, this.temperatureValue);
        this.messageMin.textContent = "Minimum Journalier " + dailyMin + '°C';
        this.messageMax.textContent = "Maximum Journalier " + dailyMax + '°C';

        // this.alertExt = this.detectAlertsExt(data);
        // console.log("Valeur data ext : " + data);
        // console.log("L'alerte de la notif ext : " + this.alertExt.description);
        // this.displayMessageExt(this.alertExt);
        // this.displayNotificationExt(this.alertExt);
    }
}
export default LiveTempManager;