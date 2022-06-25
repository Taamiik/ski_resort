import { 
	fetchSearchVisitorType,
	setSearchVisitorType,
	
	fetchReturnListCoachesType,
	setReturnListCoachesType,
	
	fetchCreateVisitorType,
	
	fetchSectionVisitorsType,
	setSectionVisitorsType,
	
	setNewCreateVisitorType,
	
	fetchFindVisitorFullnameType,
	setFindVisitorFullnameType,
	
	fetchRemoveVisitorType,
	
	setEditCardVisitorType,
	
	fetchEditCardVisitorType,
	
	setFoundVisitorType,
	
	setArrayVisitorsType,
	
	visitorEnum,
	visitorsState
} from './types';



export const fetchSearchVisitors = (payload: fetchSearchVisitorType['payload']): fetchSearchVisitorType => ({
	type:visitorEnum.FETCH_SEARCH_VISITORS,
	payload
})
export const setSearchVisitors = (payload: setSearchVisitorType['payload']): setSearchVisitorType => ({
	type:visitorEnum.SET_SEARCH_VISITORS,
	payload
})

export const fetchReturnListCoaches = (payload: fetchReturnListCoachesType['payload']): fetchReturnListCoachesType => ({
	type:visitorEnum.FETCH_RETURN_LIST_COACHES,
	payload
})
export const setReturnListCoaches = (payload: setReturnListCoachesType['payload']): setReturnListCoachesType => ({
	type:visitorEnum.SET_RETURN_LIST_COACHES,
	payload
})

export const fetchCreateVisitor = (payload: fetchCreateVisitorType['payload']): fetchCreateVisitorType => ({
	type:visitorEnum.FETCH_CREATE_VISITOR,
	payload
})

export const fetchSectionVisitors = (payload: fetchSectionVisitorsType['payload']): fetchSectionVisitorsType => ({
	type:visitorEnum.FETCH_SECTION_VISITORS,
	payload
})
export const setSectionVisitors = (payload: visitorsState['parameters']): setSectionVisitorsType => ({
	type:visitorEnum.SET_SECTION_VISITORS,
	payload
})

export const setNewCreateVisitor = (payload: setNewCreateVisitorType['payload']): setNewCreateVisitorType => ({
	type:visitorEnum.SET_SUCCESS_CREATE_VISITOR,
	payload
})

export const fetchFindVisitorFullname = (payload: fetchFindVisitorFullnameType['payload']): fetchFindVisitorFullnameType => ({
	type:visitorEnum.FETCH_FIND_VISITOR_FULLNAME,
	payload
})
export const setFindVisitorFullname = (payload: setFindVisitorFullnameType['payload']): setFindVisitorFullnameType => ({
	type:visitorEnum.SET_FIND_VISITOR_FULLNAME,
	payload
})

export const fetchRemoveVisitor = (payload: fetchRemoveVisitorType['payload']): fetchRemoveVisitorType => ({
	type:visitorEnum.FETCH_REMOVE_VISITOR,
	payload
})

export const setEditCardVisitor = (payload: setEditCardVisitorType['payload']): setEditCardVisitorType => ({
	type:visitorEnum.SET_EDIT_CARD_VISITOR,
	payload
})

export const fetchEditCardVisitor = (payload: fetchEditCardVisitorType['payload']): fetchEditCardVisitorType => ({
	type:visitorEnum.FETCH_SEND_EDITED_CARD_VISITOR,
	payload
})

export const setFoundVisitor = (payload: setFoundVisitorType['payload']): setFoundVisitorType => ({
	type:visitorEnum.SET_FOUND_VISITOR,
	payload
})

export const setArrayVisitors = (payload: setArrayVisitorsType['payload']): setArrayVisitorsType => ({
	type:visitorEnum.SET_ARRAY_VISITORS,
	payload
})
