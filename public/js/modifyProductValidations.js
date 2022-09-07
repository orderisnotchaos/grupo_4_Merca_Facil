window.addEventListener('load', () =>{

    let buttonCreate = document.querySelector('#create');
    let textAreaDescription = document.querySelector('#description');
    let inputName = document.querySelector('#name');
    let inputImage = document.querySelector('#image')
    let errorsCounter = 0;
    buttonCreate.addEventListener('click', (e) => {

            if( textAreaDescription.value.length < 20 ){
                errorsCounter++;
                let textAreaDescriptionContainer = document.querySelector('#descriptionContainer');

                if(!textAreaDescriptionContainer.innerHTML.includes("La descripción debe tener al menos 20 caractéres")){

                    textAreaDescriptionContainer.innerHTML += "<p class = \"text-danger\">La descripción debe tener al menos 20 caractéres</p>";
                }
            }
        
        if(inputName.value !== undefined){
            
            if(inputName.value.length < 5){
                errorsCounter++;
                let inputNameContainer = document.querySelector('#inputNameContainer');
                if(!inputNameContainer.innerHTML.includes("el nombre debe tener al menos 5 caractéres")){

                    inputNameContainer.innerHTML += "<p class = \"text-danger\">el nombre debe tener al menos 5 caractéres</p>";
                }
            }
        }else{

            errorsCounter++;
            let inputNameContainer = document.querySelector('#inputNameContainer');
            if(!inputNameContainer.innerHTML.includes("debes escribir un nombre")){

                inputNameContainer.innerHTML += "<p class = \"text-danger\">debes escribir un nombre</p>";
            }
        }
        if(inputImage.value !== ''){
            if(!(inputImage.value.includes('.jpg') || inputImage.value.includes('.jpeg') || inputImage.value.includes('.png') || inputImage.value.includes('.gif'))){

                errorsCounter++;
                let inputImageContainer = document.querySelector('#inputImageContainer');
                if(!inputImageContainer.innerHTML.includes("Los formatos permitidos son JPG, JPEG, PNG y GIF")){

                    inputImageContainer.innerHTML += "<p class = \"text-danger\">Los formatos permitidos son JPG, JPEG, PNG y GIF</p>";
                }
            }
        }
        if(errorsCounter > 0){

            e.preventDefault();
            errorsCounter = 0;
        }
    });
});