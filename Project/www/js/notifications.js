console.log('notifications.js cargado');  // Añadido para depuración

$(document).ready(function(){
    $('#redirectToLandingpage').on('click', function() {
        window.location.href = 'landingpage.html';
    });

    var username = localStorage.getItem('username');
    console.log('Usuario:', username);  // Añadido para depuración

    console.log('Realizando petición AJAX');  // Añadido para depuración
    $.ajax({
        url: 'http://127.0.0.1:8000/api/eventsjoined/',
        type: 'GET',
        data: {
            username: username
        },
        success: function(events) {
            console.log(events);
            events.forEach(function(event) {
                var now = new Date();
                var joinDate = new Date(event.join_date);
                var eventDate = new Date(event.event__date);

                // Extraer las horas y los minutos de la hora del evento
                var eventHours, eventMinutes;
                if (event.event__time) {
                    var eventTime = event.event__time.split(':');
                    eventHours = eventTime[0];
                    eventMinutes = eventTime[1];
                }

                console.log(joinDate.toLocaleDateString(), now.toLocaleDateString(), eventDate.toLocaleDateString());

                if (joinDate.toLocaleDateString() === now.toLocaleDateString() || eventDate.toLocaleDateString() === now.toLocaleDateString()) {
                    var notification = $('<div class="notification" style="position: relative;"></div>');
                    var joinMessage = $('<p></p>').text('Te has unido a un evento de "' + event.event__sport + '" a las ' + joinDate.toLocaleTimeString());
                    var title = $('<h2></h2>').text(event.event__title);
                    var location = $('<p></p>').text('Ubicación: ' + event.event__location);
                    var time = $('<p></p>').text('Fecha y hora del evento: ' + eventDate.toLocaleDateString() + ' ' + eventHours + ':' + eventMinutes);

                    notification.append(joinMessage);
                    // notification.append(title);
                    notification.append(location);
                    notification.append(time);

                    console.log(notification);

                    $('#notifications').append(notification);

                    console.log($('#notifications'));
                }
            });

            // Efecto de deslizamiento a la izquierda después de generar el contenido
            $("body").hide().show("slide", { direction: "right" }, 1000);
        },
        error: function(error) {
            console.error('Error al obtener los eventos a los que se ha unido el usuario:', error);
        }
    });
});