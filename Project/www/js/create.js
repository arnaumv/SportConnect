$(document).ready(function(){
    // CREATE
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
        window.location.href = 'Create.html';
    });
    
    $('#redirectToNotify').on('click', function() {
        window.location.href = 'notify.html';
    });
    
    console.log("Script create.js loaded and deviceready fired.");

    $(document).on("mobileinit", function() {
        console.log("Mobileinit event fired.");
        $.mobile.autoInitializePage = false; // Disable automatic initialization
    });

    var selectUbicacion = document.getElementById("ubicacion");
var selectDeporte = document.getElementById("tipoDeporte");
var data;  // Declare data variable outside fetch to access it later

fetch("ubicacion.json")
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;  // Assign fetched data to data variable
        $(selectDeporte).on("change", function() {
            $(selectUbicacion).empty();

            var deporteSeleccionado = this.value.toLowerCase();
            var ubicaciones = data.locations.filter(ubicacion =>
                ubicacion.actividad.some(actividad =>
                    actividad.toLowerCase() === deporteSeleccionado
                )
            ).map(ubicacion => ubicacion['nombre de ubicacion']);

            ubicaciones.forEach(function(ubicacion) {
                var option = document.createElement("option");
                option.text = ubicacion;
                option.value = ubicacion;
                selectUbicacion.add(option);
            });

            $(selectUbicacion).selectmenu("refresh", true);
        });

        $(selectDeporte).change();
    })
    .catch(error => console.error('Error getting locations:', error));


    $('#titulo').on('input focusout', function() {
        var titulo = $(this).val().trim();
        if (titulo === '') {
            $('#error_titulo').text('Por favor, introduce un título para el evento');
            $(this).addClass('error-input'); // Agregar clase de error al input
        } else if (titulo.length < 5) {
            $('#error_titulo').text('El título debe tener al menos 5 caracteres');
            $(this).addClass('error-input'); // Agregar clase de error al input
        } else {
            $('#error_titulo').text('');
            $(this).removeClass('error-input'); // Eliminar clase de error del input
        }
    });
    

// Validación de la fecha del evento al perder el foco
$('.timeDate input').on('input focusout', function() {
    var dateValue = $('#fecha').val();
    var timeValue = $('#hora').val();
    var eventDate = new Date(dateValue + ' ' + timeValue);
    var today = new Date();
    
    if (dateValue.trim() === '' || timeValue.trim() === '') {
        $('#error_event_date').text('Por favor, introduce la fecha y hora del evento');
        $('#fecha, #hora').addClass('error-input'); // Agregar clase de error al input
    } else if (!isValidDate(eventDate)) {
        $('#error_event_date').text('La fecha y hora del evento no son válidas');
        $('#fecha, #hora').addClass('error-input'); // Agregar clase de error al input
    } else if (eventDate < today) {
        $('#error_event_date').text('La fecha y hora del evento no puede ser anterior al día y hora actual');
        $('#fecha, #hora').addClass('error-input'); // Agregar clase de error al input
    } else {
        $('#error_event_date').text('');
        $('#fecha, #hora').removeClass('error-input'); // Eliminar clase de error del input
    }
});

$('#descripcion').on('input focusout', function() {
    var description = $(this).val().trim();
    if (description.length >= 10) {
        $('#error_descripcion').text('');
        $(this).removeClass('error-input');
    } else {
        $('#error_descripcion').text('La descripción debe tener al menos 10 caracteres');
        $(this).addClass('error-input');
    }
});


$('#btnEnviar').click(function(e){
    e.preventDefault();
    var hasErrors = false;
    console.log('Button clicked.');  // Log the button click event

    if ($('#error_titulo').text() !== '' || $('#error_event_date').text() !== '' || $('#error_descripcion').text() !== '') {
        hasErrors = true;
    }
    
    if(!hasErrors){
        var username = localStorage.getItem('username');

        if (username) {
            console.log('Username found:', username);

            $.ajax({
                url: 'https://sportconnect.ieti.site/userid/' + username + '/',
                type: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                success: function(result) {
                    console.log('AJAX request successful. User ID retrieved:', result.id);

                    var userId = result.id;
                    var titulo = $('#titulo').val();
                    var tipoDeporte = $('#tipoDeporte').val();
                    var fecha = $('#fecha').val();
                    var hora = $('#hora').val();
                    var ubicacion = $('#ubicacion').val();
                    var descripcion = $('#descripcion').val();

                    // Find the image path for the selected location
                    var ubicacionData = data.locations.find(ubicacionData => ubicacionData['nombre de ubicacion'] === ubicacion);
                    var imagePath = ubicacionData ? ubicacionData.imagen : '';

                    $.ajax({
                        url: 'https://sportconnect.ieti.site/event/',
                        type: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        data: JSON.stringify({
                            title: titulo,
                            sport: tipoDeporte,
                            date: fecha,
                            time: hora,
                            location: ubicacion,
                            description: descripcion,
                            user: userId,
                            image_path: imagePath  // Add the image path to the data sent
                        }),
                        success: function(result) {
                            console.log('AJAX request successful. Event created:', result);
                            showPopup2('Evento creado con éxito');
                        
                            // Combine date and time into a single string and replace space with 'T'
                            let fechaHora = fecha + 'T' + hora;

                            // Check if fechaHora can be converted to a Date object
                            if (isNaN(Date.parse(fechaHora))) {
                                console.error('Fecha y hora no son válidas:', fechaHora);
                                return;
                            }

                            // Create a notification for the event creation
                            let fechaHoraObj = new Date(fechaHora);

                            // Format the date and time for the message
                            let fechaFormateada = fechaHoraObj.toLocaleDateString();
                            let horaFormateada = fechaHoraObj.toLocaleTimeString();

                            // Format the time for the event_time field
                            let eventTime = fechaHoraObj.getHours().toString().padStart(2, '0') + ':' +
                                            fechaHoraObj.getMinutes().toString().padStart(2, '0') + ':' +
                                            fechaHoraObj.getSeconds().toString().padStart(2, '0');

                            $.ajax({
                                url: 'https://sportconnect.ieti.site/notification/',
                                type: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                data: JSON.stringify({
                                    type: 'create',
                                    username: username,
                                    event_title: titulo,
                                    event_sport: tipoDeporte,
                                    event_location: ubicacion,
                                    event_date: fechaHoraObj.toISOString(), // Keep the ISO string for the event_date field
                                    event_time: eventTime,
                                    message: 'Has creado un evento de "' + tipoDeporte + '.   "\nUbicacion: ' + ubicacion + '.    \nFecha y hora: ' + fechaFormateada + ' ' + horaFormateada
                                }),
                        
                                success: function(notificationResult) {
                                    console.log('Notification created successfully');
                                },
                                error: function(notificationError) {
                                    console.error('Error creating notification:', notificationError);
                                }
                            });
                        
                            // Hacer una solicitud AJAX para unirse al evento
                            $.ajax({
                                url: 'https://sportconnect.ieti.site/join-event/',
                                type: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                data: JSON.stringify({
                                    username: username,
                                    event: result.id,  // Usar el ID del evento que acaba de ser creado
                                }),
                                success: function(result) {
                                    console.log('AJAX request successful. Joined event:', result);
                        
                                    // Create a notification for joining the event
                                    $.ajax({
                                        url: 'https://sportconnect.ieti.site/notification/',
                                        type: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        data: JSON.stringify({
                                            type: 'join',
                                            username: username,
                                            event_title: titulo,
                                            event_sport: tipoDeporte,
                                            event_location: ubicacion,
                                            event_date: fechaHoraFormatted,
                                            event_time: eventTime,
                                            message: 'Te has unido al evento de "' + tipoDeporte + '"'
                                        }),
                                        success: function(notificationResult) {
                                            console.log('Notification created successfully');
                                        },
                                        error: function(notificationError) {
                                            console.error('Error creating notification:', notificationError);
                                        }
                                    });
                                },
                                error: function(error) {
                                    console.log('AJAX request failed. Error joining event:', error);
                                }
                            });
                        
                            
                            setTimeout(function() {
                                window.location.href = 'Events.html';
                            }, 2200); // 2200 milisegundos = 2.2 segundos
                            },
                            error: function(error) {
                                console.log('AJAX request failed. Error creating event:', error);
                                showPopup('Hubo un error al crear el evento');
                            }
                            });
                },
                error: function(error) {
                    console.log('AJAX request failed. Error retrieving user ID:', error);
                    //alert('Hubo un error al obtener el usuario.');
                    showPopup('Hubo un error al obtener el usuario');
                }
            });
        } else {
            console.log('No username found');
        }
    }
});
});

// Función para validar la fecha y hora del evento
function isValidDate(eventDate) {
    var today = new Date();
    return eventDate >= today; // La fecha y hora del evento deben ser iguales o posteriores a la fecha y hora actual
}

function showPopup(message) {
    $('#popup-message').text(message);
    $('#popup').slideDown('slow').delay(2000).slideUp('slow'); // Transición más lenta
}

function showPopup2(message) {
    $('#popup-message2').text(message);
    $('#popup2').slideDown('slow').delay(2000).slideUp('slow'); // Transición más lenta
}