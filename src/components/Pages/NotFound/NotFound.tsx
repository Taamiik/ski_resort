import React from 'react';
import { Link } from 'react-router-dom';

import styles from './notfound.module.scss';


export const NotFound: React.FC = () => {


	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<h1 className={styles.status}>404</h1>
				<h2 className={styles.errorText}>Страница не найдена</h2>
				<Link to='/' className={styles.home}>Вернуться на главную</Link>
			</div>
		</div>
	)
}
