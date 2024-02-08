class Historique {
    constructor() {
        this.historiqueElement = document.getElementById('historique');
        this.chartElement = document.getElementById('temperatureChart');
        this.chartContext = this.chartElement.getContext('2d');
        this.chart = new Chart(this.chartContext, {
            type: 'line',
            data: {
                labels: [], // This will be the timestamps
                datasets: [{
                    label: 'Temperature',
                    data: [], // This will be the temperatures
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            }
        });
        this.fetchDataFromAPI();
    }

    fetchDataFromAPI() {
        fetch('https://hothothot.dog/api/capteurs/exterieur')
            .then(response => response.json())
            .then(data => {
                const temperature = data.capteurs[0].Valeur;
                this.ajouterTemperature(temperature, new Date().toLocaleTimeString('fr-FR'));
            })
            .catch(error => {
                console.error('Error fetching temperature data:', error);
            });
    }

    ajouterTemperature(temperature, timestamp) {
        let tableRow = document.createElement('tr');
        let timeCell = document.createElement('td');
        let tempCell = document.createElement('td');

        timeCell.textContent = timestamp;
        tempCell.textContent = temperature + '°C';

        tableRow.appendChild(timeCell);
        tableRow.appendChild(tempCell);

        this.historiqueElement.appendChild(tableRow);

        this.chart.data.labels.push(timestamp);
        this.chart.data.datasets[0].data.push(temperature);
        this.chart.update();
    }
}

export default Historique;