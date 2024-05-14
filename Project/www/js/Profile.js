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
// Definir la función verEvento
function verEvento(eventId) {
    // Actualizar el localStorage con el nuevo eventId
    localStorage.setItem("selectedEventId", eventId);
    // Redirigir a la página InfoEvent.html
    window.location.href = 'InfoEvent.html';
}

$(document).ready(function () {





    var storedUsername = localStorage.getItem('username');
    // Si no hay datos almacenados, haz la solicitud a la API
    fetch('https://sportconnect.ieti.site/profile/' + storedUsername + '/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data:', data);  // Imprimir los datos en la consola

            localStorage.setItem('username', data.username);
            $('#username').text(data.username);
            // $('#city').text(data.city);
            $('#city').text("Ciudad: " + data.city);
            $('.titulosprofile4').text('Sobre Mí');

            $('#followers-count').text(data.followers_count );  // Mostrar el conteo de seguidores en el HTML
            $('#following-count').text(data.following_count );  // Mostrar el conteo de seguidos en el HTML
            $('#events-count').text(data.events_count );  // Mostrar el conteo de eventos en el HTML


            if (data.instagram != null) {
                // Establecer el atributo src de la imagen de Instagram
                $('#img-instagram').attr('src', './img/Profile/insta.webp');
                // Envolver la imagen en un enlace
                $('#img-instagram').wrap('<a href="https://www.instagram.com/' + data.instagram + '" target="_blank"></a>');
            }
            
            if (data.twitter != null) {
                // Establecer el atributo src de la imagen de Twitter
                $('#img-twitter').attr('src', './img/Profile/twitter.webp');
                // Envolver la imagen en un enlace
                $('#img-twitter').wrap('<a href="https://twitter.com/' + data.twitter + '" target="_blank"></a>');
            }
            if (data.description != null) {
                console.log("no es null");
                $('#miniDescription').text(data.description);
            }
            var imageUrl;
            if (data.image_path != null) {
                imageUrl = 'https://sportconnect.ieti.site' + data.image_path;
            } else {
                imageUrl = 'https://sportconnect.ieti.site/Media/profile_photos/User_photo.png'; // Ruta a la imagen predeterminada
            }
            $('#profile-image').attr('src', imageUrl);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    var categoriaActual = "Activos"; // Variable global para la categoría actualmente seleccionada
    $("active-events-btn").addClass("active");
    var username = localStorage.getItem("username");
    if (!username) {
        console.error("Nombre de usuario no encontrado en el localStorage");
        return;
    }

    function mostrarEventosPorCategoria(categoriaSeleccionada) {
        categoriaActual = categoriaSeleccionada; // Actualizar la categoría actual
        var eventsList = $('.events-list');
        eventsList.empty();
        var eventosEncontrados = false;
        var eventsError = $('.eventerror');
        eventsError.empty();

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
                        eventosEncontrados = true;
                    }
                });
                if (!eventosEncontrados) {
                    eventsError.append('<p class="pEventsFilterError">No se encontraron eventos.</p>');
                }
            },
            error: function (xhr, status, error) {
                console.error("Error al obtener los eventos del usuario:", error);
            }
        });

        $('.events-buttons button').removeClass('active');
        $('#' + categoriaSeleccionada.toLowerCase() + '-events-btn').addClass('active');
    }

    function agregarEvento(evento) {
        var storedUsername = localStorage.getItem('username');
        var currentDate = Date.now();
        var eventDate = new Date(evento.date).getTime();

        var eventHtml = '<div class="event" data-categoria="' + evento.sport + '">';
        eventHtml += '<img src="' + evento.image_path + '" alt="Imagen del Evento">';
        eventHtml += '<h2>' + evento.title + '</h2>';
        eventHtml += '<p>Fecha: ' + evento.date + '</p>';
        eventHtml += '<p>Ubicación: ' + evento.location + '</p>';

        if (eventDate >= currentDate) {
            eventHtml += '<button class="join-btn-profile" data-event-id="' + evento.id + '" onclick="verEvento(' + evento.id + ')">Ver</button>';
        }

        if (evento.creator_username.toLowerCase() == storedUsername.toLowerCase()) {
            eventHtml += '<img class="borrarEvent" id="borrarEvent" src="img/Options/eliminarEvent.png">';
        }

        eventHtml += '</div>';
        $('.events-list').append(eventHtml);
    }

    $(document).on('click', '.borrarEvent', function() {
        var eventIdBorrar = $(this).parent().find(".join-btn-profile").data("event-id"); 
        var storedUsername = localStorage.getItem('username');
        console.log("borrar evento: "+ eventIdBorrar+ "por: "+ storedUsername);
        $.ajax({
            url: 'https://sportconnect.ieti.site/delete_event/',
            type: 'POST',
            dataType: 'json',
            data: {
                username: storedUsername, 
                event_id: eventIdBorrar
            },
            success: function(response) {
                showPopup2(response.message);
                mostrarEventosPorCategoria(categoriaActual); // Actualizar la lista de eventos
            },
            error: function(xhr, status, error) {
                console.error("Error al intentar borrar el evento:", error);
                showPopup("Error al intentar borrar el evento. Por favor, inténtalo de nuevo más tarde.");
            }
        });
    });

    $('#ShareProfile').click(function() {
        var username = localStorage.getItem("username");
        if (!username) {
            console.error("Nombre de usuario no encontrado en el localStorage");
            return;
        }
        var profileUrl = 'http://miaplicacion.com/profile/' + username; // Reemplaza esto con la URL correcta
        window.plugins.socialsharing.share('Mira este perfil: ' + profileUrl);
    });


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

    
    function showPopup(message) {
        $('#popup-message').text(message);
        $('#popup').slideDown('slow').delay(5000).slideUp('slow'); // Transición más lenta
    }
    
    function showPopup2(message) {
        $('#popup-message2').text(message);
        $('#popup2').slideDown('slow').delay(5000).slideUp('slow'); // Transición más lenta
    }
});