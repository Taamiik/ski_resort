import React from 'react';

import styles from './formtitle.module.scss';
import { Close } from '../../../../assets/icons';


interface Props {
	closedForm: () => void,
	title: string
}

export const FormTitle: React.FC<Props> = ({ closedForm, title }) => {


	return (
		<div className={styles.formHeader}>
			<div>
				<span>{title}</span>
			</div>
			<div onClick={closedForm} className={styles.iconclose}>
				<Close />
			</div>
		</div>
	)
}

