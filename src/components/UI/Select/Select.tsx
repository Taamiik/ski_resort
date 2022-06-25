import React from 'react';
import Avatar from '@mui/material/Avatar';

import styles from './select.module.scss';
import { Types } from '../../../types/types';


interface Props {
	array: Types['types'][],
	choose: (prop: Types['types']) => void
}

export const Select: React.FC<Props> = ({ array, choose })=> {
	
	const select = array.map((prop: Types['types'], index: number) => (
		<div key={index} onClick={() => choose(prop)} className={styles.card}>
			<div className={styles.image}>
				<Avatar src={prop.photo!} />
			</div>
			<div>
				<h4>{prop.fullname}</h4>
				<p className={styles.experience}>{prop.sportType}.Опыт 5 лет</p>
			</div>
		</div>
	))
	
	return (
		<div className={styles.list}>
			{select}
		</div>
	)
}