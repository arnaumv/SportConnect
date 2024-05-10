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
            // $('#city').text(data.city);
            $('#city').text("Ciudad: " + data.city);

            $('#followers-count').text(data.followers_count );  // Mostrar el conteo de seguidores en el HTML
            $('#following-count').text(data.following_count );  // Mostrar el conteo de seguidos en el HTML
            $('#events-count').text(data.events_count );  // Mostrar el conteo de eventos en el HTML


            if (data.instagram != null) {
                // Establecer el atributo src de la imagen de Instagram
                $('#img-instagram').attr('src', './img/Profile/insta.webp');
                // Envolver la imagen en un enlace
                $('#img-instagram').wrap('<a href="https://www.instagram.com/' + data.instagram + '" target="_blank"></a>');
            }
            
            if (data.twitter != null) {
                // Establecer el atributo src de la imagen de Twitter
                $('#img-twitter').attr('src', './img/Profile/twitter.webp');
                // Envolver la imagen en un enlace
                $('#img-twitter').wrap('<a href="https://twitter.com/' + data.twitter + '" target="_blank"></a>');
            }
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