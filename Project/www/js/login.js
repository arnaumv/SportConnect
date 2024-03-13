$(document).ready(function() {
    $('#btnEnviar').click(function(e) {
        e.preventDefault();

        var nombre = $('#nombre').val();
        var contrasena = $('#contrasena').val();

        $.ajax({
            url: 'http://localhost:8000/login/',  // URL de tu endpoint de autenticación
            method: 'POST',
            data: {
                username: nombre,
                password: contrasena
            },
            success: function(data) {
                console.log('Token: ' + data.token);
                // Guarda el token en el almacenamiento local del navegador
                window.localStorage.setItem('token', data.token);
                // Redirige al usuario a la página principal de tu aplicación
                window.location.href = 'Index.html';
            },
            error: function(xhr, status, error) {
                console.log('Error: ' + error);
                console.log('Status: ' + status);
                console.log(xhr);
                // Aquí puedes manejar el error, por ejemplo mostrando un mensaje al usuario
            }
        });
    });
});
