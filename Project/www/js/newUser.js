$(document).ready(function(){
  $('#btnEnviar').click(function(){
    var nombre = $('#nombre').val();
    var apellido = $('#apellido').val();
    var email = $('#email').val();
    var contrasena = $('#contrasena').val();
    var ciudad = $('#ciudad').val();
    var anioNacimiento = $('#anioNacimiento').val();
    console.log('Nombre: ' + nombre);
    console.log('Apellido: ' + apellido);
    console.log('Email: ' + email);
    console.log('Contraseña: ' + contrasena);
    console.log('Ciudad: ' + ciudad);
    console.log('Año de Nacimiento: ' + anioNacimiento);
  });
});
