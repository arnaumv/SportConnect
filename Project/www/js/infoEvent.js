$(document).ready(function () {


  $('#redirectToLandingpage').on('click', function() {
    window.location.href = 'Events.html';
  });
  // Obtener el ID del evento del localStorage
  var eventId = localStorage.getItem("selectedEventId");
  // Hacer una solicitud AJAX para obtener la información del evento
  var eventTitle, eventSport, eventLocation, eventDate, eventTime;

  $.ajax({
    url: 'https://sportconnect.ieti.site/event-filter/' + eventId + '/get_event',  // URL de tu API
    type: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    beforeSend: function () {
      console.log('Sending AJAX request');
    },
    success: function (evento) {
      console.log('AJAX request succeeded');
      // Convertir la fecha a formato 'dd-mm-yyyy'
      var date = new Date(evento.date);
      var formattedDate = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
      
      // Extraer y formatear la hora del evento
      var time = evento.time;
      var formattedTime = time.slice(0, 5);  // Formatear la hora a 'HH:MM'
      
      eventTitle = evento.title;
      eventSport = evento.sport;
      eventLocation = evento.location; // Asegúrate de que 'location' es el nombre correcto del campo
      eventDate = evento.date;
      eventTime = evento.time; // Asegúrate de que 'time' es el nombre correcto del campo

      // Actualizar el HTML de la página con la información del evento
      $('.evento img').attr('src', evento.image_path);
      $('.evento h2').text(evento.title);
      $('.evento p').first().text('Fecha: ' + formattedDate + ' Hora: ' + formattedTime+'H' );  
      $('.evento p').eq(1).text('Actividad: ' + evento.sport); // Usamos eq(1) para seleccionar el segundo párrafo
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
    error: function (error) {
      console.log('Error getting event:', error);
    }
  });

  // Función para cargar la lista de participantes
  function loadParticipants() {
    // Obtener el nombre de usuario almacenado
    var storedUsername = localStorage.getItem("username");

    // Verificar si se ha almacenado un nombre de usuario
    if (!storedUsername) {
      console.error("No se ha encontrado el nombre de usuario en localStorage");
      return;
    }

    $.ajax({
      url: "https://sportconnect.ieti.site/event/" + eventId + "/participants",
      type: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Enviar el nombre de usuario como parámetro en la URL
      data: {
        username: storedUsername,
      },
      success: function (participants) {
        console.log("Successfully got participants:", participants);

        // Limpiar la lista de participantes
        $(".participantes ul").empty();

        // Agregar cada participante a la lista
        participants.forEach(function (participant) {
          var listItem = $("<li></li>").addClass("infoUser");
          var img = $("<img>").addClass("participant-image");

          // Fetch the profile image for the participant from the server
          fetch('https://sportconnect.ieti.site/profile/' + participant.username + '/')
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              var imageUrl;
              if (data.image_path != null) {
                imageUrl = 'https://sportconnect.ieti.site/' + data.image_path;
              } else {
                imageUrl = './img/Profile/User_photo.png'; // Ruta a la imagen predeterminada
              }
              img.attr('src', imageUrl);

              // Agregar la imagen al elemento de lista del participante
              var infoDiv = $("<div></div>").addClass("info-participante");
              var nameP = $('<p data-user-id="' + participant.username + '"></p>').text(participant.username);

              var joinDate = new Date(participant.join_date);
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
            })
            .catch(error => {
              console.error('Error getting profile data for', participant.username + ':', error);
            });
        });
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error getting participants:", textStatus, errorThrown);
      },
    });
  }



  // Función para verificar si el usuario ya está unido al evento
  function checkIfJoined() {
    var username = localStorage.getItem("username");
    $.ajax({
      url: "https://sportconnect.ieti.site/check-joined/",
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
  // JavaScript
  $("#joinEventBtn").on("click", function (e) {
    e.preventDefault();
    var username = localStorage.getItem("username");
    $.ajax({
      url: "https://sportconnect.ieti.site/join-event/",
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

        // Convertir eventDate a un objeto Date de JavaScript
        var eventDateObj = new Date(eventDate);

        // Convertir el objeto Date a una cadena de texto en el formato ISO 8601
        var eventDateISO = eventDateObj.toISOString();

        // Nueva llamada AJAX para crear una notificación
        $.ajax({
          url: "https://sportconnect.ieti.site/notification/",
          type: "POST",
          data: JSON.stringify({
            type: 'join',
            username: username,
            recipient_username: 'default_username',
            event_title: eventTitle,
            event_sport: eventSport,
            event_location: eventLocation,
            event_date: eventDateISO, // Usar eventDateISO en el formato ISO 8601
            event_time: eventTime,
            message: 'Te has unido a un evento de "' + eventSport + '".\nUbicación: ' + eventLocation + '.\nFecha y Hora: ' + eventDateISO + ' ' + eventTime,

          }),
          headers: {
            "Content-Type": "application/json",
          },
          success: function (response) {
            console.log("Successfully created notification:", response);
          },
          error: function (error) {
            console.log("Error creating notification:", error);
          },
        });

        // Aquí puedes agregar redirecciones o acciones adicionales después de unirse
      },
      error: function (error) {
        console.log("Error joining event:", error);
      },
    });
  });

  $(document).on('click', '.infoUser', function() {
    var userId = $(this).find('p[data-user-id]').data('user-id');
    // Guardar el ID del usuario en el localStorage
    console.log("userclick: " + userId);
    localStorage.setItem('selecteduserId', userId);
    // Redirigir al usuario a la página de perfil del usuario
    window.location.href = 'userProfile.html';
});



  // Controlador de eventos de clic para el botón "Cancelar"
  $("#cancelEventBtn").on("click", function (e) {
    e.preventDefault();
    var username = localStorage.getItem("username");
    $.ajax({
      url: "https://sportconnect.ieti.site/cancel-event/",
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

  $('#redirectToLanding').on('click', function () {
    window.location.href = 'landingpage.html';
  });

  $('#redirectToNotify').on('click', function () {
    window.location.href = 'notify.html';
  });

  $('#redirectToChat').on('click', function () {
    window.location.href = 'Chat.html';
  });

});
