$(document).on('click', '#btnEnviar', function() {
    $('#btnEnviar').click(function(){
        // Restablecer los mensajes de error
        $('.error').text('');

        // Obtener los valores de los campos del formulario
        var contrasena = $('#contrasena').val();
        var repetirContrasena = $('#repetir-contrasena').val();

        // Verificar si los campos de contraseña existen y tienen un valor
        if (contrasena === undefined || contrasena === null || contrasena === '' ||
            repetirContrasena === undefined || repetirContrasena === null || repetirContrasena === '') {
            console.log('Los campos de contraseña no pueden estar vacíos');
            return;
        }

        // Hacer trim en los campos de contraseña
        contrasena = contrasena.trim();
        repetirContrasena = repetirContrasena.trim();

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