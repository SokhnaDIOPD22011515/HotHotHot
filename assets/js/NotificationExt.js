class NotificationExt{
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

}