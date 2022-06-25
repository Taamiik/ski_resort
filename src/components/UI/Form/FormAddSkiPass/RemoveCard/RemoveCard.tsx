import React, { MouseEvent } from 'react';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';

import styles from './removecard.module.scss';
import { Close } from '../../../../../assets/icons';
import { fetchRemoveSkipass } from '../../../../../store/skipass/actions';
import { PayloadProps } from '../../../../../types/types';

interface Props {
	number: number,
	closedForm: () => void,
	paramPage: PayloadProps
}

export const RemoveCard: React.FC<Props> = ({ paramPage, closedForm, ...data }) => {
	const dispatch = useDispatch()

	const removeCard = () => {
		dispatch(fetchRemoveSkipass([data.number, paramPage]))
		closedForm()
	}

	const stopPropagation = (e: MouseEvent) => e.stopPropagation()

	return (
		<div onClick={stopPropagation} className={styles.wrapper}>
			<div className={styles.header}>
				<div><span>Удаление ски-пасса</span></div>
				<div onClick={closedForm} className={styles.closeIcon}><Close /></div>
			</div>
			<div className={styles.info}>
				<p className={styles.title}>Номер ски-пасса:</p>
				<p className={styles.numberSkipass}>{data.number}</p>
			</div>
			<div className={styles.confirmation}>
				<p>Вы уверены, что хотите удалить карточку этого ски-пасса?</p>
			</div>
			<div className={styles.button}>
				<Button onClick={removeCard} type="submit" className={styles.buttonStyle}>
					Ок
				</Button>
			</div>
		</div>
	)
}