$(document).ready(function() {
let slideIndex = 0;
            showSlides();
            
            function showSlides() {
              let i;
              let slides = document.getElementsByClassName("mySlides");
              let dots = document.getElementsByClassName("dot");
              for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";  
              }
              slideIndex++;
              if (slideIndex > slides.length) {slideIndex = 1}    
              for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
              }
              slides[slideIndex-1].style.display = "block";  
              dots[slideIndex-1].className += " active";
              setTimeout(showSlides, 5000); // Change image every 2 seconds
            }
          });

// Validación de contraseña iguales
/*function validate(){

    var pass = document.getElementById('contrasena1').value
    var pass2 = document.getElementById('contrasena2').value
    
    if(pass!=pass2){
        alert("Las contraseñas no coinciden. Inténtalo de nuevo.");
        return false;
    }
}

*/