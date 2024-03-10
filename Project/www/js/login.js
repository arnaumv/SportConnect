$(document).ready(function(){
    $('#btnEnviar').click(function(){
      var nombre = $('#nombre').val();
      var contrasena = $('#contrasena').val();
      console.log('Nombre: ' + nombre);
      console.log('Contraseña: ' + contrasena);
    });
});
