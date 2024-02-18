class Notifications{
    constructor() {
        this.thresholdMinInt = null; //la valeur min du seuil de la température  intérieur
        this.thresholdMaxInt = null; //la valeur max du seuil de la température intérieur
        this.dailyMinInt = null; //la valeur min journalière de la température intérieur
        this.dailyMaxInt = null; //la valeur max journalière de la température intérieur
        this.alertInt = this.detectAlertsInt(this.averageTempInt);
        this.averageTempInt = null; //la valeur actuelle de la température intérieure
        this.messageZoneInt = document.getElementById("messageInt");
        this.thermometerFillInt = document.getElementById("thermometerFillExt");

        this.thresholdMinExt = null; //la valeur du seuil de la température min extérieur
        this.thresholdMaxExt = null; //la valeur du seuil de la température max extérieur
        this.dailyMinExt = null; //la valeur min journalière de la température extérieur
        this.dailyMaxExt = null; //la valeur max journalière de la température extérieur
        this.alertExt = this.detectAlertsExt(this.averageTempExt);
        this.averageTempExt = null; //la valeur actuelle de la température extérieur
        this.messageZoneExt = document.getElementById("messageExt");
        this.thermometerFillExt = document.getElementById("thermometerFillExt");

        this.permissionButton = document.getElementById("notifications");
        this.permissionButton.addEventListener("click", this.permission);
    }
    permission() {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission().then(function (result) {
                if (result === 'granted') {
                    return true;
                } else if (result === 'denied') {
                    return false;
                } else {
                    return false;
                }
            });
        } else {
            return true;
        }
    }


    detectAlertsInt(averageTempInt) {
        let type = null;
        let description = null;
        let color = null;

        if (averageTempInt < 0) {
            description = 'Canalisations gelées, appelez SOS plombier et mettez un bonnet !';
            type = 'alert-info';
            color = 'blue';
        }
        else if (averageTempInt <= 12) {
            description = 'Montez le chauffage ou mettez un gros pull !';
            type = "alert-success";
            color = 'green';
        }
        else if (averageTempInt < 22) {
            description = '';
            type = "alert-success";
            color = 'green';
        }
        else if (averageTempInt >= 22) {
            description = 'Baissez le chauffage !';
            type = 'alert-warning';
            color = 'orange'
        }
        else if (averageTempInt >= 50) {
            description = 'Appelez les pompiers ou arrêtez votre barbecue !';
            type = "alert-warning";
            color = 'red';
        }

        return {
            type: type,
            description: description,
            color: color,
        };
    }
    displayMessageInt(alert) {
        this.thermometerFillInt.classList.add(alert.color);
        this.messageZoneInt.classList.add(alert.type);
        this.messageZoneInt.textContent = alert.description;
    }
    displayNotificationInt(alert) {
        if (this.permission) {
            const options = {
                body: 'Termomètre Intérieur : ' + alert.description,
            };

            const notification = new Notification(options);
        }
    }

    detectAlertsExt(averageTempInt) {
        let type = null;
        let description = null;
        let color = null;

        if (averageTempInt < 0) {
            description = 'Banquise en vue !';
            type = 'alert-info';
            color = 'blue';
        }
        else if (averageTempInt < 35) {
            description = '';
            type = "alert-success";
            color = 'green';
        }
        else if (averageTempInt >= 35) {
            description = 'Hot Hot Hot !';
            type = "alert-warning";
            color = 'red';
        }

        return {
            type: type,
            description: description,
            color: color,
        };
    }
    displayMessageExt(alert) {
        this.thermometerFillExt.classList.add(alert.color);
        this.messageZoneExt.classList.add(alert.type);
        this.messageZoneExt.textContent = alert.description;
    }
    displayNotificationExt(alert) {
        if (this.permission) {
            const options = {
                body: 'Termomètre Extérieur : ' + alert.description,
            };

            const notification = new Notification(options);
        }
    }

    update(){
        this.displayMessageInt(this.alertInt);
        this.displayNotificationInt(this.alertInt);

        this.displayMessageExt(this.alertExt);
        this.displayNotificationExt(this.alertExt);
    }

}

export default Notifications;