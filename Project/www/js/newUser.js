$(document).ready(function(){
  $('#btnEnviar').click(function(){
      // Restablecer los mensajes de error
      $('.error').text('');

      // Obtener los valores de los campos del formulario
      var nombre = $('#nombre').val().trim();
      var apellido = $('#apellido').val().trim();
      var email = $('#email').val().trim();
      var contrasena = $('#contrasena').val().trim();
      var ciudad = $('#ciudad').val().trim();
      var añoNacimiento = $('#añoNacimiento').val().trim();
      
      // Variable para verificar si hay errores
      var hayErrores = false;

      // Validación del nombre
      if(nombre === ''){
          $('#error_nombre').text('Por favor, introduce tu nombre');
          hayErrores = true;
      }

      // Validación del apellido
      if(apellido === ''){
          $('#error_apellido').text('Por favor, introduce tu apellido');
          hayErrores = true;
      }

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el formato del correo electrónico
        if (!emailPattern.test(email)) {
            $('#error_email').html('Introduce un correo electrónico válido');
            hayErrores = true;
        } else {
            $('#error_email').html('');
        }

      // Validación de la longitud y complejidad de la contraseña
      if(contrasena.length < 8){
          $('#error_contrasena').text('La contraseña debe tener al menos 8 caracteres');
          hayErrores = true;
      } else if (!/[A-Z]/.test(contrasena) || !/[a-z]/.test(contrasena) || !/[0-9]/.test(contrasena)) {
          $('#error_contrasena').text('La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número');
          hayErrores = true;
      }

      if(ciudad === ''){
        $('#error_nombre').text('Por favor, introduce tu ciudad');
        hayErrores = true;
      }

      if(añoNacimiento === ''){
        $('#error_nombre').text('Por favor, introduce tu fecha de nacimiento');
        hayErrores = true;
      }

      // Si no hay errores, enviar los datos
      if(!hayErrores){
          $.ajax({
              url: 'http://localhost:8000/users/',
              type: 'POST',
              data: {
                  name: nombre,
                  surname: apellido,
                  email: email,
                  password: contrasena,
                  city: ciudad,
                  birth_date: añoNacimiento
              },
              success: function(result) {
                  console.log(result);
                  alert('Usuario creado con éxito.');  
              },
              error: function(error) {
                  console.log(error);
                  alert('Hubo un error al crear el usuario.');  
              }
          });
      }
  });
});
