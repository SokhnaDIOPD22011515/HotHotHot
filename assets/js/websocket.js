const socket = new WebSocket('wss://ws.hothothot.dog:9502');

socket.onopen = function(event) {
    console.log('WebSocket connection opened');
};

socket.onmessage = function(event) {
    console.log('Message received:', event.data);
    let openRequest = indexedDB.open("myDatabase", 1);

    openRequest.onupgradeneeded = function() {
        let db = openRequest.result;
        if (!db.objectStoreNames.contains('messages')) {
            db.createObjectStore('messages');
        }
    };

    openRequest.onsuccess = function() {
        let db = openRequest.result;
        let transaction = db.transaction("messages", "readwrite");
        let messages = transaction.objectStore("messages");
        messages.add(event.data);
    };
};

socket.onerror = function(error) {
    console.error('WebSocket error:', error);
};

socket.onclose = function(event) {
    console.log('WebSocket connection closed');
};