import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';

import styles from './navigation.module.scss';
import { fetchUpLoadPhotoAdmin } from '../../../../store/settings/actions';
import { returnListCoaches } from '../../../../store/settings/selector';
import { useTypedUseSelector } from '../../../../hooks/useTypedUseSelector';

const Navigation: React.FC = ()=> {
	const dispatch = useDispatch()
	const photo = useTypedUseSelector(state => returnListCoaches(state))
	
	useEffect(() => {
		dispatch(fetchUpLoadPhotoAdmin())
	}, [dispatch])
	
	return (
		<Box className={styles.wrapper}>
			<Avatar src={photo} className={styles.avatar} />
			<Typography className={styles.fullname}>
				Ольга Терентьева
			</Typography>
			<Typography className={styles.role}>
				Администратор
			</Typography>
		</Box> 
	)
}

export default React.memo(Navigation)
