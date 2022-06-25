import { Coach, Visitor } from '../../types/types';
import { coachEnum, coachesState, ActionType } from './types';

interface StateTypes {
	coach: Coach[],
	visitors: Visitor[],
	parameters: coachesState['parameters'],
	newCoach: {flag: boolean, data: Coach | null},
	coachToDelete: {flag: boolean, data: Coach | null},
	editCardCoach: {flag: boolean, data: Coach | null},
	foundCoach: Coach,
	arrayCoaches: Coach[]
}

const initialState:StateTypes = {
	coach: [],
	visitors: [],
	parameters: {getquantity:0, types:'', title:''},
	newCoach: {flag: false, data: null},
	coachToDelete: {flag: false, data: null},
	editCardCoach: {flag: false, data: null},
	foundCoach: {} as Coach,
	arrayCoaches: []
}

export const coaches = (state = initialState, action:ActionType): StateTypes => {
	switch(action.type) {
		case coachEnum.SET_SEARCH_COACHES:
			return {
				...state,
				coach: action.payload
			}
		case coachEnum.SET_RETURN_LIST_VISITORS:
			return {
				...state,
				visitors: action.payload
			}
		case coachEnum.SET_SECTION_COACH:
			return {
				...state,
				parameters: action.payload
			}
		case coachEnum.SET_SUCCESS_CREATE_COACH:
			return {
				...state,
				newCoach: {
					flag: action.payload.flag,
					data: action.payload.data
				}
			}
		case coachEnum.SET_FIND_COACH_FULLNAME:
			return {
				...state,
				coachToDelete: {
					flag: action.payload.flag,
					data: action.payload.data
				}
			}
		case coachEnum.SET_EDIT_CARD_COACH:
			return {
				...state,
				editCardCoach: {
					flag: action.payload.flag,
					data: action.payload.data
				}
			}
		case coachEnum.SET_FOUND_COACH:
			return {
				...state,
				foundCoach: action.payload
			}
		case coachEnum.SET_ARRAY_COACHES:
			return {
				...state,
				arrayCoaches: action.payload
			}
		default:
			return state;
	}
}

