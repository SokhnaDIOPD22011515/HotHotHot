import Tab from "./Tab.js";
import SensorInside from "./SensorInside.js";
import SensorOutside from "./SensorOutside.js";
import History from "./History.js";

document.addEventListener('DOMContentLoaded', () => {
    let history = new History();
    let tab = new Tab();

    let sensorInt = new SensorInside(
        document.getElementById('thermometerIntFillInt'),
        document.getElementById('temperatureIntInt'),
        document.getElementById('messageIntInt'),
        history
    );
    let sensorExt = new SensorOutside(
        document.getElementById('thermometerExtFillExt'),
        document.getElementById('temperatureExtExt'),
        document.getElementById('messageExtExt'),
        history
    );
    tab.init();
});