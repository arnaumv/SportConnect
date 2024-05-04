$(document).ready(function () {

    //Movilidad entre paginas
    $('#landingpage').on('click', function () {
        window.location.href = 'landingpage.html';
    });

    $('#create').on('click', function () {
        window.location.href = 'Create.html';
    });

    $('#events').on('click', function () {
        window.location.href = 'Events.html';
    });

    $('#profile').on('click', function () {
        window.location.href = 'Profile.html';
    });

    $('#redirectToNotify').on('click', function () {
        window.location.href = 'notify.html';
    });

    $('.redirectToEvents').on('click', function () {
        window.location.href = 'Events.html';
    });



    // Map initialization script
    var json_url = "ubicacion.json";

    var map = L.map('mapa').setView([41.355464, 2.070481], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

    // Añadir el control de pantalla completa
    var fullscreenControl = L.control.fullscreen({
        position: 'bottomright',
        title: 'Ver en pantalla completa',
        titleCancel: 'Salir de pantalla completa',
        forceSeparateButton: true
    }).addTo(map);


    fetch(json_url)
        .then(response => response.json())
        .then(data => {
            if (data.locations && data.locations.length > 0) {
                data.locations.forEach(ubicacion => {
                    var marker = L.marker([ubicacion.ubicacion.latitude, ubicacion.ubicacion.longitude]).addTo(map);
                    var actividades = ubicacion.actividad.join(', '); // Join the activities into a single string separated by commas
                    var imagen = ubicacion.imagen ? '<img src="' + ubicacion.imagen + '" alt="Imagen de ubicación"  width="170" height="100">' : ''; // Add image if it exists, with width and height
                    marker.bindPopup('<b>' + ubicacion["nombre de ubicacion"] + '</b><br><b>Actividad:</b> ' + actividades + '<br>' + imagen);
                });
            }
        });


});



