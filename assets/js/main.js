import Capteur from './Capteur.js';
import Tab from './Tab.js';

let capteur = new Capteur();
let tab = new Tab();

capteur.updateTemperature();
tab.init();