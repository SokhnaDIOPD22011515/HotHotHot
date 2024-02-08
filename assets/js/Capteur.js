import Historique from './Historique.js';

class Capteur {
    constructor() {
        this.thermometerFillElement = document.getElementById('thermometer-fill');
        this.temperatureElement = document.getElementById('temperature');
        this.messageElement = document.getElementById('message');
        this.historique = new Historique();

        this.fetchDataFromAPI();
    }

    fetchDataFromAPI() {
        fetch('https://hothothot.dog/api/capteurs/exterieur')
            .then(response => response.json())
            .then(data => {
                const temperature = data.capteurs[0].Valeur;
                this.updateTemperature(temperature);

                // Stocker les données dans le localStorage
                localStorage.setItem('historique', JSON.stringify(data));
            })
            .catch(error => {
                console.error('Error fetching temperature data:', error);
            })
            .finally(() => {
                setTimeout(() => this.fetchDataFromAPI(), 5000); // Fetch data 5 seconds after the previous fetch is completed
            });
    }

    updateTemperature(temperature) {
        let percentage = (temperature + 10) / 50 * 100;
        this.thermometerFillElement.style.height = percentage + '%';
        this.temperatureElement.textContent = temperature + '°C';

        this.historique.ajouterTemperature(temperature, new Date().toLocaleTimeString('fr-FR'));

        this.thermometerFillElement.classList.remove('blue', 'green', 'orange', 'red');
        this.messageElement.classList.remove('alert-info', 'alert-success', 'alert-warning', 'alert-danger');
        if (temperature < 0) {
            this.thermometerFillElement.classList.add('blue');
            this.messageElement.classList.add('alert-info');
            this.messageElement.textContent = 'Brrrrrrr, un peu froid ce matin, mets ta cagoule !';
        } else if (temperature <= 20) {
            this.thermometerFillElement.classList.add('green');
            this.messageElement.classList.add('alert-success');
            this.messageElement.textContent = 'Il fait bon, c\'est le moment de sortir les tongs !';
        } else if (temperature <= 30) {
            this.thermometerFillElement.classList.add('orange');
            this.messageElement.classList.add('alert-warning');
            this.messageElement.textContent = 'Il fait chaud, c\'est le moment de sortir les tongs !';
        } else {
            this.thermometerFillElement.classList.add('red');
            this.messageElement.classList.add('alert-danger');
            this.messageElement.textContent = 'Caliente ! Vamos a la playa, ho hoho hoho !!';
        }
    }
}

export default Capteur;