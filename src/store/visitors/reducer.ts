import { Visitor, Coach } from '../../types/types';
import { visitorEnum, visitorsState, ActionType } from './types';

interface StateTypes {
	visitors: Visitor[],
	coaches: Coach[],
	parameters: visitorsState['parameters'],
	newVisitor: {flag: boolean, data: Visitor | null},
	visitorToDelete: {flag: boolean, data: Visitor | null},
	editCardVisitor: {flag: boolean, data: Visitor | null},
	foundVisitor: Visitor,
	arrayVisitors: Visitor[]
}

const initialState: StateTypes = {
	visitors: [],
	coaches: [],
	parameters: {getquantity:0, types:'', title:''},
	newVisitor: {flag: false, data: null},
	visitorToDelete: {flag: false, data: null},
	editCardVisitor: {flag: false, data: null},
	foundVisitor: {} as Visitor,
	arrayVisitors: []
}

export const visitors = (state = initialState, action:ActionType): StateTypes => {
	switch(action.type) {
		case visitorEnum.SET_SEARCH_VISITORS:
			return {
				...state,
				visitors: action.payload
			}
		case visitorEnum.SET_RETURN_LIST_COACHES:
			return {
				...state,
				coaches: action.payload
			}
		case visitorEnum.SET_SECTION_VISITORS:
			return {
				...state,
				parameters: action.payload
			}
		case visitorEnum.SET_SUCCESS_CREATE_VISITOR:
			return {
				...state,
				newVisitor: { 
					flag: action.payload.flag,
					data: action.payload.data
				}
			}
		case visitorEnum.SET_FIND_VISITOR_FULLNAME:
			return {
				...state,
				visitorToDelete: { 
					flag: action.payload.flag,
					data: action.payload.data
				}
			}
		case visitorEnum.SET_EDIT_CARD_VISITOR:
			return {
				...state,
				editCardVisitor: {
					flag: action.payload.flag,
					data: action.payload.data
				}
			}
		case visitorEnum.SET_FOUND_VISITOR:
			return {
				...state,
				foundVisitor: action.payload
			}
		case visitorEnum.SET_ARRAY_VISITORS:
			return {
				...state,
				arrayVisitors: action.payload
			}
		default:
			return state;
	}
}