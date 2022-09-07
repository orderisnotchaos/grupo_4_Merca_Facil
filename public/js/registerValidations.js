
window.addEventListener('load', function(){
    let registerForm = document.querySelector('form.form-registro');
    let submitButton = document.querySelector('#registrarse');
    let inputNombre = document.querySelector('#inputNombre');
    let inputApellido = document.querySelector('#inputApellido');

    let inputTelefono = document.querySelector('#phone');
    let inputEmail = document.querySelector('#email');
    let inputContraseña = document.querySelector('#password');    
    let inputImagen = document.querySelector('#image');
    let errorsCounter = 0;
    submitButton.addEventListener('click',function(evt){
        

        if(
            isInputNotNull(
                inputNombre, inputApellido,
                inputContraseña, inputEmail, inputImagen
        )){

            if(inputNombre.value.length  < 2){

                errorsCounter++;
                let inputNombreContainer = document.querySelector('#inputNombreContainer');
                inputNombreContainer.innerHTML += "<p class=\"text-danger\"> el nombre debe tener más de dos carácteres</p>";
            }

            if(inputApellido.value.length < 2){

                errorsCounter++;
                let inputApellidoContainer = document.querySelector('#inputApellidoContainer');
                inputApellidoContainer.innerHTML += "<p class=\"text-danger\"> el apellido debe tener más de dos carácteres</p>";                
            }

            let validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            
            if(!inputEmail.value.match(validEmailRegex) ){

                errorsCounter++;
                let inputEmailContainer = document.querySelector('#inputEmailContainer');
                inputEmailContainer.innerHTML += "<p class=\"text-danger\"> el mail debe ser válido</p>";                
            }

            if(inputContraseña.value.length < 8){

                errorsCounter++;
                let inputPasswordContainer = document.querySelector('#inputPasswordContainer');
                inputPasswordContainer.innerHTML += "<p class=\"text-danger\"> la password debe tener más de 8 caractéres</p>";                
            }

            if(!isValidImgFormat(inputImagen.value)){

                errorsCounter++;
                let inputImageContainer = document.querySelector('#inputImageContainer');
                inputImageContainer.innerHTML += "<p class=\"text-danger\"> extensiones permitidas : JPG, JPEG, PNG, GIF</p>";
            }
        }

        if(errorsCounter > 0){
            
            evt.preventDefault();
            errorsCounter = 0;
        }
    })
});


function isValidImgFormat(string){
    var isJpgOrJpeg = /\.jpe?g$/i.test(string);
    var isPng = /\.png$/i.test(string);
    var isGif = /\.gif$/i.test(string);

    if (isJpgOrJpeg || isPng || isGif){
        return true;
    }

    return false;

}
function isInputNotNull(inputNombre, inputApellido, inputContraseña, inputEmail, inputImagen ){

    if(inputNombre == null || inputApellido == null || inputContraseña == null || inputEmail == null || inputImagen == null){
 
        return false;
    }

    return true;
}