import config_app from './app'

export default {
    api_create_pet: config_app.api_base_url + '/' + config_app.api_version + '/pets',
    api_fetch_pet: config_app.api_base_url + '/' + config_app.api_version + '/pets',
    api_update_pet: config_app.api_base_url + '/' + config_app.api_version + '/pet',
};