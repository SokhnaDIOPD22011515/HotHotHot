class Notification{
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

    update(){
        this.displayMessageInt(this.alertInt);
        this.displayMessageExt(this.alertExt);
    }


    displayNotification(alerte) {
        if (Notification.permission === 'granted') {
            const options = {
                body: alerte.description,
            };

            const notification = new Notification(alerte.type, options);
        }
    }




// // Supposons que minCapteurExt, maxCapteurExt, minCapteurInt, maxCapteurInt sont les valeurs calculées
// document.getElementById('minCapteurExt').innerText = minCapteurExt;
// document.getElementById('maxCapteurExt').innerText = maxCapteurExt;
//
// document.getElementById('minCapteurInt').innerText = minCapteurInt;
// document.getElementById('maxCapteurInt').innerText = maxCapteurInt;
//
// // Afficher la boîte de dialogue pour chaque alerte détectée
// afficherBoiteDialogue(alerteExt);
// afficherBoiteDialogue(alerteInt);
//
// afficherNotification(alerteExt);
// afficherNotification(alerteInt);






}

export default Notification;