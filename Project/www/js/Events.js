$(document).on('pagecreate', function(){

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

    $('#redirectToLanding').on('click', function() {
        window.location.href = 'landingpage.html';
    });

    $('#redirectToNotify').on('click', function() {
        window.location.href = 'notify.html';
    });
    console.log("Heii");

    // Hacer una solicitud AJAX para obtener los eventos
    $.ajax({
        url: 'http://127.0.0.1:8000/event-filter/',  // URL de tu API
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        success: function(eventos) {
            mostrarEventos(eventos);
            // Guardar eventos en el localStorage
            localStorage.setItem('eventos', JSON.stringify(eventos));
            console.log("Mostrando eventos");
        },
        error: function(error) {
            console.log('Error getting events:', error);
            console.log("Error al mostrar eventos");
        }
    });

    // Función para mostrar todos los eventos
    function mostrarEventos(eventos) {
        var eventsList = $('.events-list');
        eventsList.empty(); // Limpiar la lista antes de agregar los eventos

        // Agregar eventos al DOM
        eventos.forEach(function(evento) {
            var eventHtml = '<div class="event" data-categoria="' + evento.sport + '">';
            eventHtml += '<img src="' + evento.image_path + '" alt="Imagen del Evento">';
            eventHtml += '<h2>' + evento.title + '</h2>';
            eventHtml += '<p>Fecha: ' + evento.date + '</p>';
            eventHtml += '<p>Ubicación: ' + evento.location + '</p>';
            eventHtml += '<p>Creado por: ' + evento.creator_username + '</p>';  // Agregamos el nombre de usuario del creador del evento
            eventHtml += '<button class="join-btn" data-event-id="' + evento.id + '">Ver Evento</button>';
            eventHtml += '</div>';
            eventsList.append(eventHtml);
        });

        // Aplicar el filtro
        var categoriaSeleccionada = $('input[name="sport"]:checked').val().toLowerCase();
        $('.event').hide();
        $('.event').each(function() {
            var categoriaEvento = $(this).data('categoria').toLowerCase();
            if (categoriaSeleccionada === 'all' || categoriaSeleccionada === categoriaEvento) {
                $(this).show();
            }
        });

        // Agregar controlador de eventos de clic a los botones de unirse
        $('.join-btn').on('click', function() {
            var eventId = $(this).data('event-id');
            // Guardar el ID del evento en el localStorage
            localStorage.setItem('selectedEventId', eventId);
            // Redirigir al usuario a la página de información del evento
            window.location.href = 'InfoEvent.html';
        });
    }

    // Show or hide the filter div when the filter button is clicked
    $('#filterButton').on('click', function() {
        $('#filterDiv').slideToggle();
    });

    // Filter events when a radio button is selected
    $('input[name="sport"]').on('change', function() {
        // Recargar los eventos cuando se selecciona una nueva categoría
        var eventos = JSON.parse(localStorage.getItem('eventos'));
        mostrarEventos(eventos);

        // Cambiar el texto del botón "Filtrar" al deporte seleccionado
        var deporteSeleccionado = $(this).val();
        if (deporteSeleccionado === 'all') {
            deporteSeleccionado = 'Todos ▼';
        }
        $('#filterButton').text(deporteSeleccionado);
    });

    // Trigger the change event for the 'all' radio button when the page loads
    $(document).ready(function() {
        $('#all').trigger('change');
    });
    // Ocultar el div de filtrado cuando se hace clic en el botón de aceptar
    $('#acceptFilterButton').on('click', function() {
        $('#filterDiv').slideToggle();
    });

});