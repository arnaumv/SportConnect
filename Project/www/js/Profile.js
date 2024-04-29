document.addEventListener('deviceready', onDeviceReady, false);

// Variable para controlar si los eventos ya se han cargado
var eventosCargados = false;

function onDeviceReady() {

    //Movilidad entre paginas
    $('#landingpage').on('click', function () {
        window.location.href = 'landingpage.html';
    });

    $('#create').on('click', function () {
        window.location.href = 'Create.html';
    });

    $('#events').on('click', function () {
        window.location.href = 'Events.html';
    });

    $('#profile').on('click', function () {
        window.location.href = 'Profile.html';
    });

    $('#EditProfile').on('click', function () {
        window.location.href = 'EditProfile.html';
    });

    $('#options').on('click', function () {
        window.location.href = 'Options.html';
    });

    $('#redirectToLanding').on('click', function () {
        window.location.href = 'landingpage.html';
    });
    $('#redirectToNotify').on('click', function () {
        window.location.href = 'notify.html';
    });

}
$(document).ready(function () {
    $("active-events-btn").addClass("active");
    // Obtener el nombre de usuario desde el localStorage
    var username = localStorage.getItem("username");
    if (!username) {
        console.error("Nombre de usuario no encontrado en el localStorage");
        return;
    }

    // Función para mostrar eventos activos o finalizados según la categoría seleccionada
    function mostrarEventosPorCategoria(categoriaSeleccionada) {
        var eventsList = $('.events-list');
        eventsList.empty(); // Limpiar la lista antes de agregar los eventos
        var eventosEncontrados = false;
        var eventsError = $('.eventerror');
        eventsError.empty(); // Limpiar la lista antes de agregar los eventos

        // Realizar una consulta AJAX para obtener los eventos del usuario
        $.ajax({
            url: "https://sportconnect.ieti.site/events/user_subscribed_events/?username=" + username,
            type: "GET",
            success: function (eventos) {
                eventos.forEach(function (evento) {
                    var currentDate = Date.now();
                    var eventDate = new Date(evento.date).getTime();

                    if ((categoriaSeleccionada === "Activos" && eventDate >= currentDate) ||
                        (categoriaSeleccionada === "Finalizados" && eventDate < currentDate)) {
                        agregarEvento(evento);
                        eventosEncontrados = true; // Se encontraron eventos
                    }
                });
                // Si no se encontraron eventos, mostrar un mensaje
                if (!eventosEncontrados) {
                    eventsError.append('<p class="pEventsFilterError">No se encontraron eventos.</p>');
                }
            },
            error: function (xhr, status, error) {
                console.error("Error al obtener los eventos del usuario:", error);
            }
        });

        // Marcar el botón activo correspondiente
        $('.events-buttons button').removeClass('active');
        $('#' + categoriaSeleccionada.toLowerCase() + '-events-btn').addClass('active');
    }

    // Agregar evento al DOM
    function agregarEvento(evento) {
        

        console.log("añadirlos");
        var currentDate = Date.now();
        var eventDate = new Date(evento.date).getTime();
        var eventHtml = '<div class="event" data-categoria="' + evento.sport + '">';
        eventHtml += '<img src="' + evento.image_path + '" alt="Imagen del Evento">';
        eventHtml += '<h2>' + evento.title + '</h2>';
        eventHtml += '<p>Fecha: ' + evento.date + '</p>';
        eventHtml += '<p>Ubicación: ' + evento.location + '</p>';
        // Add "View" button for active events
        if (eventDate >= currentDate) {
            eventHtml += '<button class="join-btn-profile" onclick="window.location.href=\'InfoEvent.html?eventId=' + evento.id + '\'">Ver</button>';
        }
        eventHtml += '</div>';
        $('.events-list').append(eventHtml);
    }


    // Manejar clic en botón "Activos"
    $("#active-events-btn").click(function(){
        $(this).addClass("active");
        $("#finished-events-btn").removeClass("active");

        console.log("ookkactivos")
        mostrarEventosPorCategoria("Activos");
    });

    // Manejar clic en botón "Finalizados"
    $("#finished-events-btn").click(function(){
        $(this).addClass("active");
        $("#active-events-btn").removeClass("active");

        console.log("ookkfinalizados")
        mostrarEventosPorCategoria("Finalizados");
    });

    // Manejar clic en botón "Activos"
    // $('#active-events-btn').off('click').on('click', function() {
    //     console.log("ookkactivos")
    //     mostrarEventosPorCategoria("Activos");
    // });

    // // Manejar clic en botón "Finalizados"
    // $('#finished-events-btn').off('click').on('click', function() {
    //     mostrarEventosPorCategoria("Finalizados");
    // });

    // Mostrar eventos activos al cargar la página, solo si no se han cargado antes
    if (!eventosCargados) {
        setTimeout(function () {
            mostrarEventosPorCategoria("Activos");
            $('#active-events-btn').addClass('active');
            eventosCargados = true;
        }, 200);
    }
});