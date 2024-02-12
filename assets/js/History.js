import SensorInside from "./SensorInside.js";
import SensorOutside from "./SensorOutside.js";

class History {
    constructor() {
        this.historyElement = document.getElementById('history');
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
        document.addEventListener('DOMContentLoaded', () => {
            // Créer les instances des capteurs
            let sensorInt = new SensorInside();
            let sensorExt = new SensorOutside();

            // Faire les appels aux deux capteurs
            Promise.all([sensorInt.fetchDataFromAPI(), sensorExt.fetchDataFromAPI()])
                .then(([dataInt, dataExt]) => {
                    // Ajouter les températures à l'historique
                    this.addTemperature(dataInt.Valeur, dataInt.Date);
                    this.addTemperature(dataExt.Valeur, dataExt.Date);
                })
                .catch(error => {
                    console.error('Error fetching temperature data:', error);
                });
        });
    }


    addTemperature(temperature, timestamp) {
        let tableRow = document.createElement('tr');
        let timeCell = document.createElement('td');
        let tempCell = document.createElement('td');

        timeCell.textContent = timestamp;
        tempCell.textContent = temperature + '°C';

        tableRow.appendChild(timeCell);
        tableRow.appendChild(tempCell);

        this.historyElement.appendChild(tableRow);

        this.chart.data.labels.push(timestamp);
        this.chart.data.datasets[0].data.push(temperature);
        this.chart.update();
    }
}

export default History;