console.log('login.js loaded');
$(document).on('pagecreate', function() {
    // Validación del nombre de usuario al perder el foco
    $('.formLogin #username').on('focusout', function() {
        var username = $(this).val().trim();
        if(username === ''){
            $('#error_username').text('Por favor, introduce tu nombre de usuario');
        } else {
            $('#error_username').text('');
        }
    });

    // Validación de la contraseña al perder el foco
    $('.formLogin #password').on('focusout', function() {
        var password = $(this).val().trim();
        if(password.length < 8 || password.length > 128){
            $('#error_password').text('La contraseña debe tener entre 8 y 128 caracteres');
        } else {
            $('#error_password').text('');
        }
    });

    $('.formLogin #btnSubmit').on('click', function() {
        console.log("El botón ha sido presionado");

        // Obtener los valores de los campos del formulario
        var username = $('.formLogin #username').val().trim();
        var password = $('.formLogin #password').val().trim();
        console.log(username, password);

        // Variable para verificar si hay errores
        var hasErrors = false;

        // Verificar si hay mensajes de error
        if($('#error_username').text() !== '' || $('#error_password').text() !== ''){
            hasErrors = true;
        }

        // Si no hay errores, enviar los datos
        if(!hasErrors){
            $.ajax({
                url: 'http://127.0.0.1:8000/login/',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    username: username,
                    password: password
                }),
                success: function(data) {
                    console.log('Login successful:', data);
                    // Guarda los tokens y el nombre de usuario en el almacenamiento local del navegador
                    localStorage.setItem('refreshToken', data.refresh);
                    localStorage.setItem('accessToken', data.access);
                    localStorage.setItem('username', username);

                    window.location.href = 'landingpage.html';
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

$(document).ready(function() {
    // Seleccionar todos los elementos con la clase "centered-link"
    $(".centered-link").click(function(event) {

        
        // Redirigir a la nueva URL
        window.location.href = "newUser.html";
    });
});