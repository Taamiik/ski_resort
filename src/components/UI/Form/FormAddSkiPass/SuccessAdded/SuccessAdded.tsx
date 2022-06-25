import React, { MouseEvent } from 'react';
import Button from '@mui/material/Button';

import styles from './successadded.module.scss';
import { Close } from '../../../../../assets/icons';
import { Visitor } from '../../../../../types/types';

interface Props {
	number: number,
	expirationTime: string,
	price:number,
	visitor?: Visitor,
	closedForm: () => void
}

export const SuccessAdded: React.FC<Props> = ({ closedForm, ...data }) => {
	const info = (className: string, innerhtml?: string | number, rub?: string) => (
		<p className={className}>{innerhtml}{rub}</p>
	)
	
	const stoppropagation = (e: MouseEvent) => e.stopPropagation()
	
	return (
		<div onClick={stoppropagation} className={styles.wrapper}>
			<div className={styles.editAndDelete}>
				<div>
					<span>Карточка ски-пасса</span>
				</div>
				<div>
					<Close onClick={closedForm}/>
				</div>
			</div>
				<h1 className={styles.wrapper_name}>{data.number}</h1>
				{info(styles.header, 'Время действия')}
				{info(styles.title, data.expirationTime)}
				{info(styles.header, 'Цена')}
				{info(styles.title, data.price, ' р')}
				{info(styles.header, 'Назначенный посетитель')}
				{info(styles.title, data.visitor?.fullname)}
			<div className={styles.button}>
				<Button onClick={closedForm} type="submit" className={styles.buttonStyle}>
					Ок
				</Button>
			</div>
		</div>
	)
}