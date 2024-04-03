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
            // Aquí puedes agregar la lógica para enviar la solicitud AJAX
            console.log("ejecutar ajax");

            $.ajax({
                url: 'http://127.0.0.1:8000/reset_password/',  // URL de la vista que envía el correo
                method: 'POST',
                data: {
                    email: email,
                },
                success: function() {
                    alert('Correo de restablecimiento de contraseña enviado');
                },
                error: function() {
                    alert('Hubo un error al enviar el correo de restablecimiento de contraseña');
                }
            });
        }
        
    });
});