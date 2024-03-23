console.log('updateProfile.js loaded');
$(document).on('pagecreate', function() {
    
    var storedUsername = localStorage.getItem('username');
    var storedCity = localStorage.getItem('city');

    // Si los valores almacenados existen, úsalos para actualizar el DOM
    if (storedUsername && storedCity) {
        $('#username').text(storedUsername);
        $('#city').text(storedCity);
    } else {
        // Si no hay datos almacenados, haz la solicitud a la API
        fetch('http://127.0.0.1:8000/profile/' + storedUsername + '/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data:', data);  // Imprimir los datos en la consola

                // Almacena los valores de 'username' y 'city' en el almacenamiento local
                localStorage.setItem('username', data.username);
                localStorage.setItem('city', data.city);

                // Actualiza el DOM
                $('#username').text(data.username);
                $('#city').text(data.city);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});