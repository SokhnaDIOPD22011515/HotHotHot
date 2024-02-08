let tabInt = []
let tabExt = []


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

for (let valeur = 0; valeur < 25; valeur++) {
    tabInt.push(getRandomNumber(-10, 40));
}

for (let valeur = 0; valeur < 25; valeur++) {
    tabExt.push(getRandomNumber(-10, 40));
}

function showMaxMin(){
    let maxCapteurInt = Math.max(...tabInt);
    let minCapteurInt = Math.min(...tabInt);
    let thresholdMinInt = -10;
    let thresholdMaxInt = 35;

    let maxCapteurExt = Math.max(...tabExt);
    let minCapteurExt = Math.min(...tabExt);
    let thresholdMinExt = -20;
    let thresholdMaxExt = 30;


    let alerteExt = detectAlerts(minCapteurExt, maxCapteurExt, thresholdMinExt, thresholdMaxExt, 'Alerte Extérieure');
    let alerteInt = detectAlerts(minCapteurInt, maxCapteurInt, thresholdMinInt, thresholdMaxInt, 'Alerte Intérieure');

    // Supposons que minCapteurExt, maxCapteurExt, minCapteurInt, maxCapteurInt sont les valeurs calculées
    document.getElementById('minCapteurExt').innerText = minCapteurExt;
    document.getElementById('maxCapteurExt').innerText = maxCapteurExt;

    document.getElementById('minCapteurInt').innerText = minCapteurInt;
    document.getElementById('maxCapteurInt').innerText = maxCapteurInt;

    // Afficher la boîte de dialogue pour chaque alerte détectée
    afficherBoiteDialogue(alerteExt);
    afficherBoiteDialogue(alerteInt);

    afficherNotification(alerteExt);
    afficherNotification(alerteInt);
}

showMaxMin();

function detectAlerts(min, max, thresholdMin, thresholdMax, type) {
    let alerte = null;

    if (min < thresholdMin || max > thresholdMax) {
        alerte = {
            type: type,
            description: `Valeurs anormales détectées: Min = ${min}, Max = ${max}`,
        };
    }

    return alerte;
}

function afficherBoiteDialogue(alerte) {
    if (alerte) {
        // Utilisez la boîte de dialogue native ou un plugin/modal personnalisé
        alert(`${alerte.type} : ${alerte.description}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
});

function afficherNotification(alerte) {
    if (Notification.permission === 'granted') {
        const options = {
            body: alerte.description,
        };

        const notification = new Notification(alerte.type, options);
    }
}

document.addEventListener('notificationclick', (event) => {
    // Logique à exécuter lors du clic sur la notification
    // Par exemple, rediriger l'utilisateur vers une page spécifique
});
