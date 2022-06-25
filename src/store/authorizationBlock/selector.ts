import { RootState } from '../rootReducers';

export const authorizationSelector = (state: RootState)=> {
	return state.authorization
}