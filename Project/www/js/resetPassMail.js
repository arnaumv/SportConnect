$(document).ready(function() {
    $('#email').on('input', function() {
        console.log("escribiendo...")
        // Restablecer los mensajes de error
        $('.error').text('');

        // Obtener el valor del campo de correo electrónico
        var email = $(this).val().trim();

        // Validación del correo electrónico
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            $('#error_email').text('Introduce un correo electrónico válido');
        }
    });

    $('#btnEnviarMail').click(function() {
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
        }
    });
});

