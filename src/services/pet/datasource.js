import CustomStore from 'devextreme/data/custom_store';

function isNotEmpty(value) {
    return value !== undefined && value !== null && value !== '';
}

const fetch_data_source = (params) => {
    try {

        let store = new CustomStore({
            key: params.id,
            load(loadOptions) {
                let url_params = '?';
                [
                    'skip',
                    'take',
                    'sort',
                    'filter',
        
                ].forEach((i) => {
        
                    if (i in loadOptions && isNotEmpty(loadOptions[i])) { url_params += `${i}=${JSON.stringify(loadOptions[i])}&`; }
                });
        
                url_params = url_params.slice(0, -1);
        
            return fetch(`${params.url}${url_params}`)
                .then((response) => response.json())
                .then((data) => ({
                    data: data.data,
                    totalCount: data.count,
                }))
                .catch(() => { throw new Error('Data Loading Error'); });
            },
        });

        return store
        
    } catch (err) {
        console.error(err);
    }
};

export default fetch_data_source