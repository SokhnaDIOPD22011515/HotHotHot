class NotificationsExt {
    constructor() {
        this.thresholdMinExt = null;
        this.thresholdMaxExt = null;
        this.dailyMinExt = null;
        this.dailyMaxExt = null;
        this.alertExt = null;
        this.messageZoneExtId = "messageExt";
        this.thermometerFillExtId = "thermometerFillExt";
        this.permissionButton = document.getElementById("notifications");
        this.permissionButton.addEventListener("click", this.permission);
    }

    update(data){
        this.alertExt = this.detectAlertsExt(data);
        this.messageZoneExt = document.getElementById(this.messageZoneExtId);
        this.thermometerFillExt = document.getElementById(this.thermometerFillExtId);
        this.displayMessageExt(this.alertExt);
        this.displayNotificationExt(this.alertExt);
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

    detectAlertsExt(averageTempExt) {
        let alert  = {
            type: null,
            description: null,
            color: null,
        };

        if (averageTempExt < 0) {
            alert.description = 'Banquise en vue !';
            alert.type = 'alert-info';
            alert.color = 'blue';
        }
        else if (averageTempExt < 35) {
            alert.description = '';
            alert.type = "alert-success";
            alert.color = 'green';
        }
        else if (averageTempExt >= 35) {
            alert.description = 'Hot Hot Hot !';
            alert.type = "alert-warning";
            alert.color = 'red';
        }

        return alert;
    }
    displayMessageExt(alert) {
        this.thermometerFillExt.classList.add(alert.color);
        this.messageZoneExt.classList.add(alert.type);
        this.messageZoneExt.textContent = alert.description;
    }
    displayNotificationExt(alert) {
        if (this.permission) {
            const options = {
                body: 'Etat Actuel Capteur Extérieur : ' + alert.description,
            };

            const notification = new Notification("La température du termomètre extérieur a changé", {
                body: options.body
            });
        }
    }

}