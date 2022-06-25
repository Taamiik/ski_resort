import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import styles from './header.module.scss';
import { setArrayVisitors } from '../../../../store/visitors/actions';
import { setArrayCoaches } from '../../../../store/coaches/actions';
import { setArraySkipass } from '../../../../store/skipass/actions';
import { Visitor, Coach, SkiPass } from '../../../../types/types';
import { fetchLoggingOut } from '../../../../store/authorizationBlock/actions';
import { ExitToApp } from '../../../../assets/icons';
import { authorizationSelector } from '../../../../store/authorizationBlock/selector';
import { useTypedUseSelector } from '../../../../hooks/useTypedUseSelector';
import Input from '../../Input/Input';


const Header: React.FC = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { isAuthorization } = useTypedUseSelector(state => authorizationSelector(state))
	
	const handleClick = ()=> {
		dispatch(fetchLoggingOut())
		dispatch(setArrayVisitors([] as Visitor[]))
		dispatch(setArrayCoaches([] as Coach[]))
		dispatch(setArraySkipass([] as SkiPass[]))
	}
	
	useEffect(() => {
		!localStorage.getItem('token') && navigate('/login')
	}, [isAuthorization, dispatch, navigate])
	
	return (
		<Grid className={styles.gridContainer} container>
			<Grid className={styles.menu}>
				<Typography className={styles.typography}>
					<MenuIcon className={styles.menu_icon}/>
					<Link className={styles.home} to='/'>Горнолыжный курорт</Link>
				</Typography>
			</Grid>
			
			<Input />
			
			<Grid className={styles.exit}>
				<Typography variant="h6">
					<Button onClick={handleClick} className={styles.exit_button} startIcon={<ExitToApp />} >
						Выход
					</Button>
				</Typography>
			</Grid>
		</Grid>
	)
}

export default React.memo(Header)
