$(document).ready(function() {
    $('#btnEnviar').click(function(e) {
        e.preventDefault();

        var email = $('#email').val();
        var contrasena = $('#contrasena').val();

        $.ajax({
            url: 'http://localhost:8000/api/login/',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                email: email,
                password: contrasena
            }),
            success: function(data) {
                console.log('Token: ' + data.token);
                window.localStorage.setItem('token', data.token);
                alert('Login successful!');
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