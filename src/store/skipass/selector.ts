import { RootState } from '../rootReducers';


export const sectionSkipass = (state: RootState) => {
	return state.skipass.parameters
}
	
export const returnNewSkipass = (state: RootState) => {
	return state.skipass.newSkipass
}
	
export const returnEditCardSkipass = (state: RootState) => {
	return state.skipass.editCardSkipass
}
	
export const returnSkipassToDelete = (state: RootState) => {
	return state.skipass.skipassToDelete
}
	
export const returnArraySkipass = (state: RootState) => {
	return state.skipass.arraySkipass
}

