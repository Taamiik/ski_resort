import { ActionType, AuthorizationEnum } from '../../store/authorizationBlock/types';

interface AuthorizationState {
	isAuthorization: boolean
}

const initialState:AuthorizationState = {
	isAuthorization: false
}

export const authorization = (state = initialState, action:ActionType): AuthorizationState => {
	switch(action.type) {
		case AuthorizationEnum.SET_AUTHORIZATION:
			return {
				isAuthorization: !state.isAuthorization
			}
		default:
			return state;
	}
}