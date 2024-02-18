class NotificationsInt {
    constructor() {
        this.thresholdMinInt = null;
        this.thresholdMaxInt = null;
        this.dailyMinInt = null;
        this.dailyMaxInt = null;
        this.alertInt = null;
        this.messageZoneInt = document.getElementById("messageInt");
        this.thermometerFillInt = document.getElementById("thermometerFillExt");

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

    update(data){
        this.alertInt = this.detectAlertsInt(data);
        this.displayMessageInt(this.alertInt);
        this.displayNotificationInt(this.alertInt);
    }

}

export default NotificationsInt;