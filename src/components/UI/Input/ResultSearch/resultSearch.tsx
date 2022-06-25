import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import styles from './resultsearch.module.scss';
import { Coach, Visitor } from '../../../../types/types';
import { setNewCreateVisitor, fetchFindVisitorFullname } from '../../../../store/visitors/actions';
import { setNewCreateCoach, fetchFindCoachFullname } from '../../../../store/coaches/actions';
import { returnFoundVisitor } from '../../../../store/visitors/selector';
import { returnFoundCoach } from '../../../../store/coaches/selector';
import { useTypedUseSelector } from '../../../../hooks/useTypedUseSelector';

interface Props<T> {
	data: T[]
}

const ResultSearch: React.FC<Props<Coach | Visitor>> = ({ data }) => {
	const dispatch = useDispatch()
	const visitor = useTypedUseSelector(state => returnFoundVisitor(state))
	const coach = useTypedUseSelector(state => returnFoundCoach(state))
	
	useEffect(() => {
		if (Object.keys(visitor).length > 0) {
			dispatch(setNewCreateCoach({flag: false, data: {} as Coach}))
			dispatch(setNewCreateVisitor({flag: true, data: visitor as Visitor}))
		}
		if (Object.keys(coach).length > 0) {
			dispatch(setNewCreateVisitor({flag: false, data: {} as Visitor}))
			dispatch(setNewCreateCoach({flag: true, data: coach as Coach}))
		}
	}, [visitor, coach, dispatch])

	const displayUser = () => {
		dispatch(fetchFindVisitorFullname(data[0].fullname))
		dispatch(fetchFindCoachFullname(data[0].fullname))
	}

	const users = data.map((user: Coach | Visitor, index: number) => {
		return <p key={index} onClick={displayUser} className={styles.user}>{user.fullname}</p>
	})
	
	return (
		<div className={styles.wrapper}>
			{users}
		</div>
	)
}

export default ResultSearch;