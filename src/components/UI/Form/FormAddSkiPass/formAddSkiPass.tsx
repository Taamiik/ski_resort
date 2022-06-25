import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import * as Yup from "yup";
import {useFormik} from 'formik';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import styles from './formaddskipass.module.scss';
import { Visitor, Coach, PayloadProps } from '../../../../types/types';
import { fetchCreateSkipass } from '../../../../store/skipass/actions';
import { fetchReturnListVisitors } from '../../../../store/coaches/actions';
import { useTypedUseSelector } from '../../../../hooks/useTypedUseSelector';
import { returnListVisitors } from '../../../../store/coaches/selector';
import { Input } from '../../Field/Input';
import { Button } from '../../Button/Button';
import { Select } from '../../Select/Select';
import { Calendar } from '../../Calendar/Calendar';
import { FormTitle } from '../FormTitle/FormTitle';

interface Props {
	closedForm: () => void,
	requests: {[value: string]: (dispatch: Dispatch, page?: number | undefined) => void},
	paramPage: PayloadProps
}

export const FormAddSkipass: React.FC<Props> = ({ paramPage, closedForm, requests }) => {
	const dispatch = useDispatch()
	const location = useLocation()
	const visitors = useTypedUseSelector(state => returnListVisitors(state))
	const [visitorName, setVisitorName] = useState<string>('')
	const [visitorData, setVisitorData] = useState<Visitor>()
	const [showList, setShowList] = useState<boolean>(false)
	const [skipassTime, setSkipassTime] = useState<Date | string>('')
	const [activeCalendar, setActiveCalendar] = useState<boolean>(false)
	const [fieldDate, setFieldDate] = useState<string>('')

	useEffect(()=> {
		dispatch(fetchReturnListVisitors('visitor'))
	}, [dispatch])

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setVisitorName(e.target.value)
		if (visitorName.length === 1) return setShowList(false)
	}
  
	const chooseVisitor = (visitor: Visitor | Coach) => {
		setVisitorName(visitor.fullname)
		setVisitorData(visitor as Visitor)
	}
	
	
	const formik = useFormik({
		initialValues: {
			number: '',
			expirationTime: '',
			price: ''
		},
		validationSchema: Yup.object({
			number: Yup.number().required('Обязательное поле'),
			price: Yup.number().required('Обязательное поле')
		}),
		onSubmit: (value) => {
			const data = {
				...value,
				number:Number(value.number),
				expirationTime: skipassTime as string,
				price:Number(value.price),
				visitor:visitorData,
			}
			dispatch(fetchCreateSkipass([data, paramPage]))
			requests[location.pathname](dispatch)
			closedForm()
		}
	})
	
	const numberCard = formik.touched.number && formik.errors.number
	const price = formik.touched.price && formik.errors.price

	const calendar = activeCalendar && 
		<Calendar 
			setActiveCalendar={setActiveCalendar} 
			setSkipassTime={setSkipassTime}
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
	const changeSkipassTime = (e: ChangeEvent<HTMLInputElement>) => setSkipassTime(e.target.value)
  
	return (
		<div onClick={hideCoachesList} className={styles.formWrapper}>
			<FormTitle closedForm={closedForm} title='Добавить ски-пасс' />
			
			<div className={styles.formWrapper_body}>
				<form onSubmit={formik.handleSubmit}>
					<Input 
						fieldtype='text'
						id='number'
						placeholder='Номер ски-пасса*'
						name='number'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.number}
						validate={numberCard}
					/>
					<Input 
						fieldtype='date'
						id='expirationTime'
						placeholder='Конец действия ски-пасса*'
						name='expirationTime'
						onChange={changeSkipassTime}
						value={skipassTime as string}
						date={true}
						showCalendar={showCalendar}
						setFieldDate={setFieldDate}
					/>
					<Input 
						fieldtype='text'
						id='price'
						placeholder='Цена*'
						name='price'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.price}
						validate={price}
					/>
					<Input 
						placeholder='Назначить посетителя*'
						onChange={handleChange}
						onClick={hideBlockUsers}
						value={visitorName}
					/>
						{select}
					<Button value='Добавить' />
					{calendar}
				</form>
			</div>
		</div>
	)
}