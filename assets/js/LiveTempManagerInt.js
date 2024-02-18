import Observable from "./Observable";

class LiveTempManagerInt {
    constructor() {
        this.dailyMin = null;
        this.dailyMax = null;
        this.messageMin = document.getElementById("messageMinInt");
        this.messageMax = document.getElementById("messageMaxInt");
        this.observable = new Observable();
    }

    update(data){
        this.dailyMin = Math.min(this.dailyMin, data);
        this.dailyMax = Math.max(this.dailyMax, data);
        this.messageMin.textContent = "Minimum Journalier " + dailyMin + '°C';
        this.messageMax.textContent = "Maximum Journalier " + dailyMax + '°C';
    }
}
export default LiveTempManagerInt;