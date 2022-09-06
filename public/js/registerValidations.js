window.addEventListener('load', function(){
    let registerForm = document.querySelector('form.form-registro');
    let submitButton = document.querySelector('#registrarse');
    let inputNombre = document.querySelector('#inputNombre');
    let inputApellido = document.querySelector('#inputApellido');
    let selectDocumento = document.querySelector('#documento');
    let inputNumeroDocumento = document.querySelector('#numeroDocumento');
    let inputTelefono = document.querySelector('#telefono');
    let inputEmail = document.querySelector('#email');
    let inputContraseña = document.querySelector('#password');    
    let inputImagen = document.querySelector('#image');
    
    submitButton.addEventListener('click',function(evt){
        
        evt.preventDefault();
 
        if(
            isInputNotNull(
                inputNombre, inputApellido, selectDocumento,
                inputContraseña, inputEmail, inputImagen,
                inputNumeroDocumento 
        )){

            if(inputNombre.value.length  < 2){

                let inputNombreContainer = document.querySelector('#inputNombreContainer');
                inputNombreContainer.innerHTML += "<p class=\"text-danger\"> el nombre debe tener más de dos carácteres</p>";
            }

            if(inputApellido.value.length < 2){

                let inputApellidoContainer = document.querySelector('#inputApellidoContainer');
                inputApellidoContainer.innerHTML += "<p class=\"text-danger\"> el apellido debe tener más de dos carácteres</p>";                
            }

            let validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            
            if(inputEmail.value.match(validEmailRegex) ){

                let inputEmailContainer = document.querySelector('#inputEmailContainer');
                inputEmailContainer.innerHTML += "<p class=\"text-danger\"> el mail debe ser válido</p>";                
            }
        }
    })
});

function isInputNotNull(inputNombre, inputApellido, selectDocumento, inputContraseña, inputEmail, inputImagen, inputNumeroDocumento ){

    if(inputNombre == null || inputApellido == null || selectDocumento ==null || inputContraseña == null || inputEmail == null || inputImagen == null || inputNumeroDocumento == null){
 
        return false;
    }

    return true;
}