$(document).on('pagecreate', function() {
    console.log("FICHERO RESETPASSMAILJS");  // Console log here

     //Movilidad entre paginas
     $('#flecha-izquierda').on('click', function() {
        window.location.href = 'login.html';
        });

    $('#email').on('focusout', function() {

        var email = $('#email').val().trim();
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            $('#error_email').text('Introduce un correo electrónico válido');
            $(this).addClass('error-input'); // Agregar clase de error al input

        } else {
            $('#error_email').text('');
            $(this).removeClass('error-input'); // Eliminar clase de error del input
        }
    });

    $('#btnEnviarMail').on('vclick', function() {
        console.log("Button clicked");  // Console log here
        var hasErrors = false;
        if($('#error_email').text() !== ''){
            hasErrors = true;
        }
    
        // Obtener el valor del campo de correo electrónico
        var email = $('#email').val().trim();
    
        // Si no hay errores, puedes continuar con el proceso
        if (!hasErrors) {
            // Check if the email exists in the User table
            $.ajax({
                url: 'http://127.0.0.1:8000/check_email/',  // URL of the view that checks if the email exists
                method: 'POST',
                data: {
                    email: email,
                },
                success: function(response) {
                    if (response.exists) {
                        // If the email exists, send the password reset email
                        $.ajax({
                            url: 'http://127.0.0.1:8000/reset_password/',  // URL of the view that sends the email
                            method: 'POST',
                            data: {
                                email: email,
                            },
                            success: function() {
                                //alert('Correo de restablecimiento de contraseña enviado');
                                showPopup2('Correo de restablecimiento de contraseña enviado');
                            },
                            error: function() {
                                //alert('Hubo un error al enviar el correo de restablecimiento de contraseña');
                                showPopup('Hubo un error al enviar el correo de restablecimiento de contraseña');
                            }
                        });
                    } else {
                        // If the email does not exist, show an error message
                        //alert('Este correo electrónico no existe');
                        showPopup('Este correo electrónico no existe');
                    }
                },
                error: function() {
                    //alert('Hubo un error al verificar el correo electrónico');
                    showPopup('Hubo un error al verificar el correo electrónico');
                }
            });
        }
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