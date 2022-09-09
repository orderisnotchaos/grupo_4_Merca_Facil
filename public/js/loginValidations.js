window.addEventListener('load', (e) =>{

    let submitButton = document.querySelector('#submit');
    let inputEmail = document.querySelector('#email');
    let inputPassword = document.querySelector('#password');
    let errorsCounter = 0;
    let validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            
    submitButton.addEventListener('click',(e) => {

        let inputEmailContainer = document.querySelector('#inputEmailContainer');
        let inputPasswordContainer = document.querySelector('#inputPasswordContainer');
        if(!inputEmail.value.match(validEmailRegex) ){

            errorsCounter++;
            if(!inputEmailContainer.innerHTML.includes('el mail debe ser válido')){

                inputEmailContainer.innerHTML += "<p class=\"text-danger\" id = \" invalidMail\"> el mail debe ser válido</p>";                
            }
        }
        if(inputPassword.value.lengt > 0 && 
            inputPasswordContainer.innerHTML.includes("debes ingresar una contraseña")){

                let pDanger = document.querySelector('#invalidPassword');
                pDanger.value.display = 'none';
        }
        if(inputPassword.value.length === 0){
    
            errorsCounter++;
            if(!inputPasswordContainer.innerHTML.includes("debes ingresar una contraseña")){

                inputPasswordContainer.innerHTML += "<p class=\"text-danger\" id = \"invalidPassword\"> debes ingresar una contraseña </p>";
            }
            let pDanger = document.querySelector('#invalidPassword');
            pDanger.value.display = 'block';
        }
    
        if( errorsCounter > 0 ){
    
            e.preventDefault();
            errorsCounter = 0;
        }
    });
});