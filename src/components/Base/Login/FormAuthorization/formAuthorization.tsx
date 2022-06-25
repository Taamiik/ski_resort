import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import styles from './formauthorization.module.scss';
import { fetchAuthorization } from '../../../../store/authorizationBlock/actions';
import { Input } from '../../../UI/Field/Input';

const FormAuthorization: React.FC = ()=> {
	const dispatch = useDispatch()
  
	const formik = useFormik({
		initialValues: {
		  login: '',
		  password: ''
		},
		validationSchema: Yup.object({
		  login: Yup.string().max(10, 'Логин должен быть не больше 10 символов').required('Обязательное поле'),
		  password: Yup.string().min(3, 'Пароль должен быть не меньше 3 символов').required('Обязательное поле')
		}),
		onSubmit: ({login, password}) => {
			dispatch(fetchAuthorization({login, password}))
		}
	})

	const validateLogin = formik.touched.login && formik.errors.login
	const validatePassword = formik.touched.password && formik.errors.password

	return (
		<form onSubmit={formik.handleSubmit}>
			<Container maxWidth="xs">
				<Box className={styles.fields}>
					<Input 
						fieldtype='text'
						id='login'
						placeholder={validateLogin ? validateLogin : 'Имя*'}
						name='login'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.login}
						validate={formik.touched.login && formik.errors.login}
					/>
					<Input 
						fieldtype='password'
						id='password'
						placeholder={validatePassword ? validatePassword : 'Пароль*'}
						name='password'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password}
						validate={formik.touched.password && formik.errors.password}
					/>
					<Button type="submit" className={styles.buttonStyle}>
						Войти
					</Button>
				</Box>
			</Container>
		</form>
	)
}

export default FormAuthorization;