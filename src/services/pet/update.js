import axios from 'axios';
import config from './../../config/api.endpoint'

const UpdatePet = async (id, params) => {

    try {

        const response = await axios.put(config.api_update_pet + '/' + id, params);

        return response

    } catch (err) {

        return err
    }

    
};

export default UpdatePet