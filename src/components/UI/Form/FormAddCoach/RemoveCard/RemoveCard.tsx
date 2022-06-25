import React, { MouseEvent } from 'react';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';

import styles from './removecard.module.scss';
import { Close } from '../../../../../assets/icons';
import { fetchRemoveCoach } from '../../../../../store/coaches/actions';
import { PayloadProps } from '../../../../../types/types';

interface Props {
	id?: number | undefined,
	fullname: string,
	photo: string | null,
	sportType: string,
	closedForm: () => void,
	paramPage: PayloadProps
}

export const RemoveCard: React.FC<Props> = ({ paramPage, closedForm, ...data }) => {
	const dispatch = useDispatch()
	
	const returnSportType = () => {
		return <p className={styles.sportType}>{data.sportType}</p>
	}

	const confirmDeletion = () => {
		return (
			<div className={styles.cardData}>
				<p>Вы уверены, что хотите удалить карточку этого инструктора?</p>
			</div>
		)
	}
	
	const removeCard = () => {
		dispatch(fetchRemoveCoach([data.id!, paramPage]))
		closedForm()
	}
	
	const stopPropagation = (e: MouseEvent) => {
		e.stopPropagation()
	}
	
	return (
		<div onClick={stopPropagation} className={styles.wrapper}>
			<div className={styles.header}>
				<div><span>Удаление инструктора</span></div>
				<div onClick={closedForm} className={styles.closeIcon}><Close /></div>
			</div>
			<div className={styles.wrapper_image}>
				<img src={data.photo!} className={styles.avatar} alt='avatar' />
			</div>
			<h1 className={styles.wrapper_name}>{data.fullname}</h1>
			{returnSportType()}
			{confirmDeletion()}
			<div className={styles.button}>
				<Button onClick={removeCard} type="submit" className={styles.buttonStyle}>
					Ок
				</Button>
			</div>
		</div>
	)
}