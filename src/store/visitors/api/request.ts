import { endpoints } from './endpoints';
import { ApiClient } from '../../../utils/apiClient';
import { Visitor } from '../../../types/types';
import { fetchSectionVisitorsType } from '../types';

export const request = {
	createVisitor: (dataVisitor:Visitor) => ApiClient.post({url: endpoints.createvisitor(), data:dataVisitor}),
	getCoaches: () => ApiClient.get({url: endpoints.getcoaches()}),
	searchVisitors: (value:string) => ApiClient.get({url: endpoints.searchvisitors(value)}),
	sectionVisitors: (data: fetchSectionVisitorsType) => ApiClient.get({url: endpoints.sectionvisitors(data.payload)}),
	getQuantity: () => ApiClient.get({url: endpoints.getquantity()}),
	upLoadPhotoVisitor: (userId: number) => ApiClient.get({url: endpoints.getphotovisitor(userId)}),
	findVisitorFullname: (fullname: string) => ApiClient.get({url: endpoints.findvisitorfullname(fullname)}),
	removeVisitor: (userId: number) => ApiClient.delete({url: endpoints.removevisitor(userId)}),
	editedCardVisitor: (dataVisitor: Visitor) => ApiClient.put({url: endpoints.editedcardvisitor(), data: dataVisitor})
}
