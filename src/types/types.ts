export type SkiPass = {
	number: number,
	expirationTime:string,
	price: number,
	visitor?: Visitor,
	photo?:string | null
}

export type Coach = {   
	id?: number | undefined,
	fullname: string,
	skiPass: SkiPass | null,
	category: string,
	sportType: string,
	workExperience: string,
	dateOfBirth: string,
	sex: string,
	visitor?:Visitor,
	photo: string | null
}

export type Visitor = { 
	id: number,
	fullname:string,
	dateOfBirth:string,
	skiPassExpirationTime:string,
	coach?: Coach,
	dateOfVisit?:string,
	photo:string | null,
	sportType:string
}

export type Admin = {
	id: number,
	username: string,
	surname?: string,
	roles: [{name:string}],
	password: string,
	photo: string
}

export interface Types {
	types: Coach | Visitor
}

export interface PayloadProps {
	page: number,
	size: number
}