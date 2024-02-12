class Sensor {
    constructor(thermometerFillElement, temperatureElement, messageElement, historic) {
        this.thermometerFillElement = thermometerFillElement;
        this.temperatureElement = temperatureElement;
        this.messageElement = messageElement;
        this.historic = historic;
        this.cache = new Map();
        this.fetchData();
    }

fetchData() {
    setInterval(() => {
        const cachedData = this.cache.get(this.getApiUrl());
        if (cachedData) {
            this.updateTemperature(cachedData);
            return;
        }

        this.fetchDataFromAPI()
            .then(data => {
                console.log('Received data:', data);
                if (data && data.capteurs && data.capteurs.length > 0 && 'Valeur' in data.capteurs[0]) {
                    const temperature = data.capteurs[0].Valeur;
                    this.cache.set(this.getApiUrl(), temperature);
                    this.updateTemperature(temperature);
                } else {
                    console.error('Unexpected data format:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching temperature data:', error);
            });
    }, 5000);
}

    fetchDataFromAPI() {
        throw new Error('fetchDataFromAPI() must be implemented in child class');
    }
    getApiUrl() {
        throw new Error('getApiUrl() must be implemented in child class');
    }


    updateTemperature(temperature) {
        let percentage = (temperature + 10) / 50 * 100;
        this.thermometerFillElement.style.height = percentage + '%';
        this.temperatureElement.textContent = temperature + '°C';

        this.historic.addTemperature(temperature, new Date().toLocaleTimeString('fr-FR'));

        this.thermometerFillElement.classList.remove('blue', 'green', 'orange', 'red');
        this.messageElement.classList.remove('alert-info', 'alert-success', 'alert-warning', 'alert-danger');
        if (temperature < 0) {
            this.thermometerFillElement.classList.add('blue');
            this.messageElement.classList.add('alert-info');
            this.messageElement.textContent = 'canalisations gelées, appelez SOS plombier et mettez un bonnet !';
        } else if (temperature <= 12) {
            this.thermometerFillElement.classList.add('green');
            this.messageElement.classList.add('alert-success');
            this.messageElement.textContent = 'montez le chauffage ou mettez un gros pull !';
        } else if (temperature < 22) {
            this.thermometerFillElement.classList.add('green');
            this.messageElement.classList.add('alert-success');
        } else if (temperature >= 22) {
            this.thermometerFillElement.classList.add('orange');
            this.messageElement.classList.add('alert-warning');
            this.messageElement.textContent = 'Baissez le chauffage !';
        } else if (temperature >= 50) {
            this.thermometerFillElement.classList.add('red');
            this.messageElement.classList.add('alert-warning');
            this.messageElement.textContent = 'Appelez les pompiers ou arrêtez votre barbecue !';
        }
    }

}
export default Sensor;