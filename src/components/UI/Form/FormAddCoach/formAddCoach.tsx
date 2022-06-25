import React, { useState, ChangeEvent, useEffect, MouseEvent } from 'react';
import * as Yup from "yup";
import {useFormik} from 'formik';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import styles from './formaddcoach.module.scss';
import { Visitor, Coach, PayloadProps } from '../../../../types/types';
import { fetchReturnListVisitors, fetchCreateCoach } from '../../../../store/coaches/actions';
import { useTypedUseSelector } from '../../../../hooks/useTypedUseSelector';
import { returnListVisitors } from '../../../../store/coaches/selector';
import { Input } from '../../Field/Input';
import { Button } from '../../Button/Button';
import { Select } from '../../Select/Select';
import { Picture } from '../Picture/Picture';
import { FormTitle } from '../FormTitle/FormTitle';
import { Calendar } from '../../Calendar/Calendar';

interface Props {
	closedForm: () => void,
	requests: {[value: string]: (dispatch: Dispatch, page?: number | undefined) => void},
	paramPage: PayloadProps
}

export const FormAddCoach: React.FC<Props> = ({ paramPage, closedForm, requests }) => {
	const dispatch = useDispatch();
	const location = useLocation();
	const visitors = useTypedUseSelector(state => returnListVisitors(state));
	const [visitorName, setVisitorName] = useState<string>('');
	const [visitorData, setVisitorData] = useState<Visitor>();  
	const [imageCoach, setImageCoach] = useState<string | ArrayBuffer | null>(null);
	const [showList, setShowList] = useState<boolean>(false);
	const [birthDay, setBirthDay] = useState<Date | string>('')
	const [activeCalendar, setActiveCalendar] = useState<boolean>(false)
	const [fieldDate, setFieldDate] = useState<string>('')
	
	useEffect(()=> {
		dispatch(fetchReturnListVisitors('visitor'))
	}, [dispatch])


	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setVisitorName(e.target.value)
		visitorName.length === 1 && setShowList(false)
	}
  
	const chooseVisitor = (visitor: Visitor | Coach) => {
		setVisitorName(visitor.fullname)
		setVisitorData(visitor as Visitor)
	}
	
	const formik = useFormik({
		initialValues: {
			id:Math.random(),
			fullname: '',
			dateOfBirth: '',
			sex:'',
			sportType: '',
			category:'',
			workExperience:''
		},
		validationSchema: Yup.object({
			fullname: Yup.string().required('Обязательное поле*'),
			sex: Yup.string().required('Обязательное поле*'),
			sportType: Yup.string().required('Обязательное поле*'),
			category: Yup.string().required('Обязательное поле*'),
			workExperience: Yup.string().required('Обязательное поле*')
		}),
		onSubmit: (value) => {
			const data = {
				...value,
				dateOfBirth: birthDay as string, 
				skiPass: null,
				visitor: visitorData,
				photo: imageCoach as string
			}
			dispatch(fetchCreateCoach([data, paramPage]))
			requests[location.pathname](dispatch)
			closedForm()
		}
	})
  
	const fullname = formik.touched.fullname && formik.errors.fullname
	const sex = formik.touched.sex && formik.errors.sex
	const sportType = formik.touched.sportType && formik.errors.sportType
	const category = formik.touched.category && formik.errors.category
	const workExperience = formik.touched.workExperience && formik.errors.workExperience
  
	const calendar = activeCalendar && 
		<Calendar 
			setActiveCalendar={setActiveCalendar} 
			setBirthDay={setBirthDay}
			fieldDate={fieldDate}
		/>
	
	const hideCoachesList = (e: MouseEvent<HTMLInputElement>) => {
		setShowList(false)
		setActiveCalendar(false)
		e.stopPropagation()
	}
	const hideBlockUsers = (e: MouseEvent<HTMLInputElement>) => {
		setShowList(true)
		e.stopPropagation()
	}
	
	const showCalendar = (e: MouseEvent) => {
		setActiveCalendar(true)
		e.stopPropagation()
	}
	const select = showList && <Select choose={(prop: Visitor | Coach) => chooseVisitor(prop)} array={visitors} />
	
	const changeBirthday = (e: ChangeEvent<HTMLInputElement>) => setBirthDay(e.target.value)
	
	return (
		<div onClick={hideCoachesList} className={styles.formWrapper}>
			<FormTitle closedForm={closedForm} title='Добавить инструктора' />
			
			<Picture image={imageCoach} setImage={setImageCoach} />
			
			<div className={styles.formWrapper_body}>
				<form onSubmit={formik.handleSubmit}>
					<Input 
						fieldtype='text'
						id='fullname'
						placeholder='ФИО*'
						name='fullname'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.fullname}
						validate={fullname}
					/>
					<Input 
						fieldtype='date'
						id='dateOfBirth'
						placeholder='День рождения*'
						name='dateOfBirth'
						onChange={changeBirthday}
						value={birthDay as string}
						date={true}
						showCalendar={showCalendar}
						setFieldDate={setFieldDate}
					/>
					<Input 
						fieldtype='text'
						id='sex'
						placeholder='Пол*'
						name='sex'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.sex}
						validate={sex}
					/>
					<Input 
						fieldtype='text'
						id='sportType'
						placeholder='Вид спорта*'
						name='sportType'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.sportType}
						validate={sportType}
					/>
					<Input 
						placeholder='Назначить посетителя*'
						onChange={handleChange}
						onClick={hideBlockUsers}
						value={visitorName}
					/>
						{select}
					<Input 
						fieldtype='text'
						id='category'
						placeholder='Категория*'
						name='category'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.category}
						validate={category}
					/>
					<Input 
						fieldtype='text'
						id='workExperience'
						placeholder='Опыт работы*'
						name='workExperience'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.workExperience}
						validate={workExperience}
					/>
					<Button value='Добавить' />
					{calendar}
				</form>
			</div>
		</div>
	)
}