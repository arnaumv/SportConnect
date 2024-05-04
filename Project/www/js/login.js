console.log('login.js loaded');
$(document).on('pagecreate', function() {

    // Validación del nombre de usuario mientras se está escribiendo y al perder el foco
    $('.formLogin #email').on('input focusout', function() {
        var username = $(this).val().trim();
        if(username === ''){
            $('#error_username').text('Por favor, introduce tu nombre de usuario');
            $(this).addClass('error-input'); // Agregar clase de error al input
        } else {
            $('#error_username').text('');
            $(this).removeClass('error-input'); // Eliminar clase de error del input
        }
    });

    // Validación de la contraseña mientras se está escribiendo
    $('.formLogin #password').on('input', function() {
        var password = $(this).val().trim();
        if(password.length < 8 || password.length > 128){
            $('#error_password').text('La contraseña debe tener entre 8 y 128 caracteres');
            $(this).addClass('error-input'); // Agregar clase de error al input
        } else {
            $('#error_password').text('');
            $(this).removeClass('error-input'); // Eliminar clase de error del input
        }
    });

    $('.formLogin #btnSubmit').on('click', function() {
        console.log("El botón ha sido presionado");

        // Mostrar indicador de carga
        $('#loader').show();

        // Obtener los valores de los campos del formulario
        var email = $('.formLogin #email').val().trim();
        var password = $('.formLogin #password').val().trim();
        console.log(email, password);

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
                    email: email,
                    password: password
                }),
                success: function(data) {
                    console.log('Login successful:', data);
                    // Guarda los tokens y el correo electrónico en el almacenamiento local del navegador
                    localStorage.setItem('refreshToken', data.refresh);
                    localStorage.setItem('accessToken', data.access);
                    localStorage.setItem('email', email);
                    localStorage.setItem('username', data.username); // Asegúrate de que tu API devuelva el nombre de usuario


                    window.location.href = 'landingpage.html';

                    // Ocultar indicador de carga después de completar la solicitud
                    $('#loader').hide();

                    //showPopup2(data.message);

                },
                error: function(error) {
                    //console.log('Error:', error);
                    showPopup("Correo electrónico o contraseña incorrectos");
                    // Ocultar indicador de carga en caso de error
                    $('#loader').hide();
                }
            });
        } else {
            //console.log('Hubo un error al iniciar sesión');                    
            showPopup('Hubo un error al iniciar sesión');
            // Ocultar indicador de carga en caso de error
            $('#loader').hide();
        }
    });
});

$(document).ready(function() {
    // Seleccionar todos los elementos con la clase "toNewUser"
    $(".toNewUser").click(function(event) {

        
        // Redirigir a la nueva URL
        window.location.href = "newUser.html";
    });

    // Seleccionar todos los elementos con la clase "toResetPassMail"
    $(".toResetPassMail").click(function(event) {

        
        // Redirigir a la nueva URL
        window.location.href = "resetPassMail.html";
    });

    $('#redirectToIndex').on('click', function() {
        window.location.href = 'Index.html';
        });
});

function showPopup(message) {
    $('#popup-message').text(message);
    $('#popup').slideDown('slow').delay(5000).slideUp('slow'); // Transición más lenta
}

function showPopup2(message) {
    $('#popup-message2').text(message);
    $('#popup2').slideDown('slow').delay(5000).slideUp('slow'); // Transición más lenta
}
