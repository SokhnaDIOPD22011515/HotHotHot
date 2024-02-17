import Sensor from "./Sensor.js";

class SensorInside extends Sensor{
    constructor(thermometerFillElement, temperatureElement, messageElement, historic) {
        super(thermometerFillElement, temperatureElement, messageElement, historic);
        this.cache = new Map();
    }

    updateTemperature(temperature) {
        super.updateTemperature(temperature);
    }

    getApiUrl() {
        return 'https://hothothot.dog/api/capteurs/interieur';
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
export default SensorInside;


