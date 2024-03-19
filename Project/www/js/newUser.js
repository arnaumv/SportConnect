$(document).ready(function(){
    $('#btnSubmit').click(function(){
        // Restablecer los mensajes de error
        $('.error').text('');
  
        // Obtener los valores de los campos del formulario
        var username = $('#username').val().trim();
        var email = $('#email').val().trim();
        var password = $('#password').val().trim();
        var city = $('#city').val().trim();
        var birthdate = $('#birthdate').val().trim();
        
        // Variable para verificar si hay errores
        var hasErrors = false;
        
        //8 caracteres, min y may, y numeros...

        // Validación del nombre de usuario
        if(username === ''){
            $('#error_username').text('Por favor, introduce tu nombre de usuario');
            hasErrors = true;
        }
  
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el formato del correo electrónico
          if (!emailPattern.test(email)) {
              $('#error_email').html('Introduce un correo electrónico válido');
              hasErrors = true;
          } else {
              $('#error_email').html('');
          }
  
        // Validación de la longitud y complejidad de la contraseña
        if(password.length < 8){
            $('#error_password').text('La contraseña debe tener al menos 8 caracteres');
            hasErrors = true;
        } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
            $('#error_password').text('La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número');
            hasErrors = true;
        }
  
        if(city === ''){
          $('#error_city').text('Por favor, introduce tu ciudad');
          hasErrors = true;
        }
  
        if(birthdate === ''){
          $('#error_birthdate').text('Por favor, introduce tu fecha de nacimiento');
          hasErrors = true;
        }
  
        // Si no hay errores, enviar los datos
        if(!hasErrors){
          $.ajax({
              url: 'http://localhost:8000/usuario/',
              method: 'POST',
              data: JSON.stringify({
                  username: username,
                  email: email,
                  password: password,
                  city: city,
                  birthdate: birthdate
              }),
              contentType: 'application/json',
              success: function(data) {
                  console.log('Usuario creado con éxito:', data);
              },
              error: function(error) {
                  console.log('Error:', error);
              }
          });
        }
    });
  });