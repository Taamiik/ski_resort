import { takeEvery, put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga'

import { settingsEnum, fetchEditAdminType } from './types';
import { request } from './api/request';
import { setUpLoadPhotoAdmin } from './actions';

function* workerSettingsSaga (prop: fetchEditAdminType): SagaIterator {
	yield call(request.editAdmin, prop)
}

function* workerUpLoadPhotoAdminSaga (): SagaIterator {
	const base64 = yield call(request.upLoadPhotoAdmin)
	const photo = `data:image/jpeg;base64,${base64}`
	yield put(setUpLoadPhotoAdmin(photo))
}


export function* watcherSettingsSaga () {
	yield takeEvery(settingsEnum.FETCH_EDIT_ADMIN, workerSettingsSaga)
	yield takeEvery(settingsEnum.FETCH_UPLOAD_PHOTO_ADMIN, workerUpLoadPhotoAdminSaga)
}
