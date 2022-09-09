window.addEventListener('load', (e) =>{

    let submitButton = document.querySelector('#submit');

  
    let errorsCounter = 0;
    let validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            
    submitButton.addEventListener('click',(e) => {

        let inputPassword = document.querySelector('#password');
        let inputEmail = document.querySelector('#email');
        let inputEmailContainer = document.querySelector('#inputEmailContainer');
        let inputPasswordContainer = document.querySelector('#inputPasswordContainer');

        if( inputEmail.value.match(validEmailRegex) && 
            inputEmailContainer.innerHTML.includes('el mail debe ser válido')){

                let pDanger = document.querySelector('#invalidMail');
                pDanger.style.display = 'none';
        }
        if(!inputEmail.value.match(validEmailRegex) ){

            errorsCounter++;
            if(!inputEmailContainer.innerHTML.includes('el mail debe ser válido')){

                inputEmailContainer.innerHTML += "<p class=\"text-danger\" id = \"invalidMail\"> el mail debe ser válido</p>";                
            }
        }
        if(inputPassword.value.length > 0 && 
            inputPasswordContainer.innerHTML.includes("debes ingresar una contraseña")){

                let pDanger = document.querySelector('#invalidPassword');
                pDanger.style.display = 'none';
        }
        if(inputPassword.value.length === 0){
            console.log(inputPasswordContainer.innerHTML);
            errorsCounter++;
            if(!inputPasswordContainer.innerHTML.includes("debes ingresar una contraseña")){

                inputPasswordContainer.innerHTML += "<p class=\"text-danger\" id = \"invalidPassword\"> debes ingresar una contraseña </p>";
            }
            let pDanger = document.querySelector('#invalidPassword');
            pDanger.style.display = 'block';
        }
    
        if( errorsCounter > 0 ){

            errorsCounter = 0;
            e.preventDefault();
        }
    });
});