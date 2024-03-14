$(document).ready(function() {
    $('#btnEnviar').click(function(e) {
        e.preventDefault();

        var name = $('#name').val();
        var contrasena = $('#contrasena').val();

        $.ajax({
            url: 'http://localhost:8000/api/login/',  // URL de tu endpoint de autenticación
            method: 'POST',
            contentType: 'application/json',  // Asegúrate de que estás enviando los datos como JSON
            data: JSON.stringify({  // Convierte tus datos a JSON
                name: name,
                password: contrasena
            }),
            success: function(data) {
                console.log('Token: ' + data.token);
                window.localStorage.setItem('token', data.token);
                alert('Login successful!');  // Muestra un alerta cuando el inicio de sesión es exitoso
                window.location.href = '/Index.html';
            },
            error: function(xhr, status, error) {
                console.log('Error: ' + error);
                console.log('Status: ' + status);
                console.log(xhr);
                alert('Error: ' + error + '. ' + 'Status: ' + status);
            }
        });
    });
});