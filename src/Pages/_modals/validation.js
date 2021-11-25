export default function validation(event) {

    let stateChange = {
        [event.target.name]: event.target.value
    }

    if(event.target.name === "name"){
        if(event.target.value === ""){
            stateChange['nameInvalid'] = true;
            stateChange['nameErr'] = 'Name is required';
            stateChange['nameValid'] = false;
        }else{
            if(event.target.value.length < 2){
                stateChange['nameInvalid'] = true;
                stateChange['nameErr'] = 'Invalid name';
                stateChange['nameValid'] = false;
                
            }else{
                stateChange['nameInvalid'] = false;
                stateChange['nameValid'] = true;
            }
        }
    }

    if(event.target.name === "nickname"){
        if(event.target.value === ""){
            stateChange['nicknameInvalid'] = false;
            stateChange['nicknameValid'] = false;
        }else{
            if(event.target.value.length < 2){
                stateChange['nicknameInvalid'] = true;
                stateChange['nicknameErr'] = 'Invalid nickname';
                stateChange['nicknameValid'] = false;
                
            }else{
                stateChange['nicknameInvalid'] = false;
                stateChange['nicknameValid'] = true;
            }
        }
    }

    if(event.target.name === "gender"){
        if(event.target.value === ""){
            stateChange['genderInvalid'] = true;
            stateChange['genderErr'] = 'gender is required';
            stateChange['genderValid'] = false;
        }else{
            stateChange['genderInvalid'] = false;
            stateChange['genderValid'] = true;
        }
    }

    if(event.target.name === "friendliness"){
        if(event.target.value === ""){
            stateChange['friendlinessInvalid'] = false;
            stateChange['friendlinessValid'] = false;
        }else{
            stateChange['friendlinessInvalid'] = false;
            stateChange['friendlinessValid'] = true;
        }
    }


    if(event.target.name === "height"){
        if(event.target.value === ""){
            stateChange['heightInvalid'] = true;
            stateChange['heightErr'] = 'height is required';
            stateChange['heightValid'] = false;
        }else{
            
            if(isNaN(parseFloat(event.target.value))){
           
                stateChange['heightInvalid'] = true;
                stateChange['heightErr'] = 'Invalid height value';
                stateChange['heightValid'] = false;

            }else{
            
                // check if the value contains letter
                if (/[a-zA-Z]/.test(event.target.value))
                {
                    stateChange['heightInvalid'] = true;
                    stateChange['heightErr'] = 'Invalid height';
                    stateChange['heightValid'] = false;

                }else{
                    if(parseFloat(event.target.value) < 0.5 || parseFloat(event.target.value) > 10.00){
                        stateChange['heightInvalid'] = true;
                        stateChange['heightErr'] = 'Invalid height';
                        stateChange['heightValid'] = false;
                        
                    }else{
                        stateChange['heightInvalid'] = false;
                        stateChange['heightValid'] = true;
                    }
                }
            }
        }
    }


    if(event.target.name === "weight"){
        if(event.target.value === ""){
            stateChange['weightInvalid'] = true;
            stateChange['weightErr'] = 'weight is required';
            stateChange['weightValid'] = false;
        }else{
            
            if(isNaN(parseFloat(event.target.value))){
           
                stateChange['weightInvalid'] = true;
                stateChange['weightErr'] = 'Invalid weight value';
                stateChange['weightValid'] = false;

            }else{
            
                // check if the value contains letter
                if (/[a-zA-Z]/.test(event.target.value))
                {
                    stateChange['weightInvalid'] = true;
                    stateChange['weightErr'] = 'Invalid weight';
                    stateChange['weightValid'] = false;

                }else{
                    if(parseFloat(event.target.value) < 0.5 || parseFloat(event.target.value) > 100.00){
                        stateChange['weightInvalid'] = true;
                        stateChange['weightErr'] = 'Invalid weight';
                        stateChange['weightValid'] = false;
                        
                    }else{
                        stateChange['weightInvalid'] = false;
                        stateChange['weightValid'] = true;
                    }
                }
            }
        }
    }

    if(event.target.name === "color"){
        if(event.target.value === ""){
            stateChange['colorInvalid'] = false;
            stateChange['colorValid'] = false;
        }else{
            if(event.target.value.length < 2){
                stateChange['colorInvalid'] = true;
                stateChange['colorErr'] = 'Invalid color';
                stateChange['colorValid'] = false;
                
            }else{
                stateChange['colorInvalid'] = false;
                stateChange['colorValid'] = true;
            }
        }
    }

    return stateChange;
        
}