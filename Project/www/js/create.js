$(document).ready(function(){
    // CREATE

    document.addEventListener("deviceready", function() {
        // console.log("Script create.js loaded and deviceready fired.");
    
        $(document).on("mobileinit", function() {
            // console.log("Mobileinit event fired.");
            $.mobile.autoInitializePage = false; // Deshabilitar la inicialización automática
        });
    
        $(document).on("pagecreate", "#create-page", function() {
            // console.log("Pagecreate event fired.");
    
            var selectUbicacion = document.getElementById("ubicacion");
            var selectDeporte = document.getElementById("tipoDeporte");
    
            fetch("ubicacion.json")
                .then(response => response.json())
                .then(data => {
                    // console.log("Ubicaciones obtenidas del JSON:", data);
    
                    // Event listener para el cambio en el select "Deporte"
                    $(selectDeporte).on("change", function() {
                        // console.log("Deporte seleccionado:", this.value);
    
                        // Limpiar opciones actuales del select "Ubicación"
                        $(selectUbicacion).empty();
    
                        // Obtener y filtrar las ubicaciones según el deporte seleccionado
                        var deporteSeleccionado = this.value.toLowerCase();
                        var ubicaciones = data.locations.filter(ubicacion =>
                            ubicacion.actividad.some(actividad =>
                                actividad.toLowerCase() === deporteSeleccionado
                            )
                        ).map(ubicacion => ubicacion['nombre de ubicacion']);
    
                        // console.log("Ubicaciones filtradas por Deporte:", ubicaciones);
    
                        // Agregar las ubicaciones filtradas al select "Ubicación"
                        ubicaciones.forEach(function(ubicacion) {
                            var option = document.createElement("option");
                            option.text = ubicacion;
                            option.value = ubicacion;
                            selectUbicacion.add(option);
                        });
    
                        // Refresh the selectmenu after dynamically adding options
                        $(selectUbicacion).selectmenu("refresh", true);
                    });
    
                    // Disparar el evento change del select "Deporte" para inicializar las ubicaciones
                    $(selectDeporte).change();
                })
                .catch(error => console.error('Error al obtener ubicaciones:', error));
        });
    
        $(document).on("pagecontainercreate", function() {
            // console.log("Pagecontainercreate event fired.");
            $(document).trigger("pagecreate");
        });
    
    });



   // var token = window.localStorage.getItem('token');

    // if (!token) {
    //     // Si no hay un token, redirige al usuario a la página de inicio de sesión
    //     window.location.href = 'login.html';
    //     return;
    // }


    $('#btnEnviar').click(function(e){
        e.preventDefault();

        // Si hay un token, procede a crear el evento
        var titulo = $('#titulo').val();
        var tipoDeporte = $('#tipoDeporte').val();
        var fecha = $('#fecha').val();
        var hora = $('#hora').val();
        var ubicacion = $('#ubicacion').val();
        var descripcion = $('#descripcion').val();

        $.ajax({
            url: 'http://localhost:8001/events/',  // URL de tu aplicación Django local
            type: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token // Aquí se incluye el token en la cabecera de la solicitud
            },
            data: JSON.stringify({
                title: titulo,
                sport: tipoDeporte,
                date: fecha,
                time: hora,
                location: ubicacion,
                description: descripcion
            }),
            success: function(result) {
                // maneja el éxito
                console.log(result);
                alert('Evento creado con éxito.');  // Mensaje de éxito
            },
            error: function(error) {
                // maneja el error
                console.log(error);
                alert('Hubo un error al crear el evento.');  // Mensaje de error
            }
        });
    });
});

