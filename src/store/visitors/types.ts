import { Visitor, Coach, PayloadProps } from '../../types/types';


export interface visitorsState {
	parameters: {getquantity:number, types:string, title:string}
}

export enum visitorEnum {
	FETCH_SEARCH_VISITORS = 'FETCH_SEARCH_VISITORS',
	SET_SEARCH_VISITORS = 'SET_SEARCH_VISITORS',
	
	FETCH_RETURN_LIST_COACHES = 'FETCH_RETURN_LIST_COACHES',
	SET_RETURN_LIST_COACHES = 'SET_RETURN_LIST_COACHES',
	
	FETCH_CREATE_VISITOR = 'FETCH_CREATE_VISITOR',
	
	FETCH_SECTION_VISITORS = 'FETCH_SECTION_VISITORS',
	SET_SECTION_VISITORS = 'SET_SECTION_VISITORS',
	
	SET_SUCCESS_CREATE_VISITOR= 'SET_SUCCESS_CREATE_VISITOR',
	
	FETCH_FIND_VISITOR_FULLNAME = 'FETCH_FIND_VISITOR_FULLNAME',
	SET_FIND_VISITOR_FULLNAME = 'SET_FIND_VISITOR_FULLNAME',
	
	FETCH_REMOVE_VISITOR = 'FETCH_REMOVE_VISITOR',
	
	SET_EDIT_CARD_VISITOR = 'SET_EDIT_CARD_VISITOR',
	
	FETCH_SEND_EDITED_CARD_VISITOR = 'FETCH_SEND_EDITED_CARD_VISITOR',
	
	SET_FOUND_VISITOR = 'SET_FOUND_VISITOR',
	
	SET_ARRAY_VISITORS = 'SET_ARRAY_VISITORS',
}


export interface fetchSearchVisitorType {
	type:visitorEnum.FETCH_SEARCH_VISITORS,
	payload: string
}
export interface setSearchVisitorType {
	type:visitorEnum.SET_SEARCH_VISITORS,
	payload: Visitor[]
}

export interface fetchReturnListCoachesType {
	type:visitorEnum.FETCH_RETURN_LIST_COACHES,
	payload: string
}
export interface setReturnListCoachesType {
	type:visitorEnum.SET_RETURN_LIST_COACHES,
	payload: Coach[]
}

export interface fetchCreateVisitorType {
	type:visitorEnum.FETCH_CREATE_VISITOR
	payload: [Visitor, PayloadProps]
}

export interface fetchSectionVisitorsType {
	type: visitorEnum.FETCH_SECTION_VISITORS,
	payload: PayloadProps
}
export interface setSectionVisitorsType {
	type: visitorEnum.SET_SECTION_VISITORS,
	payload: visitorsState['parameters']
}

export interface setNewCreateVisitorType {
	type:visitorEnum.SET_SUCCESS_CREATE_VISITOR,
	payload: {flag: boolean, data: Visitor | null}
}

export interface fetchFindVisitorFullnameType {
	type:visitorEnum.FETCH_FIND_VISITOR_FULLNAME,
	payload: string
}
export interface setFindVisitorFullnameType {
	type:visitorEnum.SET_FIND_VISITOR_FULLNAME,
	payload: {flag: boolean, data: Visitor | null}
}

export interface fetchRemoveVisitorType {
	type:visitorEnum.FETCH_REMOVE_VISITOR,
	payload: [number, PayloadProps]
}

export interface setEditCardVisitorType {
	type:visitorEnum.SET_EDIT_CARD_VISITOR,
	payload: {flag: boolean, data: Visitor | null}
}

export interface fetchEditCardVisitorType {
	type:visitorEnum.FETCH_SEND_EDITED_CARD_VISITOR,
	payload: [Visitor, PayloadProps]
}

export interface setFoundVisitorType {
	type:visitorEnum.SET_FOUND_VISITOR,
	payload: Visitor
}

export interface setArrayVisitorsType {
	type:visitorEnum.SET_ARRAY_VISITORS,
	payload: Visitor[]
}


export type ActionType = 
	setSearchVisitorType |
	setReturnListCoachesType |
	setSectionVisitorsType |
	setNewCreateVisitorType |
	setFindVisitorFullnameType |
	setEditCardVisitorType |
	setFoundVisitorType |
	setArrayVisitorsType
