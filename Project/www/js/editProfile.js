$(document).ready(function() {
    console.log("Barraeditperfil")
    //Movilidad entre paginas
    $('#flecha-izquierda').on('click', function() {
        window.location.href = 'Profile.html';
        });

    $('#landingpage').on('click', function() {
        window.location.href = 'landingpage.html';
        console.log("okkedit")
    
    });
    
    $('#create').on('click', function() {
        window.location.href = 'Create.html';
    });
    
    $('#events').on('click', function() {
        window.location.href = 'Events.html';
    });
    
    $('#profile').on('click', function() {
        window.location.href = 'Profile.html';
    });


    var storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        $('#username').text(storedUsername);

        // Fetch the current user's profile image from the server
        fetch('http://127.0.0.1:8000/profile/' + storedUsername + '/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data:', data);  // Imprimir los datos en la consola

                var imageUrl;
                if (data.image_path != null) {
                    imageUrl = 'http://127.0.0.1:8000' + data.image_path;
                } else {
                    imageUrl = 'http://127.0.0.1:8000/Media/profile_photos/User_photo.png'; // Ruta a la imagen predeterminada
                }
                $('#profile-image').attr('src', imageUrl);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    $('#email').on('focusout', function() {
        var email = $(this).val().trim();
        if (email === "") {
            $('#error_email').text('');
            $(this).removeClass('error-input');
        } else if (!isValidEmail(email)) {
            $('#error_email').text('El correo electrónico no es válido');
            $(this).addClass('error-input'); // Agregar clase de error al input
        } else {
            $('#error_email').text('');
            $(this).removeClass('error-input'); // Eliminar clase de error del input
        }
    });
    

    $('#password').on('focusout', function() {
        var password = $(this).val().trim();
        if(password === "") {
            // La contraseña está vacía
            $('#error_password').text('');
            $(this).removeClass('error-input');
        } else if (password.length < 8 || password.length > 128) {
            $('#error_password').text('La contraseña debe tener entre 8 y 128 caracteres');
            $(this).addClass('error-input'); // Agregar clase de error al input
        } else {
            $('#error_password').text('');
            $(this).removeClass('error-input'); // Eliminar clase de error del input
        }
    });

    $('#description').on('focusout', function() {
        var description = $(this).val().trim();
        if (description === "" || description.length >= 10) {
            $('#error_description').text('');
            $(this).removeClass('error-input');
        } else {
            $('#error_description').text('La descripción debe tener al menos 10 caracteres');
            $(this).addClass('error-input');
        }
    });
    
    

    $('#birthdate').on('focusout', function() {
        var birthdate = $(this).val().trim();
        console.log(birthdate);
        if (birthdate === "") {
            $('#error_birthdate').text('');
            $(this).removeClass('error-input');
        } else if (!isValidDate(birthdate)) {
            $('#error_birthdate').text('La fecha de nacimiento no es válida');
            $(this).addClass('error-input'); // Agregar clase de error al input
        } else {
            $('#error_birthdate').text('');
            $(this).removeClass('error-input'); // Eliminar clase de error del input
        }
    });
    
    $('#btnSave').on('click', function() {
        var hasErrors = false;
    
        if ($('#error_email').text() !== '' || $('#error_password').text() !== '' || $('#error_description').text() !== '' || $('#error_birthdate').text() !== '') {
            hasErrors = true;
        }
    
        // Si no hay errores, enviar los datos
        if(!hasErrors){
            console.log("Comprobacion perfecta...");
            var storedUsername = localStorage.getItem('username');
            var email = $('#email').val();
            var password = $('#password').val();
            var description = $('#description').val();
            var birthdate = $('#birthdate').val();
        
            // Subir la imagen
            var file = $('#profile-image-upload')[0].files[0];
            var formData = new FormData();
            formData.append('image', file);
            formData.append('username', storedUsername);  // Añade el username al formData
            formData.append('email', email);
            formData.append('password', password);
            formData.append('description', description);
            formData.append('birthdate', birthdate);
        
            // Actualizar los datos del usuario
            $.ajax({
                type: 'POST',
                url: 'http://127.0.0.1:8000/update-user/' + storedUsername + '/',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    // Manejar la respuesta de éxito
                    showPopup2(response.message);
                    // Actualizar la imagen de perfil en la página
                    $('#profile-image').attr('src', response.image_url);
                    setTimeout(function() {
                        window.location.href = 'Profile.html';
                    }, 2200);
                },
                error: function(xhr, status, error) {
                    // Manejar errores
                    showPopup(error);
                }
            });    
        } else {
            console.log('Comprobacion Fallida...');
        }

    });
});

// Función para validar el formato del correo electrónico
function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para validar la fecha de nacimiento
function isValidDate(dateString) {
    var today = new Date();
    var birthdate = new Date(dateString);
    return birthdate < today;
}

function showPopup(message) {
    $('#popup-message').text(message);
    $('#popup').slideDown('slow').delay(5000).slideUp('slow'); // Transición más lenta
}

function showPopup2(message) {
    $('#popup-message2').text(message);
    $('#popup2').slideDown('slow').delay(2000).slideUp('slow'); // Transición más lenta
}