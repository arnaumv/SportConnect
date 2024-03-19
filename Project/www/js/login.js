$(document).on('click', '#btnSubmit', function() {
    console.log("El botón ha sido presionado");

    // Restablecer los mensajes de error
    $('.error').text('');

    // Obtener los valores de los campos del formulario
    var username = $('#username').val().trim();
    var password = $('#password').val().trim();
    console.log(username, password);

    // Variable para verificar si hay errores
    var hasErrors = false;

    // Validación del nombre de usuario
    if(username === ''){
        $('#error_username').text('Por favor, introduce tu nombre de usuario');
        hasErrors = true;
    }

    // Validación de la longitud de la contraseña
    if(password.length < 8 || password.length > 128){
        $('#error_password').text('La contraseña debe tener entre 8 y 128 caracteres');
        hasErrors = true;
    }

    // Si no hay errores, enviar los datos
    if(!hasErrors){
        $.ajax({
            url: 'http://127.0.0.1:8000/login/',
            method: 'POST',
            data: JSON.stringify({
                username: username,
                password: password
            }),
            contentType: 'application/json',
            success: function(data) {
                console.log('Login successful:', data);
                // Guarda los tokens y el nombre de usuario en el almacenamiento local del navegador
                localStorage.setItem('refreshToken', data.refresh);
                localStorage.setItem('accessToken', data.access);
                localStorage.setItem('username', username);
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