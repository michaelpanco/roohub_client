import {
    PET_UPDATE_OPEN,
    PET_CREATE_OPEN,
    PET_MODAL_CLOSE,
    PET_SUBMIT_READY,

    PET_SUBMIT_REQUEST,
    PET_SUBMIT_SUCCEEDED,
    PET_SUBMIT_FAILED,
    PET_CONVERT_UPDATE,
} from './../../constant';

const initialState = {

    
    open: false,

    modifyType: '',
    currentID: '',

    successOutcome: false,
    successOutcomeMsg: '',

    failedOutcome: false,
    failedOutcomeMsg: '',

    name: '',
    nickname: '',
    weight: '',
    height: '',
    gender: '',
    color: '',
    friendliness: '',
    birthday: '',
    birthdayFormated: '',

    nameValid: false,
    nicknameValid: false,
    weightValid: false,
    heightValid: false,
    genderValid: false,
    colorValid: false,
    friendlinessValid: false,
    birthdayValid: false,

    // fieldsInValidation
    nameInvalid: false,
    nicknameInvalid: false,
    weightInvalid: false,
    heightInvalid: false,
    genderInvalid: false,
    colorInvalid: false,
    friendlinessInvalid: false,
    birthdayInvalid: false,

    nameErr: '',
    nicknameErr: '',
    weightErr: '',
    heightErr: '',
    genderErr: '',
    colorErr: '',
    friendlinessErr: '',
    birthdayErr: '',

    submitReady: false,
    submitRequest: false,
}

function modifyReducer(state = initialState, action) {

	if (action.type === PET_UPDATE_OPEN) {
		return Object.assign({}, state, {
			open: true,
            modifyType: 'update',
            currentID: action.currentID,
            name: action.name,
            nickname: action.nickname,
            weight: action.weight,
            height: action.height,
            gender: action.gender,
            color: action.color,
            friendliness: action.friendliness,
            birthday: action.birthday,
            birthdayFormated: action.birthdayFormated,
		});
    }


	if (action.type === PET_CREATE_OPEN) {
		return Object.assign({}, state, {
			open: true,
            modifyType: 'create',
		});
    }

	if (action.type === PET_CONVERT_UPDATE) {
		return Object.assign({}, state, {
            modifyType: 'update',
		});
    }


	if (action.type === PET_MODAL_CLOSE) {
		return Object.assign({}, state, {
			open: false,
		});
    }
    
	if (action.type === PET_SUBMIT_READY) {
		return Object.assign({}, state, {
			submitReady: action.ready,
		});
    }

	if (action.type === PET_SUBMIT_REQUEST) {
		return Object.assign({}, state, {
			submitRequest: true,
		});
    }

	if (action.type === PET_SUBMIT_SUCCEEDED) {
		return Object.assign({}, state, {
			submitRequest: false,
            successOutcome: true,
            successOutcomeMsg: action.message,
            failedOutcome: false,
            failedOutcomeMsg: '',
		});
    }

	if (action.type === PET_SUBMIT_FAILED) {
		return Object.assign({}, state, {
			submitRequest: false,
            successOutcome: false,
            successOutcomeMsg: '',
            failedOutcome: true,
            failedOutcomeMsg: action.message,
		});
    }

	return state;
};

export default modifyReducer;