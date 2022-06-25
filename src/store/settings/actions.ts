import {
	fetchEditAdminType,
	fetchUpLoadPhotoAdminType,
	setUpLoadPhotoAdminType,
	settingsEnum
} from './types';	


export const fetchEditAdmin = (payload: fetchEditAdminType['payload']): fetchEditAdminType => ({
	type:settingsEnum.FETCH_EDIT_ADMIN,
	payload
})

export const fetchUpLoadPhotoAdmin = (): fetchUpLoadPhotoAdminType => ({
	type:settingsEnum.FETCH_UPLOAD_PHOTO_ADMIN
})


export const setUpLoadPhotoAdmin = (payload: setUpLoadPhotoAdminType['payload']): setUpLoadPhotoAdminType => ({
	type:settingsEnum.SET_UPLOAD_PHOTO_ADMIN,
	payload
})
