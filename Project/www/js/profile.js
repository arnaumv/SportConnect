$(document).ready(function() {
    // Obtener el nombre de usuario del almacenamiento local
    var username = localStorage.getItem('username');

    // Imprimir el nombre de usuario en la consola
    console.log('Username:', username);

    // Si el nombre de usuario no existe, redirigir al usuario a la página de inicio de sesión
    if (!username) {
        console.error('Error: No se pudo cargar el nombre de usuario');
        window.location.href = 'login.html';
        return;
    } else {
        console.log('El nombre de usuario se cargó correctamente');
    }

    // Hacer una solicitud a la API para obtener los detalles del usuario
    $.ajax({
        url: 'http://127.0.0.1:8000/profile/' + username + '/',
        method: 'GET',
        success: function(data) {
            // Mostrar los detalles del usuario en la página
            $('#username').text(data.username);
            $('#city').text(data.city); // Asegúrate de que 'city' es el nombre correcto del campo en tu API
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error:', errorThrown);
            console.log('Status:', textStatus);
            console.log('jqXHR:', jqXHR);
            if (jqXHR.responseJSON && jqXHR.responseJSON.error) {
                console.log('Server error message:', jqXHR.responseJSON.error);
            }
        }
    });
});