import React, { useState, MouseEvent, ChangeEvent } from 'react';
import * as Yup from "yup";
import {useFormik} from 'formik';
import { useDispatch } from 'react-redux';

import styles from './formsettings.module.scss';
import { Admin } from '../../../../types/types';
import { Input } from '../../Field/Input';
import { Button } from '../../Button/Button';
import { Picture } from '../Picture/Picture';
import { FormTitle } from '../FormTitle/FormTitle';
import { fetchEditAdmin } from '../../../../store/settings/actions';

interface Props {
	closedForm: () => void
}

export const FormSettings: React.FC<Props> = ({ closedForm }) => {
	const dispatch = useDispatch()
	const roles = ['Администратор', 'Модератор']
	const [imageVisitor, setImageVisitor] = useState<string | ArrayBuffer | null>(null)
	const [showList, setShowList] = useState<boolean>(false)
	const [adminData, setAdminData] = useState<string>('')

	const formik = useFormik({
		initialValues: {
			id: Math.random(),
			username: '',
			surname: '',
			password: ''
		},
		validationSchema: Yup.object({
			username: Yup.string().required('Обязательное поле*')
		}),
		onSubmit: (value) => {
			const data = {
				...value,
				roles: [{name: adminData}] as Admin['roles'],
				photo: imageVisitor as string
			}
			dispatch(fetchEditAdmin(data))
		}
	})

	const chooseRole = (prop: string) => setAdminData(prop)
	
	const select = showList && 
		<div className={styles.select}>
			{roles.map((prop: string, i:number) => (
				<p key={i} onClick={() => chooseRole(prop)} className={styles.role}>{prop}</p>
			))}
		</div>


	const hideCoachesList = (e: MouseEvent) => {
		setShowList(false)
		e.stopPropagation()
	}
	
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setAdminData(e.target.value)
		adminData.length === 1 && setShowList(false)
	}
	
	const hideBlock = (e: MouseEvent) => {
		setShowList(true)
		e.stopPropagation()
	}

	return (
		<div onClick={hideCoachesList} className={styles.formWrapper}>
			<FormTitle closedForm={closedForm} title='Личный кабинет администратора' />
			
			<Picture image={imageVisitor} setImage={setImageVisitor} />

			<form onSubmit={formik.handleSubmit}>
				<Input 
					fieldtype='text'
					id='username'
					placeholder='Имя*'
					name='username'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.username}
					validate={formik.touched.username && formik.errors.username}
				/>
				<Input 
					fieldtype='text'
					id='surname'
					placeholder='Фамилия*'
					name='surname'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.surname}
				/>
				<Input 
					placeholder='Роль*'
					onChange={handleChange}
					onClick={hideBlock}
					value={adminData}
				/>
					{select}
				<Button value='ОК' />
			</form>
		</div>
	)
}
