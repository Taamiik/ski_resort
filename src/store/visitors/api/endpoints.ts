import { fetchSectionVisitorsType } from '../types';

export const endpoints = {
	createvisitor: () => 'visitor',
	getcoaches: () => 'coach',
	searchvisitors: (value: string) => `visitor/${value}`,
	sectionvisitors: ({page, size}:fetchSectionVisitorsType['payload']) => `visitor/page?pageNumber=${page}&pageSize=${size}`,
	getquantity: () => 'visitor/getquantity',
	getphotovisitor: (userId: number) => `img/visitor/${userId}`,
	findvisitorfullname: (fullname: string) => `visitor/${fullname}`,
	removevisitor: (userId: number) => `visitor?visitorId=${userId}`,
	editedcardvisitor: () => 'visitor'
}