class NotificationsInt {
    constructor() {
        this.thresholdMinInt = null;
        this.thresholdMaxInt = null;
        this.dailyMinInt = null;
        this.dailyMaxInt = null;
        this.alertInt = null;
        this.messageZoneInt = document.getElementById("messageInt");
        this.thermometerFillInt = document.getElementById("thermometerFillInt");

        this.permissionButton = document.getElementById("notifications");
        this.permissionButton.addEventListener("click", this.permission);
    }

    update(data){
        this.alertInt = this.detectAlertsInt(data);
        console.log("Valeur data int : " + data);
        console.log("L'alerte de la notif : " + this.alertInt.description);
        this.displayMessageInt(this.alertInt);
        this.displayNotificationInt(this.alertInt);
    }



    permission() {
        console.log("Je test la permission");
        if (Notification.permission !== 'granted') {
            console.log("La permission est non pour l'instant");
            Notification.requestPermission().then(function (result) {
                if (result === 'granted') {
                    console.log("Là c'est bon");
                    return true;
                } else if (result === 'denied') {
                    console.log("Là c'est pas bon");
                    return false;
                } else {
                    console.log("Là c'est pas bon");
                    return false;
                }
            });
        } else {
            console.log("Là c'est bon");
            return true;
        }
    }

    detectAlertsInt(averageTempInt) {
        console.log("(Int) Je rentre dans la detection avec  la valeur à : " + averageTempInt)

        let alert  = {
            type: null,
            description: null,
            color: null,
        };

        console.log("l'alerte a pour valeur : " + alert.description + alert.type)


        if (averageTempInt < 0) {
            console.log("la valeur est en dessous de 0")
            alert.description= 'Canalisations gelées, appelez SOS plombier et mettez un bonnet !';
            alert.type = 'alert-info';
            alert.color = 'blue';
        }
        else if (averageTempInt <= 12) {
            console.log("la valeur est en dessous de 12")
            alert.description = 'Montez le chauffage ou mettez un gros pull !';
            alert.type = "alert-success";
            alert.color = 'green';
        }
        else if (averageTempInt < 22) {
            console.log("la valeur est en dessous de 22")
            alert.description = 'Tout va bien';
            alert.type = "alert-success";
            alert.color = 'green';

            console.log("l'alerte a pour valeur : " + alert.type)

        }
        else if (averageTempInt >= 22) {
            console.log("la valeur est au dessus de 22")
            alert.description = 'Baissez le chauffage !';
            alert.type = 'alert-warning';
            alert.color = 'orange'
        }
        else if (averageTempInt >= 50) {
            console.log("la valeur est au dessus de 50")
            alert.description = 'Appelez les pompiers ou arrêtez votre barbecue !';
            alert.type = "alert-warning";
            alert.color = 'red';
        }
        console.log("l'alerte a pour valeur : " + alert.type)
        console.log(alert.type);
        return alert;
    }
    displayMessageInt(alert) {
        console.log("Le display le message avec : " + alert.type + "et pour description" + alert.description)
        this.thermometerFillInt.classList.add(alert.color);
        this.messageZoneInt.classList.add(alert.type);
        this.messageZoneInt.textContent = alert.description;
    }
    displayNotificationInt(alert) {
        console.log("Je display la notif avec : " + alert.type + "et pour description" + alert.description)
        if (this.permission) {
            console.log("La permission est ok")
            const options = {
                body: 'Etat Actuel Capteur Intérieur : ' + alert.description,
            };
            console.log(options.body)

            const notification = new Notification("La température du termomètre intérieur a changé", {
                body: options.body
            });
            console.log("Je lance la notif avec : " + alert.type)
            console.log(notification)
        }
    }



}

export default NotificationsInt;