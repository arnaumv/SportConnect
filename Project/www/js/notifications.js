console.log('notifications.js cargado');  // Añadido para depuración

// JavaScript
// JavaScript
function createDeleteCallback(notification, notificationElement, username) {
    return function() {
        // Imprimir la información completa de la notificación
        console.log('Deleting notification:', notification);

        // Imprimir la URL y los datos de la petición DELETE
        var deleteUrl = 'https://sportconnect.ieti.site/notification/' + notification.id + '?username=' + username;
        console.log('DELETE request to:', deleteUrl);

        // Eliminar la notificación de la página
        notificationElement.remove();

        // Enviar una petición DELETE al servidor para eliminar la notificación
        fetch(deleteUrl, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.message);
            // Verificar si hay notificaciones restantes
            if ($('.notification').length === 0) {
                $('#notifications').append('<p class="MessageNotification">Estas actualizado!<br/>Todo se ve limpio y ordenado</p>');
            }
        })
        .catch(error => console.error('There has been a problem with your fetch operation:', error));
    };
}

$(document).ready(function(){
    $('#redirectToLandingpage').on('click', function() {
        window.location.href = 'landingpage.html';
    });

    var username = localStorage.getItem('username');
    console.log('Usuario:', username);  // Añadido para depuración

    // Hacer una petición GET para obtener las notificaciones del usuario
    fetch('https://sportconnect.ieti.site/notification/?username=' + username)
    .then(response => response.json())
    .then(data => {
        console.log('te ha seguido:', data);
    
        let userNotificationCount = 0;  // Contador para las notificaciones del usuario actual

        for (let i = data.length - 1; i >= 0; i--) {
            let notification = data[i];
    
            // Verificar si el usuario en la notificación es el usuario actual
            if (notification.recipient_username !== username) {
                continue;  // Saltar esta notificación
            }
    
            userNotificationCount++;  // Incrementar el contador de notificaciones del usuario

            var notificationElement = $('<div class="notification" style="position: relative;"></div>');
            var createMessage = $('<p class="pNotification"></p>').text(notification.message);
                
            // Crear y mostrar la hora de creación de la notificación
            var date = new Date(notification.created_at);
            var formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            var createTime = $('<p class="pNotificationTime"></p>').text(formattedDate);
    
            var deleteButton = $('<button></button>').css({
                'position': 'absolute',
                'top': '0',
                'right': '0',
                'background': 'url(./img/Options/eliminar.png) no-repeat center center',
                'background-size': 'cover',
                'width': '20px',
                'height': '20px',
                'border': 'none',
                'margin-top': '0px',
            });
    
            deleteButton.click(createDeleteCallback(notification, notificationElement, username));
    
            notificationElement.append(createMessage);
            notificationElement.append(createTime);
            notificationElement.append(deleteButton);
    
            $('#notifications').prepend(notificationElement);
        }

        // Verificar si hay notificaciones para el usuario actual
        if (userNotificationCount === 0) {
            $('#notifications').append('<p class="MessageNotification">Estas actualizado!<br/>Todo se ve limpio y ordenado</p>');
        }
    })
})