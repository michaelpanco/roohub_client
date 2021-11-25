import { combineReducers } from 'redux';
import modify from './modify.reducer'

const petReducer = combineReducers({
	modify: modify,
});

export default petReducer;