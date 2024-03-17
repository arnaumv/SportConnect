$(document).ready(function() {
    $('#btnEnviar').click(function(e) {
        e.preventDefault();
        console.log("login");
        var email = $('#email').val();
        var contrasena = $('#contrasena').val();
        var areErrors = false;

        // Validación del campo de correo electrónico
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el formato del correo electrónico
        if (!emailPattern.test(email)) {
            $('#error_email').html('Introduce un correo electrónico válido');
            areErrors = true;
        } else {
            $('#error_email').html('');
        }

        // Validación del campo de contraseña
        if (contrasena.length < 8 || contrasena.length > 128) {
            $('#error_contrasena').html('La contraseña debe tener entre 8 y 128 caracteres');
            areErrors = true;
        } else {
            $('#error_contrasena').html('');
        }

        // Si no hay errores, puedes enviar la solicitud AJAX
        if (!areErrors) {
            $.ajax({
                url: 'http://localhost:8000/login/',  // URL de tu endpoint de autenticación
                method: 'POST',
                data: {
                    email: email,
                    password: contrasena
                },
                success: function(data) {
                    console.log('Token: ' + data.token);
                    // Guarda el token en el almacenamiento local del navegador
                    window.localStorage.setItem('token', data.token);
                    // Redirige al usuario a la página principal de tu aplicación
                    window.location.href = '/Index.html';
                },
                error: function(xhr, status, error) {
                    console.log('Error: ' + error);
                    console.log('Status: ' + status);
                    console.log(xhr);
                    // Aquí puedes manejar el error, por ejemplo mostrando un mensaje al usuario
                    alert('Error: ' + error + '. ' + 'Status: ' + status);
                }
            });
        }
    });
});
