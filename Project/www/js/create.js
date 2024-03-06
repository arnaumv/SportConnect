$(document).ready(function(){
    $('#btnEnviar').click(function(){
      var titulo = $('#titulo').val();
      var tipoDeporte = $('#tipoDeporte').val();
      var fecha = $('#fecha').val();
      var ubicacion = $('#ubicacion').val();
      var descripcion = $('#descripcion').val();
      console.log('Título: ' + titulo);
      console.log('Tipo de Deporte: ' + tipoDeporte);
      console.log('Fecha: ' + fecha);
      console.log('Ubicación: ' + ubicacion);
      console.log('Descripción: ' + descripcion);
    });
  });
  