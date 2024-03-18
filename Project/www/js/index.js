/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

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


    /* For having a faster transition */
    $(document).on("mobileinit", function() {
        $.mobile.defaultPageTransition = "none";
        $.mobile.defaultDialogTransition = "none";
    });
    

    //// Events.js

    $(document).on('pagecreate', function(){
        var json_url = "Events.json";
        console.log("Heii");
        // Cargar el JSON externo y mostrar todos los eventos al principio
        $.getJSON(json_url, function(eventos) {
            mostrarEventos(eventos);
        });

        // Función para mostrar todos los eventos
        function mostrarEventos(eventos) {
            var eventsList = $('.events-list');
            eventsList.empty(); // Limpiar la lista antes de agregar los eventos

            // Agregar eventos al DOM
            eventos.forEach(function(evento) {
                var eventHtml = '<div class="event" data-categoria="' + evento.categoria + '">';
                eventHtml += '<img src="' + evento.imagen + '" alt="Imagen del Evento">';
                eventHtml += '<h2>' + evento.titulo + '</h2>';
                eventHtml += '<p>Fecha: ' + evento.fecha + '</p>';
                eventHtml += '<p>Ubicación: ' + evento.ubicacion + '</p>';
                eventHtml += '<a href="' + evento.enlace + '">';
                eventHtml += '<button class="join-btn">Unirse al Evento</button>';
                eventHtml += '</a>';
                eventHtml += '</div>';
                eventsList.append(eventHtml);
            });
        }

        // Mostrar u ocultar eventos según la categoría seleccionada
        $('.waves-effect').click(function() {
            var categoriaSeleccionada = $(this).attr('id');
            $('.event').hide();
            if (categoriaSeleccionada === 'all') {
                $('.event').show();
            } else {
                $('.event[data-categoria="' + categoriaSeleccionada + '"]').show();
            }
        });

        // Mostrar todos los eventos al cargar la página
        $('#all').trigger('click');
    }); 
    
}

