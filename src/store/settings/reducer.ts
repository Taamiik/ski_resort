import { settingsEnum, ActionType } from './types';

interface StateTypes {
	photo: string
}

const initialState:StateTypes = {
	photo: ''
}

export const settings = (state = initialState, action:ActionType): StateTypes => {
	switch(action.type) {
		case settingsEnum.SET_UPLOAD_PHOTO_ADMIN:
			return {
				...state,
				photo: action.payload
			}
		default:
			return state;
	}
}

