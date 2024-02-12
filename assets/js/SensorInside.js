import Sensor from "./Sensor.js";

class SensorInside extends Sensor{
    constructor(thermometerFillElement, temperatureElement, messageElement, historic) {
        super(thermometerFillElement, temperatureElement, messageElement, historic);
    }

    async fetchDataFromAPI() {
        const response = await fetch('https://hothothot.dog/api/capteurs/interieur');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }
}

export default SensorInside;

