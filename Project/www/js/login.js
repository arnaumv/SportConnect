$(document).ready(function() {
    $('#btnEnviar').click(function(e) {
        e.preventDefault();

        var email = $('#email').val();
        var contrasena = $('#contrasena').val();

        $.ajax({
            url: 'http://localhost:8000/login/',
            method: 'POST',
            data: JSON.stringify({
                email: email,
                contrasena: contrasena
            }),
            contentType: 'application/json',
            success: function(data) {
                console.log('Response data:', data);
                console.log('Login successful:', data);
                localStorage.setItem('token', data.token);
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    });
});