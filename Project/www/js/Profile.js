document.addEventListener('deviceready', onDeviceReady, false);

// Variable para controlar si los eventos ya se han cargado
var eventosCargados = false;

function onDeviceReady() {

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

    $('#EditProfile').on('click', function() {
        window.location.href = 'EditProfile.html';
    });
    
    $(document).on('pageinit', function() {
        var json_url = "Events.json";

        // Función para mostrar eventos activos o finalizados según la categoría seleccionada
        function mostrarEventosPorCategoria(categoriaSeleccionada) {
            var eventsList = $('.events-list');
            eventsList.empty(); // Limpiar la lista antes de agregar los eventos

            // Cargar el JSON externo y mostrar eventos basados en la categoría seleccionada
            $.getJSON(json_url, function(eventos) {
                eventos.forEach(function(evento) {
                    var currentDate = Date.now();
                    var eventDate = new Date(evento.fecha).getTime();

                    if ((categoriaSeleccionada === "Activos" && eventDate >= currentDate) ||
                        (categoriaSeleccionada === "Finalizados" && eventDate < currentDate)) {
                        agregarEvento(evento);
                    }
                });
            });

            // Marcar el botón activo correspondiente
            $('.events-buttons button').removeClass('active');
            $('#' + categoriaSeleccionada.toLowerCase() + '-events-btn').addClass('active');
        }

        // Agregar evento al DOM
        function agregarEvento(evento) {
            var eventHtml = '<div class="event" data-categoria="' + evento.categoria + '">';
            eventHtml += '<img src="' + evento.imagen + '" alt="Imagen del Evento">';
            eventHtml += '<h2>' + evento.titulo + '</h2>';
            eventHtml += '<p>Fecha: ' + evento.fecha + '</p>';
            eventHtml += '<p>Ubicación: ' + evento.ubicacion + '</p>';
            eventHtml += '<a href="' + evento.enlace + '">';
            eventHtml += '<button class="join-btn">Unirse al Evento</button>';
            eventHtml += '</a>';
            eventHtml += '</div>';
            $('.events-list').append(eventHtml);
        }

        // Manejar clic en botón "Activos"
        $('#active-events-btn').off('click').on('click', function() {
            mostrarEventosPorCategoria("Activos");
        });

        // Manejar clic en botón "Finalizados"
        $('#finished-events-btn').off('click').on('click', function() {
            mostrarEventosPorCategoria("Finalizados");
        });

        // Mostrar eventos activos al cargar la página, solo si no se han cargado antes
        if (!eventosCargados) {
            setTimeout(function() {
                mostrarEventosPorCategoria("Activos");
                $('#active-events-btn').addClass('active');
                eventosCargados = true;
            }, 200);
        }
    });
}
