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
    document.addEventListener("deviceready", function() {
        console.log("Script create.js loaded and deviceready fired.");

        $(document).on("mobileinit", function() {
            console.log("Mobileinit event fired.");
            $.mobile.autoInitializePage = false; // Disable automatic initialization
        });

        $(document).on("pageshow", "#create-page", function() {
            var selectUbicacion = document.getElementById("ubicacion");
            var selectDeporte = document.getElementById("tipoDeporte");

            fetch("ubicacion.json")
                .then(response => response.json())
                .then(data => {
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

            $('#btnEnviar').click(function(e){
                e.preventDefault();
                console.log('Button clicked.');  // Log the button click event

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
                                    user: userId
                                }),
                                success: function(result) {
                                    console.log('AJAX request successful. Event created:', result);
                                    alert('Evento creado con éxito.');
                                    window.location.href = 'landingpage.html'; // Redirige al usuario a 'create.html'
                                },
                                error: function(error) {
                                    console.log('AJAX request failed. Error creating event:', error);
                                    alert('Hubo un error al crear el evento.');
                                }
                            });
                        },
                        error: function(error) {
                            console.log('AJAX request failed. Error retrieving user ID:', error);
                            alert('Hubo un error al obtener el usuario.');
                        }
                    });
                } else {
                    console.log('No username found');
                }
            });
        });

        $(document).on("pagecontainercreate", function() {
            $(document).trigger("pageshow");
        });
    });
});