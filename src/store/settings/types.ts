import { Admin } from '../../types/types';

export enum settingsEnum {
	FETCH_EDIT_ADMIN = 'FETCH_EDIT_ADMIN',
	SET_SET_ADMIN = 'SET_SET_ADMIN',
	
	FETCH_UPLOAD_PHOTO_ADMIN = 'FETCH_UPLOAD_PHOTO_ADMIN',
	SET_UPLOAD_PHOTO_ADMIN = 'SET_UPLOAD_PHOTO_ADMIN'
}

export interface fetchEditAdminType {
	type:settingsEnum.FETCH_EDIT_ADMIN,
	payload: Admin
}

export interface fetchUpLoadPhotoAdminType {
	type:settingsEnum.FETCH_UPLOAD_PHOTO_ADMIN
}

export interface setUpLoadPhotoAdminType {
	type:settingsEnum.SET_UPLOAD_PHOTO_ADMIN,
	payload: string
}

export type ActionType = setUpLoadPhotoAdminType