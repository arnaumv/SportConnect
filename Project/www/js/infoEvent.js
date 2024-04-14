$(document).ready(function () {
  // Obtener el ID del evento del localStorage
  var eventId = localStorage.getItem("selectedEventId");
  // Hacer una solicitud AJAX para obtener la información del evento
  $.ajax({
    url: 'http://127.0.0.1:8000/event-filter/' + eventId + '/get_event',  // URL de tu API
    type: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
    beforeSend: function() {
        console.log('Sending AJAX request');
    },
    success: function(evento) {
        console.log('AJAX request succeeded');
        // Actualizar el HTML de la página con la información del evento
        $('.evento img').attr('src', evento.image_path);
        $('.evento h2').text(evento.title);
        $('.evento p').first().text('Fecha: ' + evento.date);
        $('.evento p').last().text('Descripción:' + evento.description);
        
        // Obtener el nombre de usuario almacenado
        var storedUsername = localStorage.getItem("username");
        // Comprobar si el nombre de usuario del creador del evento es el mismo que el nombre de usuario almacenado
        if (evento.creator_username.toLowerCase() === storedUsername.toLowerCase()) {
            // Si es el mismo, agregar el texto "Creado por ti"
            $('.evento').append('<p>Creado por tí</p>');
        } else {
            // Si no es el mismo, agregar el texto "Creado por " seguido del nombre de usuario del creador del evento
            $('.evento').append('<p>Creado por: ' + evento.creator_username + '</p>');
        }
      },
    error: function(error) {
        console.log('Error getting event:', error);
    }
  });
  // Función para cargar la lista de participantes
  function loadParticipants() {
    $.ajax({
      url: "http://127.0.0.1:8000/event/" + eventId + "/participants",
      type: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      success: function (participants) {
        console.log("Successfully got participants:", participants);

        // Limpiar la lista de participantes
        $(".participantes ul").empty();

        // Agregar cada participante a la lista
        participants.forEach(function (participant) {
          var listItem = $("<li></li>");
          var img = $("<img>").attr("src", "./img/Profile/User_photo.png"); // Asume que todos los usuarios tienen la misma imagen de perfil
          var infoDiv = $("<div></div>").addClass("info-participante");
          var nameP = $("<p></p>").text(participant.username);

          // Crear un objeto Date a partir de la fecha de unión del participante
          var joinDate = new Date(participant.join_date);

          // Formatear la fecha a día/mes/año
          var formattedJoinDate =
            joinDate.getDate() +
            "/" +
            (joinDate.getMonth() + 1) +
            "/" +
            joinDate.getFullYear();

          var joinDateP = $("<p></p>").text("Se unió el " + formattedJoinDate);

          infoDiv.append(nameP, joinDateP);
          listItem.append(img, infoDiv);
          $(".participantes ul").append(listItem);
        });
      },
      error: function (error) {
        console.log("Error getting participants:", error);
      },
    });
  }

  // Función para verificar si el usuario ya está unido al evento
  function checkIfJoined() {
    var username = localStorage.getItem("username");
    $.ajax({
      url: "http://127.0.0.1:8000/check-joined/",
      type: "POST",
      data: JSON.stringify({
        username: username,
        event: eventId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      success: function (response) {
        console.log("Check joined response:", response);
        if (response.joined) {
          $("#joinEventBtn").hide();
          $("#cancelEventBtn").show();
        } else {
          $("#joinEventBtn").show();
          $("#cancelEventBtn").hide();
        }
      },
      error: function (error) {
        console.log("Error checking joined:", error);
      },
    });
  }

  // Llamar a la función para cargar participantes y verificar si el usuario está unido cuando se carga la página
  loadParticipants();
  checkIfJoined();

  // Controlador de eventos de clic para el botón "Unirme al evento"
  $("#joinEventBtn").on("click", function (e) {
    e.preventDefault();
    var username = localStorage.getItem("username");
    $.ajax({
      url: "http://127.0.0.1:8000/join-event/",
      type: "POST",
      data: JSON.stringify({
        username: username,
        event: eventId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      success: function (response) {
        console.log("Successfully joined event:", response);
        loadParticipants();
        $("#joinEventBtn").hide();
        $("#cancelEventBtn").show();
        // Aquí puedes agregar redirecciones o acciones adicionales después de unirse
      },
      error: function (error) {
        console.log("Error joining event:", error);
      },
    });
  });

  // Controlador de eventos de clic para el botón "Cancelar"
  $("#cancelEventBtn").on("click", function (e) {
    e.preventDefault();
    var username = localStorage.getItem("username");
    $.ajax({
      url: "http://127.0.0.1:8000/cancel-event/",
      type: "POST",
      data: JSON.stringify({
        username: username,
        event: eventId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      success: function (response) {
        console.log("Successfully canceled event:", response);
        loadParticipants();
        $("#joinEventBtn").show();
        $("#cancelEventBtn").hide();
        // Aquí puedes agregar redirecciones o acciones adicionales después de cancelar
      },
      error: function (error) {
        console.log("Error canceling event:", error);
      },
    });
  });

  // Controlador de eventos de clic para los enlaces de navegación
  $("#landingpage").on("click", function () {
    window.location.href = "landingpage.html";
  });

  $("#create").on("click", function () {
    window.location.href = "Create.html";
  });

  $("#events").on("click", function () {
    window.location.href = "Events.html";
  });

  $("#profile").on("click", function () {
    window.location.href = "Profile.html";
  });

  $('#redirectToLanding').on('click', function() {
    window.location.href = 'landingpage.html';
  });

  $('#redirectToNotify').on('click', function() {
    window.location.href = 'notify.html';
  });


});
