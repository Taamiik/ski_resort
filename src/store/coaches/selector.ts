import { RootState } from '../rootReducers';

export const returnListVisitors = (state: RootState) => {
	return state.coaches.visitors
}
	
export const searchCoach = (state: RootState) => {
	return state.coaches.coach
}
	
export const sectionCoaches = (state: RootState) => {
	return state.coaches.parameters
}
	
export const returnNewCoach = (state: RootState) => {
	return state.coaches.newCoach
}
	
export const returnCoachToDelete = (state: RootState) => {
	return state.coaches.coachToDelete
}
	
export const returnEditCardCoach = (state: RootState) => {
	return state.coaches.editCardCoach
}
	
export const returnFoundCoach = (state: RootState) => {
	return state.coaches.foundCoach
}
	
export const returnArrayCoaches = (state: RootState) => {
	return state.coaches.arrayCoaches
}
