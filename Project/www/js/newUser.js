$(document).ready(function(){
  $('#btnEnviar').click(function(){
    var nombre = $('#nombre').val();
    var apellido = $('#apellido').val();
    var email = $('#email').val();
    var contrasena = $('#contrasena').val();
    var ciudad = $('#ciudad').val();
    var añoNacimiento = $('#añoNacimiento').val();
    console.log('Nombre: ' + nombre);
    console.log('Apellido: ' + apellido);
    console.log('Email: ' + email);
    console.log('Contraseña: ' + contrasena);
    console.log('Ciudad: ' + ciudad);
    console.log('Año de Nacimiento: ' + añoNacimiento);
    $.ajax({
      url: 'http://localhost:8000/users/',  // URL de tu aplicación Django local
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
          // maneja el éxito
          console.log(result);
          alert('Usuario creado con éxito.');  
          window.location.href = 'login.html';  // Redirige al usuario a la página de inicio de sesión

      },
      error: function(error) {
          // maneja el error
          console.log(error);
          alert('Hubo un error al crear el usuario.');  
      }
    });
  });
});
