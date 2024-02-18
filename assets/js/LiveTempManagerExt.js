import Observable from "./Observable";
import NotificationsExt from "./NotificationsExt";

class LiveTempManagerExt{
    constructor() {
        this.dailyMin = null;
        this.dailyMax = null;
        this.messageMin = document.getElementById("messageMinExt");
        this.messageMax = document.getElementById("messageMaxExt");
        this.observable = new Observable();
    }

    update(data){
        this.dailyMin = Math.min(this.dailyMin, data);
        this.dailyMax = Math.max(this.dailyMax, data);
        this.messageMin.textContent = "Minimum Journalier " + dailyMin + '°C';
        this.messageMax.textContent = "Maximum Journalier " + dailyMax + '°C';
    }
}
export default LiveTempManagerExt;