// Validación de contraseña iguales
function validate(){

    var pass = document.getElementById('contrasena1').value
    var pass2 = document.getElementById('contrasena2').value
    
    if(pass!=pass2){
        alert("Las contraseñas no coinciden. Inténtalo de nuevo.");
        return false;
    }
}

// Script para submenu

function submenu() {
    document.getElementById("myDropdown").classList.toggle("show");
}


window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
}