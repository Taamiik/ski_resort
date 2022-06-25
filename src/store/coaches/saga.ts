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
	coachEnum,
	fetchSearchCoachesType,
	fetchCreateCoachesType,
	fetchSectionCoachesType,
	fetchRemoveCoachType,
	fetchSendEditedCardCoachType,
	fetchFindCoachFullnameType
} from './types';
import { 
	setSearchCoaches,
	setReturnListVisitors,
	setSectionCoaches,
	fetchSectionCoaches,
	setNewCreateCoach,
	setFoundCoach,
	setArrayCoaches
} from './actions';
import { request } from './api/request';
import { Coach } from '../../types/types';
import { workerUpLoadPhotoVisitors } from '../visitors/saga';


export function* workerUpLoadPhotoCoaches(data: Coach[]): Generator<AllEffect<CallEffect>> {
	return yield all(data.map(el => {
	  return call(async () => {
		  const photo = await request.upLoadPhotoCoach(el.id);
		  return {
			...el,
			photo: `data:image/jpeg;base64,${photo}`
		  }
	  })
	}))
}
function* workerSearchCoaches (data:fetchSearchCoachesType): SagaIterator {
	const result = yield call(request.searchCoaches, data.payload)
	yield put(setSearchCoaches(result))
}
function* workerReturnListVisitors(): SagaIterator {
	const result = yield call(request.getVisitors)
	const data = yield call(workerUpLoadPhotoVisitors, result) 
	yield put(setReturnListVisitors(data))
}


function* workerCreateCoach (data:fetchCreateCoachesType): unknown {
	try {
		const visitorId: number = data.payload[0].visitor!.id
		yield call(request.createCoach, data.payload[0])
		const returnIdNewCoach = yield call(request.findCoachFullname, data.payload[0].fullname)
		const id = returnIdNewCoach.map((elem: Coach) => (elem.fullname === data.payload[0].fullname && elem.id))
		yield request.addVisitorToCoach(visitorId, id[0])
		const coach = yield {...data.payload, id:id[0], photo: data.payload[0].photo}
		yield put(setNewCreateCoach({flag: true, data:coach['0']}))
		yield put(fetchSectionCoaches({page:data.payload[1].page, size:data.payload[1].size}))
	}catch(e) {
		console.log(e)
	}
}
function* workerSectionCoachesSaga (parameters: fetchSectionCoachesType): SagaIterator {
	const arrayCoaches = yield call(request.sectionCoaches, parameters)
	const data = yield call(workerUpLoadPhotoCoaches, arrayCoaches)
	const getquantity = yield call(request.getQuantity)
	const coaches = {getquantity, types: 'coach', title:'Инструкторы'}
	yield put(setSectionCoaches(coaches))
	yield put(setArrayCoaches(data))
}
function* workerRemoveCoach (prop: fetchRemoveCoachType): SagaIterator {
	try {
		yield call(request.removeCoach, prop.payload[0])
		const getquantity = yield call(request.getQuantity)
		const num = prop.payload[1].page

		if (getquantity < 26 || getquantity === 26) {
			yield put(fetchSectionCoaches({page:1, size:prop.payload[1].size}))
		}
		if (getquantity > 26 && getquantity % 26 === 0 && num !== 1) {
			yield put(fetchSectionCoaches({page:num - 1, size:prop.payload[1].size}))
		}
		if (getquantity > 26 || num === 1) {
			yield put(fetchSectionCoaches({page:num, size:prop.payload[1].size}))
		}
	}catch(e) {
		console.log(e)
	}
}
function* workerEditedCardCoach (prop: fetchSendEditedCardCoachType): SagaIterator {
	try {
		yield call(request.editedCardCoach, prop.payload[0])
		yield put(fetchSectionCoaches({page:prop.payload[1].page, size:prop.payload[1].size}))
	}catch(e) {
		console.log(e)
	}
}
function* workerFindCoach (prop: fetchFindCoachFullnameType): SagaIterator {
	try {
		const coach = yield call(request.findCoachFullname, prop.payload)
		const photo = yield call(request.upLoadPhotoCoach, coach[0].id)
		
		coach[0].photo = `data:image/jpeg;base64,${photo}`
		if (coach.length > 0) yield put(setFoundCoach(coach[0]))
	}catch(e) {
		console.log(e)
	}
}

export function* watcherCoachesSaga () {
	yield takeEvery(coachEnum.FETCH_SEARCH_COACHES, workerSearchCoaches)
	yield takeEvery(coachEnum.FETCH_RETURN_LIST_VISITORS, workerReturnListVisitors)
	yield takeEvery(coachEnum.FETCH_CREATE_COACHE, workerCreateCoach)
	yield takeEvery(coachEnum.FETCH_SECTION_COACH, workerSectionCoachesSaga)
	yield takeEvery(coachEnum.FETCH_REMOVE_COACH, workerRemoveCoach)
	yield takeEvery(coachEnum.FETCH_SEND_EDITED_CARD_COACH, workerEditedCardCoach)
	yield takeEvery(coachEnum.FETCH_FIND_COACH_FULLNAME, workerFindCoach)
}
