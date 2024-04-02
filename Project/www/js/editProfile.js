$(document).ready(function() {
    console.log("Barraeditperfil")
    //Movilidad entre paginas
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