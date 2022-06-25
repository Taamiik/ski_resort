import { takeEvery, put } from 'redux-saga/effects';
import { setAuthorization } from './actions';
import { AuthorizationEnum, FetchAuthorization } from './types';
import { request } from './api/request'

function* workerSagaAuthorization (data: FetchAuthorization): unknown {
	const token = yield request(data.payload);
	localStorage.setItem('token', token.access_token);
	yield put(setAuthorization());
}

function* workerSagaLoggingOut () {
	localStorage.removeItem('token');
	yield put(setAuthorization());
}


export function* watcherSagaAuthorization () {
	yield takeEvery(AuthorizationEnum.FETCH_AUTHORIZATION, workerSagaAuthorization);
	yield takeEvery(AuthorizationEnum.FETCH_LOGGING_OUT, workerSagaLoggingOut);
}