$(document).on('pagecreate', function() {
    console.log("FICHERO RESETPASSMAILJS");  // Console log here

    $('#btnEnviarMail').on('vclick', function() {
        console.log("Button clicked");  // Console log here

        // Restablecer los mensajes de error
        $('.error').text('');

        // Obtener el valor del campo de correo electrónico
        var email = $('#email').val().trim();

        // Variable para verificar si hay errores
        var hayErrores = false;

        // Validación del correo electrónico
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            $('#error_email').text('Introduce un correo electrónico válido');
            hayErrores = true;
        }

        // Si no hay errores, puedes continuar con el proceso
        if (!hayErrores) {
            // Aquí puedes agregar la lógica para enviar la solicitud AJAX
            console.log("ejecutar ajax");

            $.ajax({
                url: 'http://127.0.0.1:8000/reset_password/',  // URL de la vista que envía el correo
                method: 'POST',
                data: {
                    email: email,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
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