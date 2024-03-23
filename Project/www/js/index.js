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


    $('#buttonLogin').on('click', function() {
        window.location.href = 'login.html';
    });

    $('#buttonRegister').on('click', function() {
        window.location.href = 'newUser.html';
    });
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
    
}
