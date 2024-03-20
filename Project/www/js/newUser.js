$(document).ready(function() {
  // Validación del nombre de usuario al perder el foco
  $('#username').on('focusout', function() {
      var username = $(this).val().trim();
      if(username === ''){
          $('#error_username').text('Por favor, introduce tu nombre de usuario');
      } else {
          $('#error_username').text('');
      }
  });

  // Validación del correo electrónico al perder el foco
  $('#email').on('focusout', function() {
      var email = $(this).val().trim();
      if(email === ''){
          $('#error_email').text('Por favor, introduce tu correo electrónico');
      } else if(!isValidEmail(email)){
          $('#error_email').text('El correo electrónico no es válido');
      } else {
          $('#error_email').text('');
      }
  });

  // Validación de la contraseña al perder el foco
  $('#password').on('focusout', function() {
      var password = $(this).val().trim();
      if(password.length < 8 || password.length > 128){
          $('#error_password').text('La contraseña debe tener entre 8 y 128 caracteres');
      } else {
          $('#error_password').text('');
      }
  });

  // Confirmación de la contraseña al perder el foco
  $('#confirm_password').on('focusout', function() {
      var password = $('#password').val().trim();
      var confirm_password = $(this).val().trim();
      if(password !== confirm_password){
          $('#error_confirm_password').text('Las contraseñas no coinciden');
      } else {
          $('#error_confirm_password').text('');
      }
  });

  // Validación de la ciudad al perder el foco
  $('#city').on('focusout', function() {
      var city = $(this).val().trim();
      if(city.length < 2){
          $('#error_city').text('La ciudad debe tener al menos 2 caracteres');
      } else {
          $('#error_city').text('');
      }
  });

  // Validación de la fecha de nacimiento al perder el foco
  $('#birthdate').on('focusout', function() {
      var birthdate = $(this).val().trim();
      if(birthdate === ''){
          $('#error_birthdate').text('Por favor, introduce tu fecha de nacimiento');
      } else if(!isValidDate(birthdate)){
          $('#error_birthdate').text('La fecha de nacimiento no es válida');
      } else {
          $('#error_birthdate').text('');
      }
  });

  $('#btnSubmit').on('click', function() {
      console.log("El botón ha sido presionado");

      // Obtener los valores de los campos del formulario
      var username = $('#username').val().trim();
      var email = $('#email').val().trim();
      var password = $('#password').val().trim();
      var confirm_password = $('#confirm_password').val().trim();
      var city = $('#city').val().trim();
      var birthdate = $('#birthdate').val().trim();
      console.log(username, email, password, confirm_password, city, birthdate);

      // Variable para verificar si hay errores
      var hasErrors = false;

      // Verificar si hay mensajes de error
      if($('#error_username').text() !== '' || $('#error_email').text() !== '' || $('#error_password').text() !== '' || $('#error_confirm_password').text() !== '' || $('#error_city').text() !== '' || $('#error_birthdate').text() !== ''){
          hasErrors = true;
      }

      // Si no hay errores, enviar los datos
      if(!hasErrors){
          // Aquí podrías enviar los datos a través de AJAX o realizar otra acción
          alert('¡Formulario enviado correctamente!');
          $.ajax({
            url: 'http://127.0.0.1:8000/usuario/', 
            method: 'POST',
            data: {
              username: username,
              email: email,
              password: password,
              city: city,
              birthdate: birthdate
            },
            success: function(data) {
              console.log('Usuario creado con éxito:', data);
              // Redirige al usuario a login.html
              window.location.href = 'login.html';
            },
            error: function(error) {
              console.log('Error:', error);
            }
          });
      } 
  });

  // Función para validar el formato del correo electrónico
  function isValidEmail(email) {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  }

  // Función para validar la fecha de nacimiento
  function isValidDate(dateString) {
      var today = new Date();
      var birthdate = new Date(dateString);
      return birthdate < today;
  }
});

