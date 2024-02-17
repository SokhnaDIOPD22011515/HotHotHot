import Sensor from "./Sensor.js";

class SensorOutside extends Sensor{
    constructor(thermometerFillElement, temperatureElement, messageElement, historic) {
        super(thermometerFillElement, temperatureElement, messageElement, historic);
    }

    updateTemperature(temperature) {
        super.updateTemperature(temperature);
    }
    getApiUrl() {
        return 'https://hothothot.dog/api/capteurs/exterieur';
    }

    async fetchDataFromAPI() {
        const response = await fetch(this.getApiUrl());
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }
}

export default SensorOutside;