import { Coach, Visitor, SkiPass } from '../../types/types';
import { skipassEnum, skipassState, ActionType } from './types';

interface StateTypes {
	coach: Coach[],
	visitors: Visitor[],
	parameters: skipassState['parameters'],
	newSkipass: {flag: boolean, data: SkiPass | null},
	editCardSkipass: {flag: boolean, data: SkiPass | null},
	skipassToDelete: {flag: boolean, data: SkiPass | null},
	arraySkipass: SkiPass[]
}

const initialState:StateTypes = {
	coach: [],
	visitors: [],
	parameters: {getquantity:0, types:'', title:''},
	newSkipass: {flag: false, data: null},
	editCardSkipass: {flag: false, data: null},
	skipassToDelete: {flag: false, data: null},
	arraySkipass: [] as SkiPass[]
}

export const skipass = (state = initialState, action:ActionType): StateTypes => {
	switch(action.type) {
		case skipassEnum.SET_SECTION_SKIPASS:
			return {
				...state,
				parameters: action.payload
			}
		case skipassEnum.SET_SUCCESS_CREATE_SKIPASS:
			return {
				...state,
				newSkipass: {
					flag: action.payload.flag,
					data: action.payload.data
				}
			}
		case skipassEnum.SET_EDIT_CARD_SKIPASS:
			return {
				...state,
				editCardSkipass: {
					flag: action.payload.flag,
					data: action.payload.data
				}
			}
		case skipassEnum.SET_FIND_SKIPASS_NUMBER:
			return {
				...state,
				skipassToDelete: {
					flag: action.payload.flag,
					data: action.payload.data
				}
			}
		case skipassEnum.SET_ARRAY_SKIPASS:
			return {
				...state,
				arraySkipass: action.payload
			}
		default:
			return state;
	}
}

