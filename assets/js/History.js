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
                labels: [],
                datasets: [
                    {
                        label: 'Temperature Inside',
                        data: [],
                        borderColor: 'rgb(255, 0, 0)',
                        tension: 1
                    },
                    {
                        label: 'Temperature Outside',
                        data: [],
                        borderColor: 'rgb(255, 99, 132)',
                        tension: 0.1
                    }
                ]
            }
        });
        this.fetchDataFromInsideSensor();
        this.fetchDataFromOutsideSensor();
    }

    addDataToJson(data) {
        let history = JSON.parse(localStorage.getItem('history')) || [];
        history.push(data);
        localStorage.setItem('history', JSON.stringify(history));
    }

    fetchDataFromInsideSensor() {
        let sensorInt = new SensorInside(
            document.getElementById('thermometerIntFillInt'),
            document.getElementById('temperatureIntInt'),
            document.getElementById('messageIntInt'),
            this
        );
        sensorInt.fetchDataFromAPI()
            .then(dataInt => {
                let temperature = typeof dataInt.Valeur === 'object' ? dataInt.Valeur.temp : dataInt.Valeur;
                this.addTemperature(temperature, dataInt.Date, 0);
            })
            .catch(error => {
                console.error('Error fetching temperature data from inside sensor:', error);
            });
    }

    fetchDataFromOutsideSensor() {
        let sensorExt = new SensorOutside(
            document.getElementById('thermometerExtFillExt'),
            document.getElementById('temperatureExtExt'),
            document.getElementById('messageExtExt'),
            this
        );
        sensorExt.fetchDataFromAPI()
            .then(dataExt => {
                let temperature = typeof dataExt.Valeur === 'object' ? dataExt.Valeur.temp : dataExt.Valeur;
                this.addTemperature(temperature, dataExt.Date, 1);
            })
            .catch(error => {
                console.error('Error fetching temperature data from outside sensor:', error);
            });
    }

    addTemperature(temperature, timestamp, datasetIndex) {
        let tableRow = document.createElement('tr');
        let timeCell = document.createElement('td');
        let tempCell = document.createElement('td');

        timeCell.textContent = timestamp;
        tempCell.textContent = temperature + '°C';

        tableRow.appendChild(timeCell);
        tableRow.appendChild(tempCell);

        this.historyElement.appendChild(tableRow);

        this.chart.data.labels.push(timestamp);
        this.chart.data.datasets[datasetIndex].data.push(temperature);
        this.chart.update();
        this.addDataToJson({temperature, timestamp});
    }
}
export default History;