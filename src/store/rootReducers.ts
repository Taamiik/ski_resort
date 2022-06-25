import { combineReducers } from 'redux';
import { authorization } from './authorizationBlock/reducer';
import { visitors } from './visitors/reducer';
import { coaches } from './coaches/reducer';
import { skipass } from './skipass/reducer';
import { settings } from './settings/reducer';



export const rootReducers = combineReducers({
	authorization,
	visitors,
	coaches,
	skipass,
	settings
});

export type RootState = ReturnType<typeof rootReducers>