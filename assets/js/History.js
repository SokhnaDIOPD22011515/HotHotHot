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
                        label: 'Temperature Interieur',
                        data: [],
                        borderColor: 'rgb(0,255,196)',
                        tension: 1
                    },
                    {
                        label: 'Temperature Exterieur',
                        data: [],
                        borderColor: 'rgb(133,255,99)',
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
    // Check if the temperature is undefined
    if (temperature === undefined) {
        return; // If it is, don't add the new data
    }

    let history = JSON.parse(localStorage.getItem('history')) || [];
    let lastEntry = history[history.length - 1];

    // Check if the last entry has the same timestamp and temperature
    if (lastEntry && lastEntry.timestamp === timestamp && lastEntry.temperature === temperature) {
        return; // If it does, don't add the new data
    }

    let tableRow = document.createElement('li');
    tableRow.textContent = `${timestamp} - ${temperature}°C`;

    // Add the new data to the correct list based on the dataset index
    let historyElement = document.getElementById(datasetIndex === 0 ? 'history-interior' : 'history-exterior');
    historyElement.appendChild(tableRow);

    this.chart.data.labels.push(timestamp);
    this.chart.data.datasets[datasetIndex].data.push(temperature);
    this.chart.update();
    this.addDataToJson({temperature, timestamp});
}
}
export default History;