$(document).ready(function() {
  $('#btnEnviar').click(function(e) {
      e.preventDefault();

      var nombre = $('#nombre').val();
      var apellido = $('#apellido').val();
      var email = $('#email').val();
      var contrasena = $('#contrasena').val();
      var ciudad = $('#ciudad').val();
      var fecha_nacimiento = $('#añoNacimiento').val();

      $.ajax({
          url: 'http://localhost:8000/usuario/',
          method: 'POST',
          data: JSON.stringify({
              nombre: nombre,
              apellido: apellido,
              email: email,
              contrasena: contrasena,
              ciudad: ciudad,
              fecha_nacimiento: fecha_nacimiento
          }),
          contentType: 'application/json',
          success: function(data) {
              console.log('Usuario creado con éxito:', data);
          },
          error: function(error) {
              console.log('Error:', error);
          }
      });
  });
});