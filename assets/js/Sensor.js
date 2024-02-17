class Sensor {
    constructor(thermometerFillElement, temperatureElement, messageElement, historic) {
        this.thermometerFillElement = thermometerFillElement;
        this.temperatureElement = temperatureElement;
        this.messageElement = messageElement;
        this.historic = historic;
        this.fetchData();
    }

    fetchData() {
        setInterval(() => {
            this.fetchDataFromAPI()
                .then(data => {
                    console.log('Received data:', data);
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
        let tempValue = typeof temperature === 'object' ? temperature.temp : temperature;
        let percentage = (tempValue + 10) / 50 * 100;
        this.thermometerFillElement.style.height = percentage + '%';
        this.temperatureElement.textContent = tempValue + '°C';
        let datasetIndex = this.thermometerFillElement.id.includes('Int') ? 0 : 1;
        this.historic.addTemperature(tempValue, new Date().toLocaleTimeString('fr-FR'), datasetIndex);

        this.thermometerFillElement.classList.remove('blue', 'green', 'orange', 'red');
        this.messageElement.classList.remove('alert-info', 'alert-success', 'alert-warning', 'alert-danger');
        if (tempValue < 0) {
            this.thermometerFillElement.classList.add('blue');
            this.messageElement.classList.add('alert-info');
            this.messageElement.textContent = 'canalisations gelées, appelez SOS plombier et mettez un bonnet !';
        } else if (tempValue <= 12) {
            this.thermometerFillElement.classList.add('green');
            this.messageElement.classList.add('alert-success');
            this.messageElement.textContent = 'montez le chauffage ou mettez un gros pull !';
        } else if (tempValue < 22) {
            this.thermometerFillElement.classList.add('green');
            this.messageElement.classList.add('alert-success');
        } else if (tempValue >= 22) {
            this.thermometerFillElement.classList.add('orange');
            this.messageElement.classList.add('alert-warning');
            this.messageElement.textContent = 'Baissez le chauffage !';
        } else if (tempValue >= 50) {
            this.thermometerFillElement.classList.add('red');
            this.messageElement.classList.add('alert-warning');
            this.messageElement.textContent = 'Appelez les pompiers ou arrêtez votre barbecue !';
        }
    }
}
export default Sensor;