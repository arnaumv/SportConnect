$(document).ready(function() {
    $('#btnSubmit').click(function(e) {
        e.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();
        var hasErrors = false;

        // Validación del campo de nombre de usuario
        if (username === '') {
            $('#error_username').html('Por favor, introduce tu nombre de usuario');
            hasErrors = true;
        } else {
            $('#error_username').html('');
        }

        // Validación del campo de contraseña
        if (password.length < 8 || password.length > 128) {
            $('#error_password').html('La contraseña debe tener entre 8 y 128 caracteres');
            hasErrors = true;
        } else {
            $('#error_password').html('');
        }

        // Si no hay errores, puedes enviar la solicitud AJAX
        if (!hasErrors) {
            $.ajax({
                url: 'http://localhost:8001/login/',
                method: 'POST',
                data: JSON.stringify({
                    username: username,
                    password: password
                }),
                contentType: 'application/json',
                success: function(data) {
                    console.log('Login successful:', data);
                    // Guarda los tokens en el almacenamiento local del navegador
                    localStorage.setItem('refreshToken', data.refresh);
                    localStorage.setItem('accessToken', data.access);
                    // Redirige al usuario a index.html
                    window.location.href = 'Index.html';
                },
                error: function(error) {
                    console.log('Error:', error);
                }
            });
        } else {
            console.log('Hubo un error al iniciar sesión');
        }
    });
});