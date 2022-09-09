window.addEventListener('load', () =>{

    let buttonCreate = document.querySelector('#create');
    let errorsCounter = 0;
    buttonCreate.addEventListener('click', (e) => {

        e.preventDefault();
        let textAreaDescription = document.querySelector('#description');
        let inputName = document.querySelector('#name');
        let inputImage = document.querySelector('#image')


        let textAreaDescriptionContainer = document.querySelector('#descriptionContainer');
        let inputNameContainer = document.querySelector('#inputNameContainer');
        let inputImageContainer = document.querySelector('#inputImageContainer');

        if(textAreaDescription.value.length >= 20 &&
            textAreaDescriptionContainer.innerHTML.includes(
                "La descripción debe tener al menos 20 caractéres")){
            
            let pDanger = document.querySelector('#invalidDescription');
            pDanger.style.display = 'none';
        }

        if( textAreaDescription.value.length < 20 ){
            errorsCounter++;

            if(!textAreaDescriptionContainer.innerHTML.includes("La descripción debe tener al menos 20 caractéres")){

                textAreaDescriptionContainer.innerHTML += "<p class = \"is-danger\" id=\"invalidDescription\">La descripción debe tener al menos 20 caractéres</p>";
            }

            let pDanger = document.querySelector('#invalidDescription');
            pDanger.style.display = 'block';
        }
        
        if(inputName.value !== undefined){
            
            if(inputName.value.length >= 5 && inputNameContainer.innerHTML.includes("el nombre debe tener al menos 5 caractéres")){
                let pDanger = document.querySelector('#invalidName');
                pDanger.style.display = 'none';
            }
            if(inputName.value.length < 5){

                errorsCounter++;

                if(!inputNameContainer.innerHTML.includes("el nombre debe tener al menos 5 caractéres")){

                    inputNameContainer.innerHTML += "<p class = \"is-danger\" id=\"invalidName\">el nombre debe tener al menos 5 caractéres</p>";
                }
                let pDanger = document.querySelector('#invalidName');
                pDanger.style.display = 'block';

            }
        }else{

            errorsCounter++;

            if(!inputNameContainer.innerHTML.includes("debes escribir un nombre")){ 

                inputNameContainer.innerHTML += "<p class = \"is-danger\" id=\"invalidName\">debes escribir un nombre</p>";
            }

            let pDanger = document.querySelector('#invalidName');
            pDanger.style.display = 'block';
        }

        if((inputImage.value.includes('.jpg') || inputImage.value.includes('.jpeg') || 
        inputImage.value.includes('.png') || inputImage.value.includes('.gif')) && 
        inputImageContainer.innerHTML.includes(
            "Los formatos permitidos son JPG, JPEG, PNG y GIF")){

            let pDanger = document.querySelector('#invalidImage');
            pDanger.style.display ='none';
        }

        if(inputImage.value !== ''){

            if(!(inputImage.value.includes('.jpg') || inputImage.value.includes('.jpeg') || inputImage.value.includes('.png') || inputImage.value.includes('.gif'))){

                errorsCounter++;

                if(!inputImageContainer.innerHTML.includes("Los formatos permitidos son JPG, JPEG, PNG y GIF")){

                    inputImageContainer.innerHTML += "<p class = \"is-danger\" id = \"invalidImage\">Los formatos permitidos son JPG, JPEG, PNG y GIF</p>";
                }

                let pDanger = document.querySelector('#invalidImage');
                pDanger.style.display ='block';
            }
        }
        if(errorsCounter > 0){
            errorsCounter = 0;
            e.preventDefault();
        }
    });
});