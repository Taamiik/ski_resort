import React, { MouseEvent } from 'react';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';

import styles from './successadded.module.scss';
import { Edit, Delete } from '../../../../../assets/icons';
import { setNewCreateVisitor, setEditCardVisitor, setFindVisitorFullname } from '../../../../../store/visitors/actions';
import { Visitor, Coach } from '../../../../../types/types';

interface Props {
	id: number,
	fullname: string,
	photo: string | null,
	sportType: string,
	dateOfBirth: string,
	skiPassExpirationTime: string,
	coach?: Coach,
	dateOfVisit?: string,
	closedForm: () => void
}

export const SuccessAdded: React.FC<Props> = ({ closedForm, ...data }) => {
	const dispatch = useDispatch()

	const info = (className: string, innerhtml: string) => (
		<p className={className}>{innerhtml ? innerhtml: 'not specified'}</p>
	)

	const stoppropagation = (e: MouseEvent) => e.stopPropagation()
	
	const removeCard = () => {
		dispatch(setNewCreateVisitor({flag: false, data: {} as Visitor}))
		dispatch(setFindVisitorFullname({flag: true, data}))
	}
	
	const editCard = () => {
		dispatch(setNewCreateVisitor({flag: false, data: {} as Visitor}))
		dispatch(setEditCardVisitor({flag: true, data}))
	}

	return (
		<div onClick={stoppropagation} className={styles.wrapper}>
			<div className={styles.editAndDelete}>
				<div>
					<span>Карточка посетителя</span>
				</div>
				<div>
					<Edit onClick={editCard} />
					<Delete onClick={removeCard} />
				</div>
			</div>
			<div className={styles.wrapper_image}>
				<img src={data.photo!} className={styles.avatar} alt='avatar' />
			</div>
				<h1 className={styles.wrapper_name}>{data.fullname}</h1>
				{info(styles.sportType, data.sportType)}
				{info(styles.header, 'Дата рождения')}
				{info(styles.title, data.dateOfBirth)}
				{info(styles.header, 'Дата окончания ски-пасса')}
				{info(styles.title, data.skiPassExpirationTime)}
				{info(styles.header, 'Назначенный тренер')}
				{info(styles.title, data.coach?.fullname!)}
			<div className={styles.button}>
				<Button onClick={closedForm} type="submit" className={styles.buttonStyle}>
					Ок
				</Button>
			</div>
		</div>
	)
}