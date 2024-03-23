$(document).ready(function(){
    // Map initialization script
    var json_url = "ubicacion.json";
                    
    var map = L.map('mapa').setView([41.357805, 2.0379357], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);
    fetch(json_url)
        .then(response => response.json())
        .then(data => {
            if (data.locations && data.locations.length > 0) {
                data.locations.forEach(ubicacion => {
                    var marker = L.marker([ubicacion.ubicacion.latitude, ubicacion.ubicacion.longitude]).addTo(map);
                    var actividades = ubicacion.actividad.join(', '); // Join the activities into a single string separated by commas
                    marker.bindPopup('<b>' + ubicacion["nombre de ubicacion"] + '</b><br><b>Actividad:</b> ' + actividades);
                });
            }
    });
});



