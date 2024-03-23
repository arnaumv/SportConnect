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
});

