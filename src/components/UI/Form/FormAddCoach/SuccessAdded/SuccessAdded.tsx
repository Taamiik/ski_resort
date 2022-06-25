import React, { MouseEvent } from 'react';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';

import styles from './successadded.module.scss';
import { Edit, Delete } from '../../../../../assets/icons';
import { setNewCreateCoach, setEditCardCoach, setFindCoachFullname } from '../../../../../store/coaches/actions';
import { Coach, Visitor, SkiPass } from '../../../../../types/types';

interface Props {
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
	closedForm: () => void
}

export const SuccessAdded: React.FC<Props> = ({ closedForm, ...data }) => {
	const dispatch = useDispatch()

	const info = (className: string, innerhtml: string | undefined) => (
		<p className={className}>{innerhtml}</p>
	)

	const stoppropagation = (e: MouseEvent) => e.stopPropagation()
	
	const removeCard = () => {
		dispatch(setNewCreateCoach({flag: false, data: {} as Coach}))
		dispatch(setFindCoachFullname({flag: true, data}))
	}
	
	const editCard = () => {
		dispatch(setNewCreateCoach({flag: false, data: {} as Coach}))
		dispatch(setEditCardCoach({flag: true, data: data}))
	}
	
	return (
		<div onClick={stoppropagation} className={styles.wrapper}>
			<div className={styles.editAndDelete}>
				<div>
					<span>Карточка инструктора</span>
				</div>
				<div>
					<Edit onClick={editCard}/>
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
				{info(styles.header, 'Пол')}
				{info(styles.title, data.sex)}
				{info(styles.header, 'Назначенный посетитель')}
				{info(styles.title, data?.visitor?.fullname)}
			<div className={styles.button}>
				<Button onClick={closedForm} type="submit" className={styles.buttonStyle}>
					Ок
				</Button>
			</div>
		</div>
	)
}