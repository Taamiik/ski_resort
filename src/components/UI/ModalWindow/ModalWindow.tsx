import React from 'react';
import styles from './modalwindow.module.scss';


interface Props {
	closedForm: () => void
}

export const ModalWindow: React.FC<Props> = ({closedForm, children}) => {
	return (
		<div className={styles.wrapper}>
			<div onClick={closedForm} className={styles.modalWindow}>
				{children}
			</div>
		</div>
	)
}