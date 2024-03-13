$(document).on('pagecreate', function(){
    var json_url = "Events.json";

    // Cargar el JSON externo y mostrar todos los eventos al principio
    $.getJSON(json_url, function(eventos) {
        mostrarEventos(eventos);
    });

    // Función para mostrar todos los eventos
    function mostrarEventos(eventos) {
        var eventsList = $('.events-list');
        eventsList.empty(); // Limpiar la lista antes de agregar los eventos

        // Agregar eventos al DOM
        eventos.forEach(function(evento) {
            var eventHtml = '<div class="event" data-categoria="' + evento.categoria + '">';
            eventHtml += '<img src="' + evento.imagen + '" alt="Imagen del Evento">';
            eventHtml += '<h2>' + evento.titulo + '</h2>';
            eventHtml += '<p>Fecha: ' + evento.fecha + '</p>';
            eventHtml += '<p>Ubicación: ' + evento.ubicacion + '</p>';
            eventHtml += '<a href="' + evento.enlace + '">';
            eventHtml += '<button class="join-btn">Unirse al Evento</button>';
            eventHtml += '</a>';
            eventHtml += '</div>';
            eventsList.append(eventHtml);
        });
    }

    // Mostrar u ocultar eventos según la categoría seleccionada
    $('.waves-effect').click(function() {
        var categoriaSeleccionada = $(this).attr('id');
        $('.event').hide();
        if (categoriaSeleccionada === 'all') {
            $('.event').show();
        } else {
            $('.event[data-categoria="' + categoriaSeleccionada + '"]').show();
        }
    });

    // Mostrar todos los eventos al cargar la página
    $('#all').trigger('click');
});
