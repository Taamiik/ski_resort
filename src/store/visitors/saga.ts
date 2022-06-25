import {
	takeEvery,
	put,
	all,
	call,
	AllEffect,
	CallEffect
} from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga'
import { 
	visitorEnum,
	fetchSearchVisitorType,
	fetchCreateVisitorType, 
	fetchSectionVisitorsType,
	fetchRemoveVisitorType,
	fetchEditCardVisitorType,
	fetchFindVisitorFullnameType
} from './types';
import { 
	setSearchVisitors,
	setReturnListCoaches,
	setSectionVisitors,
	fetchSectionVisitors,
	setNewCreateVisitor,
	setFoundVisitor,
	setArrayVisitors
} from './actions';
import { request } from './api/request';
import { Visitor } from '../../types/types';
import { workerUpLoadPhotoCoaches } from '../coaches/saga';

export function* workerUpLoadPhotoVisitors(data: Visitor[]): Generator<AllEffect<CallEffect>> {
	return yield all(data.map(el => {
	  return call(async () => {
		  const photo = await request.upLoadPhotoVisitor(el.id);
		  return {
			...el,
			photo: `data:image/jpeg;base64,${photo}`
		  }
	  })
	}))
}
function* workerSearchVisitors (data:fetchSearchVisitorType): SagaIterator {
	const result = yield call(request.searchVisitors, data.payload)
	yield put(setSearchVisitors(result))
}
function* workerReturnListCoaches(): SagaIterator {
	const result = yield call(request.getCoaches)
	const data = yield call(workerUpLoadPhotoCoaches, result) 
	yield put(setReturnListCoaches(data))
}
function* workerCreateVisitor (data:fetchCreateVisitorType): unknown {
	try {
		yield call(request.createVisitor, data.payload[0])
		const returnIdNewVisitor = yield call(request.findVisitorFullname, data.payload[0].fullname)
		const id = returnIdNewVisitor.map((elem: Visitor) => (elem.fullname === data.payload[0].fullname && elem.id))
		const visitor = {...data.payload[0], id:id[0], photo: data.payload[0].photo}
		yield put(setNewCreateVisitor({flag: true, data:visitor}))
		yield put(fetchSectionVisitors({page:data.payload[1].page, size:data.payload[1].size}))
	}catch(e) {
		console.log(e)
	}
}
function* workerSectionVisitorsSaga (parameters: fetchSectionVisitorsType): SagaIterator {
	const arrayVisitors = yield call(request.sectionVisitors, parameters)
	const data = yield call(workerUpLoadPhotoVisitors, arrayVisitors)
	const getquantity = yield call(request.getQuantity)
	const visitors = {getquantity, types: 'visitor', title:'Посетители'}
	yield put(setSectionVisitors(visitors))
	yield put(setArrayVisitors(data))
}
function* workerRemoveVisitor (prop: fetchRemoveVisitorType): SagaIterator {
	try {
		yield call(request.removeVisitor, prop.payload[0])
		const getquantity = yield call(request.getQuantity)
		const num = prop.payload[1].page
		
		if (getquantity < 26 || getquantity === 26) {
			yield put(fetchSectionVisitors({page:1, size:prop.payload[1].size}))
		}		
		if (getquantity > 26 && getquantity % 26 === 0 && num !== 1) {
			yield put(fetchSectionVisitors({page:num - 1, size:prop.payload[1].size}))
		}
		if (getquantity > 26 || num === 1) {
			yield put(fetchSectionVisitors({page:num, size:prop.payload[1].size}))
		}
	}catch(e) {
		console.log(e)
	}
}
function* workerEditedCardVisitor (prop: fetchEditCardVisitorType): SagaIterator {
	try {
		yield call(request.editedCardVisitor, prop.payload[0])
		yield put(fetchSectionVisitors({page:prop.payload[1].page, size:prop.payload[1].size}))
	}catch(e) {
		console.log(e)
	}
}
function* workerFindVisitor (prop: fetchFindVisitorFullnameType): SagaIterator {
	try {
		const visitor = yield call(request.findVisitorFullname, prop.payload)
		const photo = yield call(request.upLoadPhotoVisitor, visitor[0].id)
		
		visitor[0].photo = `data:image/jpeg;base64,${photo}`
		if (visitor.length > 0) yield put(setFoundVisitor(visitor[0]))
	}catch(e) {
		console.log(e)
	}
}


export function* watcherVisitorsSaga () {
	yield takeEvery(visitorEnum.FETCH_SEARCH_VISITORS, workerSearchVisitors)
	yield takeEvery(visitorEnum.FETCH_RETURN_LIST_COACHES, workerReturnListCoaches)
	yield takeEvery(visitorEnum.FETCH_CREATE_VISITOR, workerCreateVisitor)
	yield takeEvery(visitorEnum.FETCH_SECTION_VISITORS, workerSectionVisitorsSaga)
	yield takeEvery(visitorEnum.FETCH_REMOVE_VISITOR, workerRemoveVisitor)
	yield takeEvery(visitorEnum.FETCH_SEND_EDITED_CARD_VISITOR, workerEditedCardVisitor)
	yield takeEvery(visitorEnum.FETCH_FIND_VISITOR_FULLNAME, workerFindVisitor)
}
