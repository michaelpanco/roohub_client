import axios from 'axios';
import config from './../../config/api.endpoint'

const CreatePet = async (params) => {

    try {

        const response = await axios.post(config.api_create_pet, params);

        return response

    } catch (err) {

        return err
    }

    
};

export default CreatePet