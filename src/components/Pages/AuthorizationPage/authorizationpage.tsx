import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import styles from './authorizationpage.module.scss';
import { Background } from '../../../assets/images';
import { authorizationSelector } from '../../../store/authorizationBlock/selector';
import { useTypedUseSelector } from '../../../hooks/useTypedUseSelector';
import IconLinks from '../../Base/Login/IconLinks/IconLinks';
import Logo from '../../Base/Login/Logo/Logo';
import FormAuthorization from '../../Base/Login/FormAuthorization/formAuthorization';


const AuthorizationPage: React.FC = ()=> {
	const { isAuthorization } = useTypedUseSelector(state => authorizationSelector(state))
	const navigate = useNavigate()
	
	useEffect(() => {
		localStorage.getItem('token') && navigate('/')
	}, [isAuthorization, navigate])

	return (
		<div className={styles.wrapper}>
			<img className={styles.wrapper__background} src={Background} alt='start page' />
			<div className={styles.wrapper__authorization}>
				<Logo />
				
				<FormAuthorization />
				
				<IconLinks />
			</div>
		</div>
	)
}

export default AuthorizationPage;