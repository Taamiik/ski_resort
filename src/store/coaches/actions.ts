import { 
	fetchSearchCoachesType, 
	setSearchCoachesType,
	
	fetchReturnListVisitorsType, 
	setReturnListVisitorsType,
	
	fetchCreateCoachesType,
	
	fetchSectionCoachesType,
	setSectionCoachesType,
	
	setNewCreateCoachType,
	
	fetchFindCoachFullnameType,
	setFindCoachFullnameType,
	
	fetchRemoveCoachType,
	
	setEditCardCoachType,
	
	fetchSendEditedCardCoachType,
	
	setFoundCoachType,
	
	setArrayCoachesType,
	
	coachesState,
	coachEnum 
} from './types';



export const fetchSearchCoaches = (payload: fetchSearchCoachesType['payload']): fetchSearchCoachesType => ({
	type:coachEnum.FETCH_SEARCH_COACHES,
	payload
})
export const setSearchCoaches = (payload: setSearchCoachesType['payload']): setSearchCoachesType => ({
	type:coachEnum.SET_SEARCH_COACHES,
	payload
})

export const fetchReturnListVisitors = (payload: fetchReturnListVisitorsType['payload']): fetchReturnListVisitorsType => ({
	type:coachEnum.FETCH_RETURN_LIST_VISITORS,
	payload
})
export const setReturnListVisitors = (payload: setReturnListVisitorsType['payload']): setReturnListVisitorsType => ({
	type:coachEnum.SET_RETURN_LIST_VISITORS,
	payload
})

export const fetchCreateCoach = (payload: fetchCreateCoachesType['payload']): fetchCreateCoachesType => ({
	type:coachEnum.FETCH_CREATE_COACHE,
	payload
})

export const fetchSectionCoaches = (payload: fetchSectionCoachesType['payload']): fetchSectionCoachesType => ({
	type:coachEnum.FETCH_SECTION_COACH,
	payload
})
export const setSectionCoaches = (payload: coachesState['parameters']): setSectionCoachesType => ({
	type:coachEnum.SET_SECTION_COACH,
	payload
})

export const setNewCreateCoach = (payload: setNewCreateCoachType['payload']): setNewCreateCoachType => ({
	type:coachEnum.SET_SUCCESS_CREATE_COACH,
	payload
})

export const fetchFindCoachFullname = (payload: fetchFindCoachFullnameType['payload']): fetchFindCoachFullnameType => ({
	type:coachEnum.FETCH_FIND_COACH_FULLNAME,
	payload
})
export const setFindCoachFullname = (payload: setFindCoachFullnameType['payload']): setFindCoachFullnameType => ({
	type:coachEnum.SET_FIND_COACH_FULLNAME,
	payload
})

export const fetchRemoveCoach = (payload: fetchRemoveCoachType['payload']): fetchRemoveCoachType => ({
	type:coachEnum.FETCH_REMOVE_COACH,
	payload
})

export const setEditCardCoach = (payload: setEditCardCoachType['payload']): setEditCardCoachType => ({
	type:coachEnum.SET_EDIT_CARD_COACH,
	payload
})

export const fetchSendEditedCardCoach = (payload: fetchSendEditedCardCoachType['payload']): fetchSendEditedCardCoachType => ({
	type:coachEnum.FETCH_SEND_EDITED_CARD_COACH,
	payload
})

export const setFoundCoach = (payload: setFoundCoachType['payload']): setFoundCoachType => ({
	type:coachEnum.SET_FOUND_COACH,
	payload
})

export const setArrayCoaches = (payload: setArrayCoachesType['payload']): setArrayCoachesType => ({
	type:coachEnum.SET_ARRAY_COACHES,
	payload
})