import { fetchSectionSkipassType } from '../types';

export const endpoints = {
	createskipass: () => 'skipass',
	sectionskipass: ({page, size}:fetchSectionSkipassType['payload']) => `skipass/page?pageNumber=${page}&pageSize=${size}`,
	getquantity: () => 'skipass/getquantity',
	findskipassfullname: (numberSkipass: number) => `skipass/${numberSkipass}`,
	removeskipass: (numberSkipass: number) => `skipass?skiPassNumber=${numberSkipass}`,
	editedcardskipass: () => 'skipass'
}