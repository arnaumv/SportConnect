$(document).ready(function() {
    console.log("NewUser");

   /*  //Movilidad entre paginas
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
    }); */

    $('#redirectToIndex').on('click', function() {
        window.location.href = 'Index.html';
    });

    // Validación del nombre de usuario mientras se está escribiendo y al perder el foco
    $('.formNewUser #username').on('input focusout', function() {
        var username = $(this).val().trim();
        if(username === ''){
            $('#error_username').text('Por favor, introduce tu nombre de usuario');
            $(this).addClass('error-input'); // Agregar clase de error al input
        } else {
            $('#error_username').text('');
            $(this).removeClass('error-input'); // Eliminar clase de error del input
        }
    });

    // Validación del correo electrónico mientras se está escribiendo y al perder el foco
    $('.formNewUser #email').on('input focusout', function() {
        var email = $(this).val().trim();
        if(email === ''){
            $('#error_email').text('Por favor, introduce tu correo electrónico');
            $(this).addClass('error-input'); // Agregar clase de error al input
        } else if(!isValidEmail(email)){
            $('#error_email').text('El correo electrónico no es válido');
            $(this).addClass('error-input'); // Agregar clase de error al input
        } else {
            $('#error_email').text('');
            $(this).removeClass('error-input'); // Eliminar clase de error del input
        }
    });

    // Validación de la contraseña mientras se está escribiendo y al perder el foco
    $('.formNewUser #password').on('input focusout', function() {
        var password = $(this).val().trim();
        if(password.length < 8 || password.length > 128){
            $('#error_password').text('La contraseña debe tener entre 8 y 128 caracteres');
            $(this).addClass('error-input'); // Agregar clase de error al input
        } else {
            $('#error_password').text('');
            $(this).removeClass('error-input'); // Eliminar clase de error del input
        }
    });

    // Confirmación de la contraseña mientras se está escribiendo y al perder el foco
    $('.formNewUser #confirm_password').on('input focusout', function() {
        var password = $('.formNewUser #password').val().trim();
        var confirm_password = $(this).val().trim();
        if(password !== confirm_password){
            $('#error_confirm_password').text('Las contraseñas no coinciden');
            $(this).addClass('error-input'); // Agregar clase de error al input
        } else {
            $('#error_confirm_password').text('');
            $(this).removeClass('error-input'); // Eliminar clase de error del input
        }
    });

    // Validación de la ciudad mientras se está escribiendo y al perder el foco
    $('.formNewUser #city').on('input focusout', function() {
        var city = $(this).val().trim();
        if(city.length < 2){
            $('#error_city').text('La ciudad debe tener al menos 2 caracteres');
            $(this).addClass('error-input'); // Agregar clase de error al input
        } else {
            $('#error_city').text('');
            $(this).removeClass('error-input'); // Eliminar clase de error del input
        }
    });

  // Validación de la fecha de nacimiento al perder el foco
  $('.formNewUser #birthdate').on('focusout', function() {
    var birthdate = new Date($(this).val());
    var today = new Date();
    if($(this).val().trim() === ''){
        $('.formNewUser #error_birthdate').text('Por favor, introduce tu fecha de nacimiento');
        $(this).addClass('error-input'); // Agregar clase de error al input
    } else if(!isValidDate(birthdate)){
        $('.formNewUser #error_birthdate').text('La fecha de nacimiento no es válida');
        $(this).addClass('error-input'); // Agregar clase de error al input
    } else if(birthdate > today){
        $('.formNewUser #error_birthdate').text('La fecha de nacimiento no puede ser mayor al día actual');
        $(this).addClass('error-input'); // Agregar clase de error al input
    } else {
        $('#error_birthdate').text('');
        $(this).removeClass('error-input'); // Eliminar clase de error del input
    }
    });

  $('.formNewUser #btnSubmit').on('click', function() {
      console.log("El botón ha sido presionado");

      // Obtener los valores de los campos del formulario
      var username = $('.formNewUser #username').val().trim();
      var email = $('.formNewUser #email').val().trim();
      var password = $('.formNewUser #password').val().trim();
      var confirm_password = $('.formNewUser #confirm_password').val().trim();
      var city = $('.formNewUser #city').val().trim();
      var birthdate = $('.formNewUser #birthdate').val().trim();

      console.log(username, email, password, confirm_password, city, birthdate);

      // Variable para verificar si hay errores
      var hasErrors = false;

      // Verificar si hay mensajes de error
      if($('#error_username').text() !== '' || $('#error_email').text() !== '' || $('#error_password').text() !== '' || $('#error_confirm_password').text() !== '' || $('#error_city').text() !== '' || $('#error_birthdate').text() !== ''){
          hasErrors = true;
      }

      // Si no hay errores, enviar los datos
      if(!hasErrors){
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

