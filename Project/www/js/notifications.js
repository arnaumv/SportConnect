console.log('notifications.js cargado');  // Añadido para depuración
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
        console.log('te ha seguido:', data);  // Unique text added here

        // Procesar las notificaciones en orden inverso (las más recientes primero)
        for (let i = data.length - 1; i >= 0; i--) {
            let notification = data[i];

            // Crear y mostrar la notificación
            var notificationElement = $('<div class="notification" style="position: relative;"></div>');
            var createMessage = $('<p class="pNotification"></p>').text(notification.message);
            
            // Crear el botón de eliminar y añadirlo a la notificación
            var deleteButton = $('<button></button>').css({
                'position': 'absolute',
                'top': '0',
                'right': '0',
                'background': 'url(./img/Options/eliminar.png) no-repeat center center',
                'background-size': 'cover',  // Asegúrate de que la imagen cubra todo el botón
                'width': '20px',  // Establece el ancho del botón
                'height': '20px',  // Establece la altura del botón
                'border': 'none',  // Elimina el borde del botón
                'margin-top': '0px',
            });

            // Añadir el evento de clic al botón de eliminar
            deleteButton.click(function() {
                // Eliminar la notificación de la página
                notificationElement.remove();
                // Enviar una petición DELETE al servidor para eliminar la notificación
                fetch('https://sportconnect.ieti.site/notifications/' + notification.id, {
                    method: 'DELETE',
                })
            });

            // Añadir el mensaje y el botón de eliminar a la notificación
            notificationElement.append(createMessage);
            notificationElement.append(deleteButton);

            // Añadir la notificación al cuerpo de la página
            $('#notifications').prepend(notificationElement);
        }
    })
})