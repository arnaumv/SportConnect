$(document).ready(function() {

    //Movilidad entre paginas
    $('#landingpage').on('click', function() {
        window.location.href = 'landingpage.html';
    });

    $('#create').on('click', function() {
        window.location.href = 'Create.html';
    });

    $('#events').on('click', function() {
        window.location.href = 'Events.html';
    });

    $('#profile').on('click', function() {
        window.location.href = 'Profile.html';
    });

    console.log('Document is ready');

    // Obtener el ID del evento del localStorage
    var eventId = localStorage.getItem('selectedEventId');
    console.log('Event ID:', eventId);

    // Hacer una solicitud AJAX para obtener la información del evento
    $.ajax({
        url: 'http://127.0.0.1:8000/event-filter/' + eventId + '/get_event',  // URL de tu API
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        beforeSend: function() {
            console.log('Sending AJAX request');
        },
        success: function(evento) {
            console.log('AJAX request succeeded');
            // Actualizar el HTML de la página con la información del evento
            $('.evento img').attr('src', evento.image_path);
            $('.evento h2').text(evento.title);
            $('.evento p').first().text('Fecha: ' + evento.date);
            $('.evento p').last().text(evento.description);
        },
        error: function(error) {
            console.log('Error getting event:', error);
        }
    });

    // Hacer una solicitud AJAX para obtener la lista de participantes del evento
    $.ajax({
        url: 'http://127.0.0.1:8000/event/' + eventId + '/participants',  // URL de tu API
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        beforeSend: function() {
            console.log('Sending AJAX request to get participants');
        },
        success: function(participants) {
            console.log('Successfully got participants:', participants);

            // Limpiar la lista de participantes
            $('.participantes ul').empty();

            // Agregar cada participante a la lista
            participants.forEach(function(participant) {
                var listItem = $('<li></li>');
                var img = $('<img>').attr('src', './img/Profile/User_photo.png');  // Asume que todos los usuarios tienen la misma imagen de perfil
                var infoDiv = $('<div></div>').addClass('info-participante');
                var nameP = $('<p></p>').text(participant.username);

                // Crear un objeto Date a partir de la fecha de unión del participante
                var joinDate = new Date(participant.join_date);

                // Formatear la fecha a día/mes/año
                var formattedJoinDate = joinDate.getDate() + '/' + (joinDate.getMonth() + 1) + '/' + joinDate.getFullYear();

                var joinDateP = $('<p></p>').text('Se unió el ' + formattedJoinDate);

                infoDiv.append(nameP, joinDateP);
                listItem.append(img, infoDiv);
                $('.participantes ul').append(listItem);
            });
        },
        error: function(error) {
            console.log('Error getting participants:', error);
        }
    });

    // Controlador de eventos de clic para el botón "Unirme al evento"
    $('.unirse-btn .btn').on('click', function(e) {
        e.preventDefault();  // Prevenir la acción por defecto del botón

        // Obtener el nombre de usuario del localStorage (o de donde lo tengas almacenado)
        var username = localStorage.getItem('username');

        // Hacer una solicitud AJAX para unirse al evento
        $.ajax({
            url: 'http://127.0.0.1:8000/join-event/',  // URL de tu API para unirse a un evento
            type: 'POST',
            data: JSON.stringify({
                username: username,
                event: eventId
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            beforeSend: function() {
                console.log('Sending AJAX request to join event');
            },
            success: function(response) {
                console.log('Successfully joined event:', response);
                // Aquí puedes actualizar la lista de participantes o hacer cualquier otra cosa que necesites
            },
            error: function(error) {
                console.log('Error joining event:', error);
            }
        });
    });
});