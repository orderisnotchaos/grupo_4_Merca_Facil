
window.addEventListener('load', function(){

    let submitButton = document.querySelector('#registrarse');

    let errorsCounter = 0;

    submitButton.addEventListener('click',function(evt){

        let inputNombre = document.querySelector('#inputNombre');
        let inputApellido = document.querySelector('#inputApellido');
        let inputEmail = document.querySelector('#email');
        let inputContraseña = document.querySelector('#password');    
        let inputImage = document.querySelector('#image');
        
        let inputNombreContainer = document.querySelector('#inputNombreContainer');
        let inputApellidoContainer = document.querySelector('#inputApellidoContainer');
        let inputEmailContainer = document.querySelector('#inputEmailContainer');
        let inputPasswordContainer = document.querySelector('#inputPasswordContainer');
        let inputImageContainer = document.querySelector('#inputImageContainer');

        if(
            isInputNotNull(
                inputNombre, inputApellido,
                inputContraseña, inputEmail, inputImage
        )){

            if(inputNombre.value.length > 2 &&
                 inputNombreContainer.innerHTML.includes('el nombre debe tener más de dos carácteres')){

                let pDanger = document.querySelector('#invalidName');
                pDanger.style.display = 'none';
            }
            if(inputNombre.value.length  < 2){

                errorsCounter++;
                if(!inputNombreContainer.innerHTML.includes('el nombre debe tener más de dos carácteres')){
                    inputNombreContainer.innerHTML += "<p class=\"text-danger\" id = \"invalidName\"> el nombre debe tener más de dos carácteres</p>";
                }
                let pDanger = document.querySelector('#invalidName');
                pDanger.style.display = 'block';

            }

            if(inputApellido.value.length > 2 && 
                inputApellidoContainer.innerHTML.includes('el apellido debe tener más de dos carácteres')){
                let pDanger = document.querySelector('#invalidSurname');
                pDanger.style.display = 'none'
            }

            if(inputApellido.value.length < 2){

                errorsCounter++;
                if(!inputApellidoContainer.innerHTML.includes('el apellido debe tener más de dos carácteres')){
                    inputApellidoContainer.innerHTML += "<p class=\"text-danger\" id = \"invalidSurname\"> el apellido debe tener más de dos carácteres</p>";                
                }

                let pDanger = document.querySelector('#invalidSurname');
                pDanger.style.display = 'block';
            }

            let validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            
            if(!inputEmail.value.match(validEmailRegex) &&
             inputEmailContainer.innerHTML.includes('el mail debe ser válido')){

                let pDanger =document.querySelector('#invalidMail');
                pDanger.style.display = 'none';
            }
            if(!inputEmail.value.match(validEmailRegex) ){

                errorsCounter++;
                if(!inputEmailContainer.innerHTML.includes('el mail debe ser válido')){
                    inputEmailContainer.innerHTML += "<p class=\"text-danger\" id = \"invalidMail\"> el mail debe ser válido</p>";                
                }

                let pDanger = document.querySelector('#invalidMail');
                pDanger.style.display = 'block';
            }

            if(inputContraseña.value.length > 8 &&
                inputPasswordContainer.innerHTML.includes('la password debe tener más de 8 caractéres')){

                    let pDanger = document.querySelector('#invalidPassword');
                    pDanger.stlye.display = 'none';
                }

            if(inputContraseña.value.length < 8){

                errorsCounter++;
                if(!inputPasswordContainer.innerHTML.includes('la password debe tener más de 8 caractéres')){
                    inputPasswordContainer.innerHTML += "<p class=\"text-danger\" id = \"invalidPassword\"> la password debe tener más de 8 caractéres</p>";                
                }

                let pDanger = document.querySelector('#invalidPassword');
                pDanger.style.display = 'block';
            }

            if(isValidImgFormat(inputImage.value) && 
            inputImageContainer.innerHTML.includes('extensiones permitidas : JPG, JPEG, PNG, GIF')){

                let pDanger = document.querySelector('#invalidFormat')
                pDanger.style.display = 'none';
            }
            if(!isValidImgFormat(inputImage.value)){

                errorsCounter++;
                if(!inputImageContainer.innerHTML.includes('extensiones permitidas : JPG, JPEG, PNG, GIF')){
                    inputImageContainer.innerHTML += "<p class=\"text-danger\" id = \"invalidFormat\"> extensiones permitidas : JPG, JPEG, PNG, GIF</p>";
                }

                let pDanger = document.querySelector('#invalidFormat');
                pDanger.style.display = 'block';
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