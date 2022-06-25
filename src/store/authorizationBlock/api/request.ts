import { endpoints } from './endpoints';
import { ApiClient } from '../../../utils/apiClient';
import { AuthorizationData } from '../types';


export const request = (dataForm: AuthorizationData) => {
	const authorization = `username=${dataForm.login}&password=${dataForm.password}&grant_type=password`

	return ApiClient.post({url: endpoints.authorization(), data: { authorization }})
}
