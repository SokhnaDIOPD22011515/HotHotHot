import Sensor from "./Sensor.js";

class SensorInside extends Sensor{
    constructor(thermometerFillElement, temperatureElement, messageElement, historic) {
        super(thermometerFillElement, temperatureElement, messageElement, historic);
    }

    getApiUrl() {
        return 'https://hothothot.dog/api/capteurs/interieur';
    }

    async fetchDataFromAPI() {
        const response = await fetch(this.getApiUrl());
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }
}

export default SensorInside;


