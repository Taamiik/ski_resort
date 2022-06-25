import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import {useFormik} from 'formik';
import * as Yup from "yup";
import { useDispatch } from 'react-redux';

import styles from './editcard.module.scss';
import { Close } from '../../../../../assets/icons';
import { Visitor, Coach, PayloadProps } from '../../../../../types/types';
import { Input } from '../../../Field/Input';
import { Button } from '../../../Button/Button';
import { fetchSendEditedCardSkipass } from '../../../../../store/skipass/actions';
import { fetchReturnListVisitors } from '../../../../../store/coaches/actions';
import { useTypedUseSelector } from '../../../../../hooks/useTypedUseSelector';
import { returnListVisitors } from '../../../../../store/coaches/selector';
import { Select } from '../../../Select/Select';
import { Calendar } from '../../../Calendar/Calendar';

interface Props {
	number: number,
	expirationTime: string,
	price: number,
	closedForm: () => void,
	paramPage: PayloadProps
}

export const EditCard: React.FC<Props> = ({ paramPage, closedForm, ...data }) => {
	const dispatch = useDispatch();
	const visitors = useTypedUseSelector(state => returnListVisitors(state));
	const [showList, setShowList] = useState<boolean>(false);
	const [visitorName, setVisitorName] = useState<string>('');
	const [visitorData, setVisitorData] = useState<Visitor>(); 
	const [skipassTime, setSkipassTime] = useState<Date | string>('')
	const [activeCalendar, setActiveCalendar] = useState<boolean>(false)
	const [fieldDate, setFieldDate] = useState<string>('')
	
	useEffect(()=> {
		dispatch(fetchReturnListVisitors('visitor'))
	}, [dispatch])
	
	const chooseVisitor = (visitor: Visitor | Coach) => {
		setVisitorName(visitor.fullname)
		setVisitorData(visitor as Visitor)
	}
	
	const formik = useFormik({
		initialValues: {
			number: String(data.number),
			expirationTime: data.expirationTime,
			price: String(data.price)
		},
		validationSchema: Yup.object({
			number: Yup.number().required('Обязательное поле'),
			expirationTime: Yup.string().required('Обязательное поле'),
			price: Yup.number().required('Обязательное поле')
		}),
		onSubmit: (value) => {
			const data = {
				...value,
				number:Number(value.number),
				price:Number(value.price),
				visitor:visitorData
			}
			dispatch(fetchSendEditedCardSkipass([data, paramPage]))
			closedForm()
		}
	})
	
	const calendar = activeCalendar && 
		<Calendar 
			setActiveCalendar={setActiveCalendar} 
			setSkipassTime={setSkipassTime}
			fieldDate={fieldDate}
		/>
	
	const hideCoachesList = (e: MouseEvent<HTMLInputElement>) => {
		setShowList(false)
		e.stopPropagation()
	}
	
	const hideBlockUsers = (e: MouseEvent<HTMLInputElement>) => {
		setShowList(true)
		e.stopPropagation()
	}
	
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setVisitorName(e.target.value)
		if (visitorName.length === 1) return setShowList(false)
	}
	
	const showCalendar = (e: MouseEvent) => {
		setActiveCalendar(true)
		e.stopPropagation()
	}
	
	const numberCard = formik.touched.number && formik.errors.number
	const price = formik.touched.price && formik.errors.price
	
	const select = showList && <Select choose={(prop: Visitor | Coach) => chooseVisitor(prop)} array={visitors} />
	const changeSkipassTime = (e: ChangeEvent<HTMLInputElement>) => setSkipassTime(e.target.value)
	
	return (
		<div onClick={hideCoachesList} className={styles.formWrapper}>
			<div className={styles.formWrapper_header}>
				<div><span>Редактировать карточку ски-пасса</span></div>
				<div className={styles.iconclose}>
					<Close onClick={closedForm} />
				</div>
			</div>
			
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
					<Button value='Редактировать' />
					{calendar}
				</form>
			</div>
		</div>
	)
}