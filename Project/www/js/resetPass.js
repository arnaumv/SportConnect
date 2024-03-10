$(document).ready(function(){
    $('#btnEnviar').click(function(){
      var contrasena = $('#contrasena').val();
      var repetirContrasena = $('#repetir-contrasena').val();
      
      console.log('Contraseña: ' + contrasena);
      console.log('Repetir Contraseña: ' + repetirContrasena);
      
      if (contrasena !== repetirContrasena) {
          alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
          return false; // Evita que el formulario se envíe si las contraseñas no coinciden
      }
      
    });
});
