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
        window.location.href = 'landingpage.html';
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


    $('#titulo').on('focusout', function() {
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
$('.timeDate input').on('focusout', function() {
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

$('#descripcion').on('focusout', function() {
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
                url: 'http://127.0.0.1:8000/userid/' + username + '/',
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
                        url: 'http://127.0.0.1:8000/event/',
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
                            //alert('Evento creado con éxito.');
                            showPopup2('Evento creado con éxito');
                            setTimeout(function() {
                                window.location.href = 'landingpage.html';
                            }, 6200); // 6200 milisegundos = 6.2 segundos
                                                    },
                        error: function(error) {
                            console.log('AJAX request failed. Error creating event:', error);
                            //alert('Hubo un error al crear el evento.');
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
    $('#popup').slideDown('slow').delay(5000).slideUp('slow'); // Transición más lenta
}

function showPopup2(message) {
    $('#popup-message2').text(message);
    $('#popup2').slideDown('slow').delay(5000).slideUp('slow'); // Transición más lenta
}