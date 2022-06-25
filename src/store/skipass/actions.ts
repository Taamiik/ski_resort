import { 
	skipassEnum,
	fetchCreateSkipassType,
	
	fetchSectionSkipassType,
	setSectionSkipassType,
	
	setNewCreateSkipassType,
	
	fetchFindSkipassFullnameType,
	setFindSkipassFullnameType,
	
	setEditCardSkipassType,
	fetchSendEditedCardSkipassType,
	
	setArraySkipassType,
	
	fetchRemoveSkipassType,
} from './types';


export const fetchCreateSkipass = (payload: fetchCreateSkipassType['payload']): fetchCreateSkipassType => ({
	type:skipassEnum.FETCH_CREATE_SKIPASS,
	payload
})

export const fetchSectionSkipass = (payload: fetchSectionSkipassType['payload']): fetchSectionSkipassType => ({
	type:skipassEnum.FETCH_SECTION_SKIPASS,
	payload
})
export const setSectionSkipass = (payload: setSectionSkipassType['payload']): setSectionSkipassType => ({
	type:skipassEnum.SET_SECTION_SKIPASS,
	payload
})

export const setNewCreateSkipass = (payload: setNewCreateSkipassType['payload']): setNewCreateSkipassType => ({
	type:skipassEnum.SET_SUCCESS_CREATE_SKIPASS,
	payload
})

export const fetchFindSkipassFullname = (payload: fetchFindSkipassFullnameType['payload']): fetchFindSkipassFullnameType => ({
	type:skipassEnum.FETCH_FIND_SKIPASS_NUMBER,
	payload
})
export const setFindSkipassFullname = (payload: setFindSkipassFullnameType['payload']): setFindSkipassFullnameType => ({
	type:skipassEnum.SET_FIND_SKIPASS_NUMBER,
	payload
})

export const setEditCardSkipass = (payload: setEditCardSkipassType['payload']): setEditCardSkipassType => ({
	type:skipassEnum.SET_EDIT_CARD_SKIPASS,
	payload
})

export const fetchSendEditedCardSkipass=(payload:fetchSendEditedCardSkipassType['payload']):fetchSendEditedCardSkipassType=>({
	type:skipassEnum.FETCH_SEND_EDITED_CARD_SKIPASS,
	payload
})

export const fetchRemoveSkipass = (payload: fetchRemoveSkipassType['payload']): fetchRemoveSkipassType => ({
	type:skipassEnum.FETCH_REMOVE_SKIPASS,
	payload
})

export const setArraySkipass = (payload: setArraySkipassType['payload']): setArraySkipassType => ({
	type:skipassEnum.SET_ARRAY_SKIPASS,
	payload
})