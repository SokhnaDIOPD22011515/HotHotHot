// SensorInside.js
import Sensor from "./Sensor.js";
import Observable from "./Observable.js";

class SensorInside extends Sensor{
    constructor(thermometerFillElementId, temperatureElement, messageElement, historic) {
        super(thermometerFillElementId, temperatureElement, messageElement, historic);
        this.thermometerFillElementId = thermometerFillElementId;
        this.temperatureElement = document.getElementById(temperatureElement);
        this.messageElement = document.getElementById(messageElement);
        this.cache = new Map();
        this.observable = new Observable();
    }

    getApiUrl() {
        return 'https://hothothot.dog/api/capteurs/interieur';
    }

    async fetchDataFromAPI() {
        if (this.cache.has(this.getApiUrl())) {
            return this.cache.get(this.getApiUrl());
        }

        const response = await fetch(this.getApiUrl());
        const data = await response.json();
        this.cache.set(this.getApiUrl(), data);
        return data;
    }
}
export default SensorInside;