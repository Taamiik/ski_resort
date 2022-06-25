import { endpoints } from './endpoints';
import { ApiClient } from '../../../utils/apiClient';
import { fetchEditAdminType } from '../types';

export const request = {
	editAdmin: (dataAdmin: fetchEditAdminType) => ApiClient.put({url: endpoints.editadmin(), data:dataAdmin.payload}),
	upLoadPhotoAdmin: () => ApiClient.get({url: endpoints.uploadphotoadmin()})
}
