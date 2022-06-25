import React, { ChangeEvent } from 'react';
import Navigation from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Dispatch } from 'redux';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';


interface Props {
	requests: {[value: string]: (dispatch: Dispatch, page?: number | undefined) => void},
	getquantity: number
}

interface pathType {
	[value: string]: number
}

export const Pagination: React.FC<Props> = ({getquantity, requests})=> {
	const dispatch = useDispatch()
	const location = useLocation()
	const visitor = '/visitor'
	const coach = '/coach'
	const skipass = '/skipass'
	const path: pathType = { 
		[visitor]: 26,
		[coach]: 26,
		[skipass]: 5
	}

	const pagination = (e: ChangeEvent<unknown>, page: number) => {
		requests[location.pathname](dispatch, page)
	}
	
	const numberPages = path[location.pathname] ? Math.ceil(getquantity / path[location.pathname]) : 0

	return (
		<Stack>
			<Navigation onChange={pagination} count={numberPages as number} hidePrevButton hideNextButton />
		</Stack>
	)
}


