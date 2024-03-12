$(document).ready(function(){
    var token = window.localStorage.getItem('token');

    if (!token) {
        // Si no hay un token, redirige al usuario a la página de inicio de sesión
        window.location.href = 'login.html';
        return;
    }

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
            url: 'http://localhost:8000/events/',  // URL de tu aplicación Django local
            type: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token // Aquí se incluye el token en la cabecera de la solicitud
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
