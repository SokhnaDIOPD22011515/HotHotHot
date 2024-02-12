class Sensor {
    constructor(thermometerFillElement, temperatureElement, messageElement, historic) {
        this.thermometerFillElement = thermometerFillElement;
        this.temperatureElement = temperatureElement;
        this.messageElement = messageElement;
        this.historic = historic;
        this.fetchDataFromAPI();
    }

    fetchDataFromAPI() {
        fetch('https://hothothot.dog/api/capteurs')
            .then(response => response.json())
            .then(data => {
                const capteurInterieur = data.capteurs.find(capteur => capteur.Nom === 'interieur');
                const capteurExterieur = data.capteurs.find(capteur => capteur.Nom === 'exterieur');

                // Vérifier si les capteurs ont été trouvés
                if (capteurInterieur && capteurExterieur) {
                    const temperatureInterieur = capteurInterieur.Valeur;
                    const temperatureExterieur = capteurExterieur.Valeur;

                    // Mettre à jour l'interface ou effectuer d'autres actions avec les données
                    this.updateTemperature(temperatureInterieur, 'interieur');
                    this.updateTemperature(temperatureExterieur, 'exterieur');

                    // Stocker les données dans le localStorage
                    localStorage.setItem('history', JSON.stringify(data));
                } else {
                    console.error('Capteurs introuvables dans les données.');
                }
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