import axios from 'axios';

enum Method {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE'
}

export type RequestData = Record<string, unknown>

export interface RequestParams {
	baseURL?: string;
	url: string;
	authorization?: string;
	data?: RequestData;
	headers?: RequestData;
}


export interface SendParams extends RequestParams {
	method: Method;
}

export const getInitialHeaders = (token?: string) => {
	const authorized = {
		'Content-Type': token ? 'application/json' : 'application/x-www-form-urlencoded',
		'Authorization': token ?  `Bearer ${token}` : `Basic ${btoa("skiresort:secret")}`
	}
	return authorized
}

const getToken = () => (
	localStorage.getItem('token') && localStorage.getItem('token')
)


export class ApiClient {
	private static axiosInstance = axios.create({
		baseURL: process.env.REACT_APP_BASE_URL && process.env.REACT_APP_BASE_URL
	})
	
	
	private static isOkStatus(status: number) {
		return status >= 200 && status < 300
	}
	
	private static async sendAndHandleResponse<ResponseType>(requestParams: SendParams): Promise<ResponseType> {
		
		ApiClient.axiosInstance.interceptors.response.use((config) => { return config }, (error) => {
			if (error.response?.status === 401) {
				localStorage.removeItem('token')
				window.location.href = '/login'
			}
		})
		
		const { url, method, data } = requestParams;
		
		const { status, data: currentData } = await ApiClient.axiosInstance.request<ResponseType>({
			url,
			method,
			data: data && data.authorization ? data.authorization : data,
			headers: getInitialHeaders(getToken()!)
		})

		if (!ApiClient.isOkStatus(status)) {
			throw new Error
		}

		return currentData as ResponseType
	}
	
	public static async get<ResponseType>(requestParams: RequestParams): Promise<ResponseType> {
		return ApiClient.sendAndHandleResponse<ResponseType>({
			...requestParams,
			method: Method.GET
		})
	}
	
	public static async post<ResponseType>(requestParams: RequestParams): Promise<ResponseType> {
		return ApiClient.sendAndHandleResponse<ResponseType>({
			...requestParams,
			method: Method.POST
		})
	}
	
	public static async put<ResponseType>(requestParams: RequestParams): Promise<ResponseType> {
		return ApiClient.sendAndHandleResponse<ResponseType>({
			...requestParams,
			method: Method.PUT
		})
	}
	
	public static async delete<ResponseType>(requestParams: RequestParams): Promise<ResponseType> {
		return ApiClient.sendAndHandleResponse<ResponseType>({
			...requestParams,
			method: Method.DELETE
		})
	}
}
