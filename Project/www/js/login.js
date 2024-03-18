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
                url: 'http://localhost:8000/login/',
                method: 'POST',
                data: JSON.stringify({
                    email: email,
                    contrasena: contrasena
                }),
                contentType: 'application/json',
                success: function(data) {
                    console.log('Response data:', data);
                    console.log('Login successful:', data);
                    localStorage.setItem('token', data.token);
                },
                error: function(error) {
                    console.log('Error:', error);
                }
            });
        }
    });
});
