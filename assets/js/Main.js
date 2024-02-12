import Tab from "./Tab";

let history = new History();
let tab = new Tab();

let sensorInt = new SensorInside(
    document.getElementById('thermometerIntFill'),
    document.getElementById('temperatureInt'),
    document.getElementById('messageInt'),
    history
);
let sensorExt = new SensorOutside(
    document.getElementById('thermometerExtFill'),
    document.getElementById('temperatureExt'),
    document.getElementById('messageExt'),
    history
);
tab.init();