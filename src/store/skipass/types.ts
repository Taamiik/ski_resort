import { SkiPass, PayloadProps} from '../../types/types';

export enum skipassEnum {
	FETCH_CREATE_SKIPASS = 'FETCH_CREATE_SKIPASS',
	
	FETCH_SECTION_SKIPASS = 'FETCH_SECTION_SKIPASS',
	SET_SECTION_SKIPASS = 'SET_SECTION_SKIPASS',
	
	SET_SUCCESS_CREATE_SKIPASS = 'SET_SUCCESS_CREATE_SKIPASS',
	
	FETCH_FIND_SKIPASS_NUMBER = 'FETCH_FIND_SKIPASS_NUMBER',
	SET_FIND_SKIPASS_NUMBER = 'SET_FIND_SKIPASS_NUMBER',
	
	SET_EDIT_CARD_SKIPASS = 'SET_EDIT_CARD_SKIPASS',
	
	FETCH_SEND_EDITED_CARD_SKIPASS = 'FETCH_SEND_EDITED_CARD_SKIPASS',
	
	FETCH_REMOVE_SKIPASS = 'FETCH_REMOVE_SKIPASS',
	
	SET_ARRAY_SKIPASS = 'SET_ARRAY_SKIPASS'
}

export interface skipassState {
	parameters: {getquantity:number, types:string, title:string}
}

export interface setDataSkiPassType {
	type: skipassEnum.SET_SECTION_SKIPASS,
	payload: skipassState['parameters']
}

export interface fetchCreateSkipassType {
	type: skipassEnum.FETCH_CREATE_SKIPASS,
	payload: [SkiPass, PayloadProps]
}

export interface fetchSectionSkipassType {
	type: skipassEnum.FETCH_SECTION_SKIPASS,
	payload: PayloadProps
}
export interface setSectionSkipassType {
	type: skipassEnum.SET_SECTION_SKIPASS,
	payload: skipassState['parameters']
}

export interface setNewCreateSkipassType {
	type:skipassEnum.SET_SUCCESS_CREATE_SKIPASS,
	payload: {flag: boolean, data: SkiPass | null}
}

export interface fetchFindSkipassFullnameType {
	type:skipassEnum.FETCH_FIND_SKIPASS_NUMBER,
	payload: number
}
export interface setFindSkipassFullnameType {
	type:skipassEnum.SET_FIND_SKIPASS_NUMBER,
	payload: {flag: boolean, data: SkiPass | null}
}

export interface setEditCardSkipassType {
	type:skipassEnum.SET_EDIT_CARD_SKIPASS,
	payload: {flag: boolean, data: SkiPass | null}
}

export interface fetchSendEditedCardSkipassType {
	type:skipassEnum.FETCH_SEND_EDITED_CARD_SKIPASS,
	payload: [SkiPass, PayloadProps]
}

export interface fetchRemoveSkipassType {
	type:skipassEnum.FETCH_REMOVE_SKIPASS,
	payload: [number, PayloadProps]
}

export interface setArraySkipassType {
	type:skipassEnum.SET_ARRAY_SKIPASS,
	payload: SkiPass[]
}

export type ActionType = 
	setDataSkiPassType |
	setSectionSkipassType |
	setNewCreateSkipassType |
	setFindSkipassFullnameType |
	setEditCardSkipassType |
	setArraySkipassType