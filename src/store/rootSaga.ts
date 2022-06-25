import { all } from 'redux-saga/effects';
import { watcherSagaAuthorization } from './authorizationBlock/saga';
import { watcherVisitorsSaga } from './visitors/saga';
import { watcherCoachesSaga } from './coaches/saga';
import { watcherSkipassSaga } from './skipass/saga';
import { watcherSettingsSaga } from './settings/saga';

export function* rootSaga () {
	yield all ([
		watcherSagaAuthorization(),
		watcherVisitorsSaga(),
		watcherCoachesSaga(),
		watcherSkipassSaga(),
		watcherSettingsSaga()
	])
}