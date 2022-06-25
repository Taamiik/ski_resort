export enum AuthorizationEnum {
	SET_AUTHORIZATION = 'SET_AUTHORIZATION',
	SET_LOGGING_OUT = 'SET_LOGGING_OUT',
	FETCH_LOGGING_OUT = 'FETCH_LOGGING_OUT',
	FETCH_AUTHORIZATION = 'FETCH_AUTHORIZATION'
}


export interface AuthorizationData {
	login: string,
	password: string
}

export interface SetAuthorization {
	type: AuthorizationEnum.SET_AUTHORIZATION
}

export interface FetchLoggingOut {
	type: AuthorizationEnum.FETCH_LOGGING_OUT
}

export interface FetchAuthorization {
	type: AuthorizationEnum.FETCH_AUTHORIZATION,
	payload: AuthorizationData
}

export type ActionType = SetAuthorization