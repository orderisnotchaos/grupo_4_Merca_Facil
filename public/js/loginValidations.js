window.addEventListener('load', (e) =>{

    let submitButton = document.querySelector('#submit');
    let inputEmail = document.querySelector('#email');
    let inputPassword = document.querySelector('#password');
    let errorsCounter = 0;
    let validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            
    submitButton.addEventListener('click',(e) => {
        if(!inputEmail.value.match(validEmailRegex) ){

            errorsCounter++;
            let inputEmailContainer = document.querySelector('#inputEmailContainer');
            inputEmailContainer.innerHTML += "<p class=\"text-danger\"> el mail debe ser válido</p>";                
        }
    
        if(inputPassword.value.length === 0){
    
            errorsCounter++;
            let inputPasswordContainer = document.querySelector('#inputPasswordContainer');
            inputPasswordContainer.innerHTML += "<p class=\"text-danger\"> debes ingresar una contraseña </p>";
        }
    
        if( errorsCounter > 0 ){
    
            e.preventDefault();
            errorsCounter = 0;
        }
    });
});