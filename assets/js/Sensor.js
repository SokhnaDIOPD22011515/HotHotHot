class Sensor {
    constructor(thermometerFillElementId, temperatureElement, messageElement, historic) {
        this.thermometerFillElementId = thermometerFillElementId;
        this.temperatureElement = document.getElementById(temperatureElement);
        this.messageElement = document.getElementById(messageElement);
        this.historic = historic;
        this.fetchData();
    }

    fetchData() {
        setInterval(() => {
            this.fetchDataFromAPI()
                .then(data => {
                    if (data && data.capteurs && data.capteurs.length > 0 && 'Valeur' in data.capteurs[0]) {
                        const temperature = data.capteurs[0].Valeur;
                        this.updateTemperature(temperature);
                    } else {
                        console.error('Unexpected data format:', data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching temperature data:', error);
                });
        }, 10000);
    }

    fetchDataFromAPI() {
        throw new Error('fetchDataFromAPI() must be implemented in child class');
    }

    getApiUrl() {
        throw new Error('getApiUrl() must be implemented in child class');
    }

    updateTemperature(temperature) {
        this.thermometerFillElement = document.getElementById(this.thermometerFillElementId);
        if (this.thermometerFillElement) {
            let tempValue = typeof temperature === 'object' ? temperature.temp : temperature;
            let percentage = (tempValue + 10) / 50 * 100;
            this.thermometerFillElement.style.height = percentage + '%';
            this.temperatureElement.textContent = tempValue + '°C';
            let datasetIndex = this.thermometerFillElementId.includes('Int') ? 0 : 1;
            this.historic.addTemperature(tempValue, new Date().toLocaleTimeString('fr-FR'), datasetIndex);
        }
    }
}
export default Sensor;