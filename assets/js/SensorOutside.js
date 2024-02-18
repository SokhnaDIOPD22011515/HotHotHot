import Sensor from "./Sensor.js";
import Observable from "./Observable.js";

class SensorOutside extends Sensor{
    constructor(thermometerFillElement, temperatureElement, messageElement, historic) {
        super(thermometerFillElement, temperatureElement, messageElement, historic);
        this.cache = new Map();
        this.observable = new Observable();
    }

    updateTemperature(temperature) {
        super.updateTemperature(temperature);
    }
    getApiUrl() {
        return 'https://hothothot.dog/api/capteurs/exterieur';
    }

    async fetchDataFromAPI() {
        if (this.cache.has(this.getApiUrl())) {
            return this.cache.get(this.getApiUrl());
        }

        const response = await fetch(this.getApiUrl());
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        this.cache.set(this.getApiUrl(), data);
        return data;
    }
}

export default SensorOutside;