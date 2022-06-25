import { takeEvery, put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga'
import { 
	fetchCreateSkipassType,
	skipassEnum,
	fetchSectionSkipassType,
	fetchFindSkipassFullnameType,
	fetchSendEditedCardSkipassType,
	fetchRemoveSkipassType
} from './types';
import { setSectionSkipass, fetchSectionSkipass, setNewCreateSkipass, setArraySkipass } from './actions';
import { request } from './api/request';


function* workerCreateSkipass (dataSkipass: fetchCreateSkipassType): SagaIterator {
	yield call(request.createSkiPass, dataSkipass.payload[0])
	yield put(setNewCreateSkipass({flag: true, data:dataSkipass.payload[0]}))
	yield put(fetchSectionSkipass({page:dataSkipass.payload[1].page, size:dataSkipass.payload[1].size}))
}
function* workerSectionSkipassSaga (parameters: fetchSectionSkipassType): SagaIterator {
	const data = yield call(request.sectionSkipass, parameters)
	const getquantity = yield call(request.getQuantity)
	const skipass = {getquantity, types: 'skipass', title:'Ски-пассы'}
	yield put(setSectionSkipass(skipass))
	yield put(setArraySkipass(data))
}
function* workerFindSkipassFullname (prop: fetchFindSkipassFullnameType): SagaIterator {
	try {
		yield call(request.findSkipassFullname, prop.payload)
	}catch(e) {
		console.log(e)
	}
}
function* workerEditedCardSkipass (prop: fetchSendEditedCardSkipassType): SagaIterator {
	try {
		yield call(request.editedCardSkipass, prop.payload[0])
		yield put(fetchSectionSkipass({page:prop.payload[1].page, size:prop.payload[1].size}))
	}catch(e) {
		console.log(e)
	}
}
function* workerRemoveSkipass (prop: fetchRemoveSkipassType): SagaIterator {
	try {
		yield call(request.removeSkipass, prop.payload[0])
		const getquantity = yield call(request.getQuantity)
		const num = prop.payload[1].page
		
		if (getquantity < 5 || getquantity === 5) {
			yield put(fetchSectionSkipass({page:1, size:prop.payload[1].size}))
		}		
		if (getquantity > 5 && getquantity % 5 === 0 && num !== 1) {
			yield put(fetchSectionSkipass({page:num - 1, size:prop.payload[1].size}))
		}
		if (getquantity > 5 || num === 1) {
			yield put(fetchSectionSkipass({page:num, size:prop.payload[1].size}))
		}
	}catch(e) {
		console.log(e)
	}
}

export function* watcherSkipassSaga () {
	yield takeEvery(skipassEnum.FETCH_CREATE_SKIPASS, workerCreateSkipass)
	yield takeEvery(skipassEnum.FETCH_SECTION_SKIPASS, workerSectionSkipassSaga)
	yield takeEvery(skipassEnum.FETCH_FIND_SKIPASS_NUMBER, workerFindSkipassFullname)
	yield takeEvery(skipassEnum.FETCH_SEND_EDITED_CARD_SKIPASS, workerEditedCardSkipass)
	yield takeEvery(skipassEnum.FETCH_REMOVE_SKIPASS, workerRemoveSkipass)
}