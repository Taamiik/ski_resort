import React from 'react';

import styles from './logo.module.scss';
import { Image } from '../../../../assets/images';

const Logo: React.FC = () => {
	
	return (
		<div className={styles.logo}>
			<img className={styles.image} src={Image} alt='logo' />
			<h3 className={styles.account}> Личный кабинет </h3>
			<h2 className={styles.title} > Горнолыжного курорта </h2>
		</div>
	)
}

export default React.memo(Logo)