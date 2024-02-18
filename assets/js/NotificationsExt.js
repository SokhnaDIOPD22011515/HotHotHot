class NotificationsExt {
    constructor() {
        this.thresholdMinExt = null;
        this.thresholdMaxExt = null;
        this.dailyMinExt = null;
        this.dailyMaxExt = null;
        this.alertExt = null;
        this.messageZoneExt = document.getElementById("messageExt");
        this.thermometerFillExt = document.getElementById("thermometerFillExt");
        this.permissionButton = document.getElementById("notifications");
        this.permissionButton.addEventListener("click", this.permission);
    }

    update(data){
        this.alertExt = this.detectAlertsExt(data);
        console.log("Valeur data ext : " + data);
        console.log("L'alerte de la notif ext : " + this.alertExt.description);
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
        console.log("(Ext) Je rentre dans la detection avec  la valeur à : " + averageTempExt)

        let alert  = {
            type: null,
            description: null,
            color: null,
        };

        console.log("(Ext) l'alerte a pour valeur : " + alert.description + alert.type)


        if (averageTempExt < 0) {
            console.log("la valeur extérieur est en dessous de 0")
            alert.description = 'Banquise en vue !';
            alert.type = 'alert-info';
            alert.color = 'blue';
        }
        else if (averageTempExt < 35) {
            console.log("la valeur extérieur est en dessous de 35")
            alert.description = 'Tout va bien';
            alert.type = "alert-success";
            alert.color = 'green';
        }
        else if (averageTempExt >= 35) {
            console.log("la valeur extérieur est au dessus de 35")
            alert.description = 'Hot Hot Hot !';
            alert.type = "alert-warning";
            alert.color = 'red';
        }
        console.log("(Ext) l'alerte a pour valeur : " + alert.type)
        console.log(alert.type);
        return alert;
    }
    displayMessageExt(alert) {
        console.log("(Ext) Le display le message avec : " + alert.type + " et pour description " + alert.description)
        this.thermometerFillExt.classList.add(alert.color);
        this.messageZoneExt.classList.add(alert.type);
        this.messageZoneExt.textContent = alert.description;

        let tmp =  document.getElementById("messageExt");
        console.log("La valeur du message dans le site " + tmp.textContent);

    }
    displayNotificationExt(alert) {
        if (this.permission) {
            const options = {
                body: 'Etat Actuel Capteur Extérieur : ' + alert.description,
            };

            const notification = new Notification("La température du termomètre extérieur a changé", {
                body: options.body
            });
            console.log("(Ext) Je lance la notif avec : " + alert.type)

        }
    }

}

export default NotificationsExt;