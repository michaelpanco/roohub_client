import { combineReducers } from 'redux';

import pet_reducer from './pet'

const allReducers = combineReducers({
	pet: pet_reducer,
});

export default allReducers;