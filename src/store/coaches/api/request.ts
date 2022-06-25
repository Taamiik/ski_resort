import { endpoints } from './endpoints';
import { ApiClient } from '../../../utils/apiClient';
import { Coach } from '../../../types/types';
import { fetchSectionCoachesType } from '../types';

export const request = {
	createCoach: (dataCoach: Coach) => ApiClient.post({url: endpoints.createcoach(), data:dataCoach}),
	getVisitors: () => ApiClient.get({url: endpoints.getvisitors()}),
	searchCoaches: (value:string) => ApiClient.get({url: endpoints.searchcoaches(value)}),
	sectionCoaches: (data: fetchSectionCoachesType) => ApiClient.get({url: endpoints.sectioncoaches(data.payload)}),
	getQuantity: () => ApiClient.get({url: endpoints.getquantity()}),
	upLoadPhotoCoach: (userId: number | undefined) => ApiClient.get({url: endpoints.getphotocoach(userId)}),
	findCoachFullname: (fullname: string) => ApiClient.get({url: endpoints.findcoachfullname(fullname)}),
	removeCoach: (userId: number) => ApiClient.delete({url: endpoints.removecoach(userId)}),
	editedCardCoach: (dataCoach: Coach) => ApiClient.put({url: endpoints.editedcardcoach(), data:dataCoach}),
	addVisitorToCoach: (idV: number, idC: number) => ApiClient.post({url: endpoints.addvisitortocoach(idV, idC)})
}
