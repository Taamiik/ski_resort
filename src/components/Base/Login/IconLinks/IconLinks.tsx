import React from 'react';
import { Icon32LogoVk } from '@vkontakte/icons';

import styles from './iconlinks.module.scss';
import { GoogleIcon, FacebookIcon } from '../../../../assets/icons';


const IconLinks: React.FC = ()=> {
	return (			
		<div>	
			<div className={styles.wrapper}>
				<div className={styles.icons}>
					<GoogleIcon className={styles.icon}/>
				</div>
				<div className={styles.icons}>
					<FacebookIcon className={styles.icon}/>
				</div>
				<div className={styles.icons}>
					<Icon32LogoVk className={styles.icon}/>
				</div>
			</div>
		</div>
	)
}

export default IconLinks;