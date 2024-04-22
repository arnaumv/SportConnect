console.log('updateProfile.js loaded');
$(document).on('pagecreate', function () {

    var storedUsername = localStorage.getItem('username');
    // Si no hay datos almacenados, haz la solicitud a la API
    fetch('https://sportconnect.ieti.site/profile/' + storedUsername + '/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data:', data);  // Imprimir los datos en la consola

            localStorage.setItem('username', data.username);
            $('#username').text(data.username);
            $('#city').text(data.city);
            if (data.description != null) {
                console.log("no es null");
                $('#miniDescription').text(data.description);
            }
            var imageUrl;
            if (data.image_path != null) {
                imageUrl = 'https://sportconnect.ieti.site' + data.image_path;
            } else {
                imageUrl = 'https://sportconnect.ieti.site/Media/profile_photos/User_photo.png'; // Ruta a la imagen predeterminada
            }
            $('#profile-image').attr('src', imageUrl);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});