const socket = new WebSocket('wss://ws.hothothot.dog:9502');

socket.onopen = function(event) {
    console.log('WebSocket connection opened');
};

socket.onmessage = function(event) {
    console.log('Message received:', event.data);
};

socket.onerror = function(error) {
    console.error('WebSocket error:', error);
};

socket.onclose = function(event) {
    console.log('WebSocket connection closed');
};

socket.send('Hello server!');