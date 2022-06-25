import { fetchSectionCoachesType } from '../types';

export const endpoints = {
	createcoach: () => 'coach',
	getvisitors: () => 'visitor',
	searchcoaches: (value: string) => `coach/${value}`,
	sectioncoaches: ({page, size}:fetchSectionCoachesType['payload']) => `coach/page?pageNumber=${page}&pageSize=${size}`,
	getquantity: () => 'coach/getquantity',
	getphotocoach: (userId: number | undefined) => `img/coach/${userId}`,
	findcoachfullname: (fullname: string) => `coach/${fullname}`,
	removecoach: (userId: number) => `coach?coachId=${userId}`,
	editedcardcoach: () => 'coach',
	addvisitortocoach: (idV: number, idC: number) => `visitor/addcoach?visitorId=${idV}&coachId=${idC}`
}
