$(document).ready(function(){
  $('#btnEnviar').click(function(){
      var titulo = $('#titulo').val();
      var tipoDeporte = $('#tipoDeporte').val();
      var fecha = $('#fecha').val();
      var hora = $('#hora').val();
      var ubicacion = $('#ubicacion').val();
      var descripcion = $('#descripcion').val();

      $.ajax({
        url: 'http://localhost:8000/events/',  // URL de tu aplicación Django local
        type: 'POST',
          data: {
              title: titulo,
              sport: tipoDeporte,
              date: fecha,
              time: hora,
              location: ubicacion,
              description: descripcion
          },
          success: function(result) {
              // maneja el éxito
              console.log(result);
              alert('Evento creado con éxito.');  // Mensaje de éxito
          },
          error: function(error) {
              // maneja el error
              console.log(error);
              alert('Hubo un error al crear el evento.');  // Mensaje de error
          }
      });
  });
});
