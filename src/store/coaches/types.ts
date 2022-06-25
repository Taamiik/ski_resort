import { Coach, Visitor, PayloadProps } from '../../types/types';


export interface coachesState {
	parameters: {getquantity:number, types:string, title:string}
}


export enum coachEnum {
	FETCH_SEARCH_COACHES = 'FETCH_SEARCH_COACHES',
	SET_SEARCH_COACHES = 'SET_SEARCH_COACHES',
	
	FETCH_RETURN_LIST_VISITORS = 'FETCH_RETURN_LIST_VISITORS',
	SET_RETURN_LIST_VISITORS = 'SET_RETURN_LIST_VISITORS',
	
	FETCH_CREATE_COACHE = 'FETCH_CREATE_COACHE',
	
	FETCH_SECTION_COACH = 'FETCH_SECTION_COACH',
	SET_SECTION_COACH = 'SET_SECTION_COACH',
	
	SET_SUCCESS_CREATE_COACH = 'SET_SUCCESS_CREATE_COACH',
	
	FETCH_FIND_COACH_FULLNAME = 'FETCH_FIND_COACH_FULLNAME',
	SET_FIND_COACH_FULLNAME = 'SET_FIND_COACH_FULLNAME',
	
	FETCH_REMOVE_COACH = 'FETCH_REMOVE_COACH',
	
	SET_EDIT_CARD_COACH = 'SET_EDIT_CARD_COACH',
	
	FETCH_SEND_EDITED_CARD_COACH = 'FETCH_SEND_EDITED_CARD_COACH',
	
	SET_FOUND_COACH = 'SET_FOUND_COACH',
	
	SET_ARRAY_COACHES = 'SET_ARRAY_COACHES'
}


export interface fetchSearchCoachesType {
	type:coachEnum.FETCH_SEARCH_COACHES,
	payload: string
}
export interface setSearchCoachesType {
	type:coachEnum.SET_SEARCH_COACHES,
	payload: Coach[]
}

export interface fetchReturnListVisitorsType {
	type:coachEnum.FETCH_RETURN_LIST_VISITORS,
	payload: string
}
export interface setReturnListVisitorsType {
	type:coachEnum.SET_RETURN_LIST_VISITORS,
	payload: Visitor[]
}

export interface fetchCreateCoachesType {
	type:coachEnum.FETCH_CREATE_COACHE
	payload: [Coach, PayloadProps]
}

export interface fetchSectionCoachesType {
	type: coachEnum.FETCH_SECTION_COACH,
	payload: PayloadProps
}
export interface setSectionCoachesType {
	type: coachEnum.SET_SECTION_COACH,
	payload: coachesState['parameters']
}

export interface setNewCreateCoachType {
	type:coachEnum.SET_SUCCESS_CREATE_COACH,
	payload: {flag: boolean, data: Coach | null}
}

export interface fetchFindCoachFullnameType {
	type:coachEnum.FETCH_FIND_COACH_FULLNAME,
	payload: string
}
export interface setFindCoachFullnameType {
	type:coachEnum.SET_FIND_COACH_FULLNAME,
	payload: {flag: boolean, data: Coach | null}
}

export interface fetchRemoveCoachType {
	type:coachEnum.FETCH_REMOVE_COACH,
	payload: [number, PayloadProps]
}

export interface setEditCardCoachType {
	type:coachEnum.SET_EDIT_CARD_COACH,
	payload: {flag: boolean, data: Coach | null}
}

export interface fetchSendEditedCardCoachType {
	type:coachEnum.FETCH_SEND_EDITED_CARD_COACH,
	payload: [Coach, PayloadProps]
}

export interface setFoundCoachType {
	type:coachEnum.SET_FOUND_COACH,
	payload: Coach
}

export interface setArrayCoachesType {
	type:coachEnum.SET_ARRAY_COACHES,
	payload: Coach[]
}

export type ActionType = 
	setSearchCoachesType |
	setReturnListVisitorsType |
	setSectionCoachesType |
	setNewCreateCoachType |
	setFindCoachFullnameType |
	setEditCardCoachType |
	setFoundCoachType |
	setArrayCoachesType