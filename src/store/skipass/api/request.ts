import { endpoints } from './endpoints';
import { ApiClient } from '../../../utils/apiClient';
import { SkiPass } from '../../../types/types';
import { fetchSectionSkipassType } from '../types';

export const request = {
	createSkiPass: (dataSkipass: SkiPass) => ApiClient.post({url: endpoints.createskipass(), data:dataSkipass}),
	sectionSkipass: (data: fetchSectionSkipassType) => ApiClient.get({url: endpoints.sectionskipass(data.payload)}),
	getQuantity: () => ApiClient.get({url: endpoints.getquantity()}),
	findSkipassFullname: (numberSkipass: number) => ApiClient.get({url: endpoints.findskipassfullname(numberSkipass)}),
	removeSkipass: (numberSkipass: number) => ApiClient.delete({url: endpoints.removeskipass(numberSkipass)}),
	editedCardSkipass: (dataSkipass: SkiPass) => ApiClient.put({url: endpoints.editedcardskipass(), data: dataSkipass})
}
