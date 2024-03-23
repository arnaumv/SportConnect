$(document).ready(function() {

    //Movilidad entre paginas
    $('#landingpage').on('click', function() {
        window.location.href = 'landingpage.html';
    });

    $('#create').on('click', function() {
        window.location.href = 'Create.html';
    });

    $('#events').on('click', function() {
        window.location.href = 'Events.html';
    });

    $('#profile').on('click', function() {
        window.location.href = 'Profile.html';
    });

    $(document).on('click', '#btnEnviarPass', function() {

        // Restablecer los mensajes de error
        $('.error').text('');

            // Obtener los valores de los campos del formulario
            var contrasena = $('#contrasena').val().trim();
            var repetirContrasena = $('#repetir-contrasena').val().trim();
            
            // Variable para verificar si hay errores
            var hayErrores = false;

            // Validación de la longitud y coincidencia de las contraseñas
        if(contrasena.length < 8){
            $('#error_contrasena').text('La contraseña debe tener al menos 8 caracteres');
            hayErrores = true;
        } else if(contrasena !== repetirContrasena){
            $('#error_repetir_contrasena').text('Las contraseñas no coinciden');
            hayErrores = true;
        }

        // Si no hay errores, enviar los datos
        if(!hayErrores){
            // Aquí puedes agregar la lógica para enviar el formulario o realizar otras acciones necesarias
            console.log("Formulario enviado");
        }
    });
});
