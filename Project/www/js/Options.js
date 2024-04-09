$(document).ready(function() {
    console.log("Options")
    //Movilidad entre paginas
    
    $('#deleteX').on('click', function() {
        window.location.href = 'Profile.html';
    });

    $('#Edit_Profile').on('click', function() {
        window.location.href = 'EditProfile.html';
    });

    $('#a_terms').on('click', function() {
        window.location.href = 'Terms.html';
    });

    $('#a_privacy').on('click', function() {
        window.location.href = 'Privacy.html';
    });

    document.getElementById("a_logout").addEventListener("click", function(event) {
        event.preventDefault();
        
        localStorage.removeItem("username");
        localStorage.clear();
        
        window.location.href = "Index.html";
    });

});

