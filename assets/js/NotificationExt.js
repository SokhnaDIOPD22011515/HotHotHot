class NotificationExt{
    constructor() {
        this.thresholdMinExt = null; //la valeur du seuil de la température min extérieur
        this.thresholdMaxExt = null; //la valeur du seuil de la température max extérieur
        this.dailyMinExt = null; //la valeur min journalière de la température extérieur
        this.dailyMaxExt = null; //la valeur max journalière de la température extérieur
        this.alertExt = this.detectAlertsExt(data);
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

    update(data){
        this.displayMessageExt(this.alertExt);
        this.displayNotificationExt(this.alertExt);
    }
}