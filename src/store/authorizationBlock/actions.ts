import { 
	AuthorizationEnum, 
	AuthorizationData,
	FetchLoggingOut, 
	SetAuthorization, 
	FetchAuthorization 
} from './types';

export const setAuthorization = (): SetAuthorization => ({
	type: AuthorizationEnum.SET_AUTHORIZATION
})

export const fetchLoggingOut = (): FetchLoggingOut => ({
	type: AuthorizationEnum.FETCH_LOGGING_OUT
})

export const fetchAuthorization = (payload: AuthorizationData): FetchAuthorization => ({
	type: AuthorizationEnum.FETCH_AUTHORIZATION,
	payload
})



