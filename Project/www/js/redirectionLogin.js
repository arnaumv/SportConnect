$(document).ready(function() {
    var username = localStorage.getItem('username');
    console.log('Username:', username);

    if (!username) {
        window.location.href = 'login.html';
        return;
    } else {
        console.log('Username:', username);
    }
});