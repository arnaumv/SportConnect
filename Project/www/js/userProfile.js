$(document).ready(function () {
    $("#active-events-btn").addClass("active");

    var eventosCargados = false;

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

   
    $('#flecha-izquierda').on('click', function() {
        window.location.href = 'InfoEvent.html';
      });

      $('#redirectToNotify').on('click', function() {
        window.location.href = 'notify.html';
    });



    /********CARGAR PERFIL************ */

    var storedUsername = localStorage.getItem('selecteduserId');
    // Si no hay datos almacenados, haz la solicitud a la API
    fetch('http://127.0.0.1:8000/profile/' + storedUsername + '/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data:', data);  // Imprimir los datos en la consola

            localStorage.setItem('selecteduserId', data.username);
            $('#username').text(data.username);
            $('#city').text("Vive en " + data.city);
            $('#followers-count').text( data.followers_count);  // Actualizar el número de seguidores
            $('#following-count').text(  data.following_count);  // Actualizar el número de seguidos
            $('#events-count').text(data.events_count );  // Mostrar el conteo de eventos en el HTML

            if (data.instagram != null) {
                // Establecer el atributo src de la imagen de Instagram
                $('#img-instagram2').attr('src', './img/Profile/insta.webp');
                // Envolver la imagen en un enlace
                $('#img-instagram2').wrap('<a href="https://www.instagram.com/' + data.instagram + '" target="_blank"></a>');
            }

            if (data.twitter != null) {
                // Establecer el atributo src de la imagen de Twitter
                $('#img-twitter2').attr('src', './img/Profile/twitter.webp');
                // Envolver la imagen en un enlace
                $('#img-twitter2').wrap('<a href="https://twitter.com/' + data.twitter + '" target="_blank"></a>');
            }
            if (data.description != null) {
                console.log("no es null");
                $('#miniDescription').text(data.description);
            }
            var imageUrl;
            if (data.image_path != null) {
                imageUrl = 'http://127.0.0.1:8000/' + data.image_path;
            } else {
                imageUrl = 'http://127.0.0.1:8000/Media/profile_photos/User_photo.png'; // Ruta a la imagen predeterminada
            }
            $('#profile-image').attr('src', imageUrl);
        })
        .catch(error => {
            console.error('Error:', error);
        });



        // Obtener el nombre de usuario del usuario que está actualmente conectado
        var currentUserId = localStorage.getItem('username');

        // Obtener el nombre de usuario del usuario que se está visualizando
        var selectedUserId = localStorage.getItem('selecteduserId');

        // Hacer la solicitud GET al servidor para verificar si el usuario actual está siguiendo al usuario seleccionado
        fetch('http://127.0.0.1:8000/isFollowing/' + currentUserId + '/' + selectedUserId + '/')
            .then(response => response.json())
            .then(data => {
                // Si el usuario actual está siguiendo al usuario seleccionado, cambiar el texto del botón a "Dejar de seguir"
                if (data.isFollowing) {
                    $('#follow-button').text("Dejar de seguir");
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    // Añadir evento de clic al botón de seguir

    $('#follow-button').click(function() {
        // Obtener el nombre de usuario del usuario que está actualmente conectado
        var currentUserId = localStorage.getItem('username');
        console.log('currentUserId:', currentUserId);
    
        // Obtener el nombre de usuario del usuario que se está visualizando
        var selectedUserId = localStorage.getItem('selecteduserId');
        console.log('selectedUserId:', selectedUserId);
    
        // Crear el objeto con los datos a enviar al servidor
        var data = {
            current_username: currentUserId,
            following_username: selectedUserId
        };
    
        console.log('data:', data);
    
        // Si el texto del botón es "Seguir", hacer la solicitud POST para seguir
if ($('#follow-button').text() === "Seguir") {
    fetch('http://127.0.0.1:8000/follow/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Actualizar la interfaz de usuario
        $('#followers-count').text( data.followers_count);
        //$('#following-count').text("Seguidos: " + data.following_count);

        // Cambiar el texto del botón a "Dejar de seguir"
        $('#follow-button').text("Dejar de seguir");

        // Agregar la clase 'unfollow' al botón
        $('#follow-button').addClass('unfollow');

        // Crear una notificación
        var notificationData = {
            type: 'follow',
            username: currentUserId,  // El usuario que realiza la acción
            recipient_username: selectedUserId,  // El usuario que recibe la notificación
            message: currentUserId + " ha empezado a seguirte."
        };

        fetch('http://127.0.0.1:8000/notification/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(notificationData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Notification created:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
        // Si el texto del botón es "Dejar de seguir", hacer la solicitud POST para dejar de seguir
        else if ($('#follow-button').text() === "Dejar de seguir") {
            fetch('http://127.0.0.1:8000/unfollow/' + currentUserId + '/' + selectedUserId + '/', {
                method: 'POST',
            })
            .then(response => response.json())
            .then(data => {
                // Si la solicitud fue exitosa, cambiar el texto del botón a "Seguir"
                if (data.success) {
                    $('#follow-button').text("Seguir");
                    // Actualizar la interfaz de usuario
                    $('#followers-count').text( data.followers_count);
                    //$('#following-count').text("Seguidos: " + data.following_count);
    
                    // Quitar la clase 'unfollow' del botón
                    $('#follow-button').removeClass('unfollow');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    });

    /***   MOSTRAR EVENTO   ****/


    // Obtener el nombre de usuario desde el localStorage
    var username = localStorage.getItem("selecteduserId");
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
            url: "http://127.0.0.1:8000/events/user_subscribed_events/?username=" + username,
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

    // Agrega un evento de clic a los botones
    document.querySelector('#active-events-btn').addEventListener('click', setActiveState);
    document.querySelector('#finished-events-btn').addEventListener('click', setActiveState);

    function setActiveState() {
        // Elimina la clase activa de los botones y la línea hr
        document.querySelector('#active-events-btn').classList.remove('active');
        document.querySelector('#finished-events-btn').classList.remove('active');
        document.querySelector('.hrclass').classList.remove('active');

        // Agrega la clase activa al botón clicado y la línea hr
        this.classList.add('active');
        document.querySelector('.hrclass').classList.add('active');
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


    if (!eventosCargados) {
        setTimeout(function () {
            mostrarEventosPorCategoria("Activos");
            $('#active-events-btn').addClass('active');
            eventosCargados = true;
        }, 200);
    }
});
