import React from 'react';

import styles from './button.module.scss';
import { Add } from '../../../assets/icons';

interface Props {
	value?: string,
	addButton?: boolean,
	setModal?: () => void
}

export const Button: React.FC<Props> = ({value, addButton, setModal})=> {
	
	const returnButton = () => {
		if (addButton) {
			return (
				<div>
					<button className={styles.addbutton} onClick={setModal}>
						<Add />
						<span>Добавить новый</span>
					</button>
				</div>
			)
		}
		return (
			<div className={styles.buttonWrapper}>
				<button className={styles.button}>{value}</button>
			</div>
		)
	}
	
	return (
		<div>
			{returnButton()}
		</div>
	)
}