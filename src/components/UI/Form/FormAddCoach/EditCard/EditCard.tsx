import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import * as Yup from "yup";
import {useFormik} from 'formik';
import { useDispatch } from 'react-redux';

import styles from './editcard.module.scss';
import { Coach, Visitor, SkiPass, PayloadProps } from '../../../../../types/types';
import {
	fetchReturnListVisitors,
	fetchSendEditedCardCoach,
	setEditCardCoach,
	setFindCoachFullname
} from '../../../../../store/coaches/actions';
import { useTypedUseSelector } from '../../../../../hooks/useTypedUseSelector';
import { returnListVisitors } from '../../../../../store/coaches/selector';
import { Close, Delete } from '../../../../../assets/icons';
import { Input } from '../../../Field/Input';
import { Button } from '../../../Button/Button';
import { Select } from '../../../Select/Select';
import { Picture } from '../../Picture/Picture';
import { Calendar } from '../../../Calendar/Calendar';

interface Props {
	id?: number | undefined,
	fullname: string,
	skiPass: SkiPass | null,
	category: string,
	sportType: string,
	workExperience: string,
	dateOfBirth: string,
	sex: string,
	visitor?: Visitor,
	photo: string | null,
	closedForm: () => void,
	paramPage: PayloadProps
}

export const EditCard: React.FC<Props> = ({ paramPage, closedForm, ...data }) => {
	const dispatch = useDispatch();
	const visitors = useTypedUseSelector(state => returnListVisitors(state));
	const [visitorData, setVisitorData] = useState<Visitor>();  
	const [visitorName, setVisitorName] = useState<string>('');
	const [imageCoach, setImageCoach] = useState<string | ArrayBuffer | null>(null);
	const [showList, setShowList] = useState<boolean>(false);
	const [birthDay, setBirthDay] = useState<Date | string>('')
	const [activeCalendar, setActiveCalendar] = useState<boolean>(false)
	const [fieldDate, setFieldDate] = useState<string>('')
	
	useEffect(()=> {
		setImageCoach(data.photo)
		data.visitor && setVisitorName(data.visitor.fullname)
		setVisitorData(data.visitor)
		dispatch(fetchReturnListVisitors('visitor'))
	}, [data.photo, data.visitor, setImageCoach, dispatch])
	
  
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
			id: data.id,
			fullname: data.fullname,
			dateOfBirth: data.dateOfBirth,
			sex: data.sex,
			sportType: data.sportType,
			category: data.category,
			workExperience: data.workExperience,
		},
		validationSchema: Yup.object({
			fullname: Yup.string().required('Обязательное поле*'),
			dateOfBirth: Yup.string().required('Обязательное поле*'),
			sex: Yup.string().required('Обязательное поле*'),
			sportType: Yup.string().required('Обязательное поле*'),
			category: Yup.string().required('Обязательное поле*'),
			workExperience: Yup.string().required('Обязательное поле*')
		}),
		onSubmit: (value) => {
			const data = {
				...value,
				skiPass: null,
				visitor: visitorData,
				photo: imageCoach as string
			}
			dispatch(fetchSendEditedCardCoach([data, paramPage]))
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
		e.stopPropagation()
	}
	const hideBlockUsers = (e: MouseEvent<HTMLInputElement>) => {
		setShowList(true)
		e.stopPropagation()
	}
	
	const removeCard = () => {
		dispatch(setEditCardCoach({flag: false, data: {} as Coach}))
		dispatch(setFindCoachFullname({flag: true, data}))
	}
	
	const showCalendar = (e: MouseEvent) => {
		setActiveCalendar(true)
		e.stopPropagation()
	}
	
	const select = showList && <Select choose={(prop: Visitor | Coach) => chooseVisitor(prop)} array={visitors} />
		
	
	const changeBirthday = (e: ChangeEvent<HTMLInputElement>) => setBirthDay(e.target.value)
	
	return (
		<div onClick={hideCoachesList} className={styles.formWrapper}>
			<div className={styles.formWrapper_header}>
				<div><span>Редактировать карточку инструктора</span></div>
				<div className={styles.iconclose}>
					<Delete onClick={removeCard} />
					<Close onClick={closedForm} />
				</div>
			</div>
			
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
					<Button value='Редактировать' />
					{calendar}
				</form>
			</div>
		</div>
	)
}