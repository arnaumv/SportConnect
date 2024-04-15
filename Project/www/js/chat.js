$(document).ready(function () {
    // Obtener el ID del evento del localStorage
    var eventId = localStorage.getItem("selectedEventId");

    var chatSocket = new WebSocket(
        'ws://' + window.location.host +
        '/ws/chat/' + eventId + '/');

        chatSocket.onopen = function(e) {
            console.log('WebSocket is now open');
        };

    chatSocket.onmessage = function(e) {
        var data = JSON.parse(e.data);
        var message = data['message'];
        document.querySelector('#chatArea').value += (message + '\n');
    };

    chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    };

    document.querySelector('#messageForm').onsubmit = function(e) {
        e.preventDefault();
        var messageInputDom = document.querySelector('#messageInput');
        var message = messageInputDom.value;
        // Verificar el estado del WebSocket antes de enviar un mensaje
        if (chatSocket.readyState === WebSocket.OPEN) {
            chatSocket.send(JSON.stringify({
                'message': message
            }));
        } else {
            console.error('Cannot send message, WebSocket is not open');
        }
        messageInputDom.value = '';
    };

    $('#redirectToInfoEvent').on('click', function() {
        window.location.href = 'InfoEvent.html';
    });
});