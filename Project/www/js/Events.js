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
    llamadaAjax();
    function llamadaAjax(){
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
    }
      

    // Función para mostrar todos los eventos
    function mostrarEventos(eventos) {
        var eventsList = $('.events-list');
        eventsList.empty(); // Limpiar la lista antes de agregar los eventos
          // Verificar si la lista de eventos está vacía
    if (eventos.length === 0) {
        eventsList.append('<p class="pEventsFilterError">No se encontraron eventos.</p>');
        return;
    }
        // Agregar eventos al DOM
        eventos.forEach(function(evento) {
            var storedUsername = localStorage.getItem('username');

            var eventHtml = '<div class="event" data-categoria="' + evento.sport + '">';
            eventHtml += '<img src="' + evento.image_path + '" alt="Imagen del Evento">';
            eventHtml += '<h2>' + evento.title + '</h2>';
            eventHtml += '<p>Fecha: ' + evento.date + '</p>';
            eventHtml += '<p>Actividad: ' + evento.sport + '</p>';
            eventHtml += '<p>Ubicación: ' + evento.location + '</p>';
            if (evento.creator_username.toLowerCase() === storedUsername.toLowerCase()) {
                eventHtml += '<p>Creado por ti</p>';  
            }
             else {
                eventHtml += '<p>Creado por: ' + evento.creator_username + '</p>';  // Agregamos el nombre de usuario del creador del evento
            };
            eventHtml += '<hr>';
            eventHtml += '<button class="join-btn" data-event-id="' + evento.id + '">Ver Evento</button>';

            if (evento.creator_username.toLowerCase()==storedUsername.toLowerCase()){
                eventHtml += '<img class="borrarEvent" id="borrarEvent" src="img/Options/eliminarEvent.png">';
            };

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

        // Verificar si hay algún evento visible después de aplicar el filtro
        if ($('.event:visible').length === 0) {
            $('.events-list').append('<p class="pEventsFilterError">No se encontraron eventos para la categoría seleccionada.</p>');
        }

        // Agregar controlador de eventos de clic a los botones de unirse
        $('.join-btn').on('click', function() {
            var eventId = $(this).data('event-id');
            // Guardar el ID del evento en el localStorage
            localStorage.setItem('selectedEventId', eventId);
            // Redirigir al usuario a la página de información del evento
            window.location.href = 'InfoEvent.html';
        });

        $('.borrarEvent').on('click', function() {
            var eventIdBorrar = $(this).siblings(".join-btn").data("event-id"); 
            var storedUsername = localStorage.getItem('username');
            console.log("borrar evento: "+ eventIdBorrar+ "por: "+ storedUsername);
            $.ajax({
                url: 'http://127.0.0.1:8000/delete_event/',
                type: 'POST',
                dataType: 'json',
                data: {
                    username: storedUsername, 
                    event_id: eventIdBorrar
                },
                success: function(response) {
                    //alert(response.message); 
                    showPopup2(response.message);
                    llamadaAjax();
                },
                error: function(xhr, status, error) {
                    console.error("Error al intentar borrar el evento:", error);
                    //alert("Error al intentar borrar el evento. Por favor, inténtalo de nuevo más tarde.");
                    showPopup("Error al intentar borrar el evento. Por favor, inténtalo de nuevo más tarde.");
                }
            });
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
        //$('#filterDiv').css('z-index', '1000'); // Asegurarse de que el div de filtro se superponga sobre el footer

    });

    // Show or hide the date filter div when the filter by date button is clicked
    $('#filterDateButton').on('click', function() {
        $('#filterDateDiv').slideToggle();
    });

    // Change the text of the filter by date button when a date is selected
    $('#customDateFilter').on('change', function() {
        var selectedDate = $(this).val();

        if (selectedDate) {
            $('#filterDateButton').text(selectedDate);
        } else {
            $('#filterDateButton').text('Fecha ▼');
        }
    });

    // Filter events when a date is selected
    $('#acceptDateFilterButton').on('click', function() {
        // Get the selected date
        var selectedDate = $('#customDateFilter').val();

        // Get the events from the localStorage
        var eventos = JSON.parse(localStorage.getItem('eventos'));

        // Filter the events by the selected date
        var filteredEvents = eventos.filter(function(evento) {
            return evento.date === selectedDate;
        });

        // Show the filtered events
        mostrarEventos(filteredEvents);

         // Verificar si hay algún evento visible después de aplicar el filtro
  

        // Hide the date filter div
        $('#filterDateDiv').slideToggle();
    });

    function showPopup(message) {
        $('#popup-message').text(message);
        $('#popup').slideDown('slow').delay(5000).slideUp('slow'); // Transición más lenta
    }
    
    function showPopup2(message) {
        $('#popup-message2').text(message);
        $('#popup2').slideDown('slow').delay(5000).slideUp('slow'); // Transición más lenta
    }
});