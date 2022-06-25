import { RootState } from '../rootReducers';


export const returnListCoaches = (state: RootState) => {
	return state.visitors.coaches
}
	
export const searchVisitor = (state: RootState) => {
	return state.visitors.visitors
}
	
export const sectionVisitors = (state: RootState) => {
	return state.visitors.parameters
}
	
export const returnNewVisitor = (state: RootState) => {
	return state.visitors.newVisitor
}
	
export const returnVisitorToDelete = (state: RootState) => {
	return state.visitors.visitorToDelete
}
	
export const returnEditCardVisitor = (state: RootState) => {
	return state.visitors.editCardVisitor
}
	
export const returnFoundVisitor = (state: RootState) => {
	return state.visitors.foundVisitor
}
	
export const returnArrayVisitors = (state: RootState) => {
	return state.visitors.arrayVisitors
}
