document.querySelector('#btnSubmit').addEventListener('click', function() {
    console.log("El botón ha sido presionado");

    // Restablecer los mensajes de error
    document.querySelectorAll('.error').forEach(el => el.textContent = '');

    // Obtener los valores de los campos del formulario
    var username = document.querySelector('#username').value.trim();
    var password = document.querySelector('#password').value.trim();
    console.log(username, password);

    // Variable para verificar si hay errores
    var hasErrors = false;

    // Validación del nombre de usuario
    if(username === ''){
        document.querySelector('#error_username').textContent = 'Por favor, introduce tu nombre de usuario';
        hasErrors = true;
    }

    // Validación de la longitud de la contraseña
    if(password.length < 8 || password.length > 128){
        document.querySelector('#error_password').textContent = 'La contraseña debe tener entre 8 y 128 caracteres';
        hasErrors = true;
    }

    // Si no hay errores, enviar los datos
    if(!hasErrors){
        fetch('http://127.0.0.1:8000/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Login successful:', data);
            // Guarda los tokens y el nombre de usuario en el almacenamiento local del navegador
            localStorage.setItem('refreshToken', data.refresh);
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('username', username);
            // Redirige al usuario a index.html
            window.location.href = 'profile.html';
        })
        .catch(error => {
            console.log('Error:', error);
        });
    } else {
        console.log('Hubo un error al iniciar sesión');
    }
});