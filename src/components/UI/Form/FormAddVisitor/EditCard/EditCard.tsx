import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import * as Yup from "yup";
import {useFormik} from 'formik';
import { useDispatch } from 'react-redux';

import styles from './editcard.module.scss';
import { Coach, Visitor, PayloadProps } from '../../../../../types/types';
import { 
	fetchReturnListCoaches,
	fetchEditCardVisitor,
	setEditCardVisitor,
	setFindVisitorFullname
} from '../../../../../store/visitors/actions';
import { useTypedUseSelector } from '../../../../../hooks/useTypedUseSelector';
import { returnListCoaches } from '../../../../../store/visitors/selector';
import { Close, Delete } from '../../../../../assets/icons';
import { Input } from '../../../Field/Input';
import { Button } from '../../../Button/Button';
import { Select } from '../../../Select/Select';
import { Calendar } from '../../../Calendar/Calendar';
import { Picture } from '../../Picture/Picture';

interface Props {
	id: number,
	fullname: string,
	photo: string | null,
	sportType: string,
	dateOfBirth: string,
	skiPassExpirationTime: string,
	coach?: Coach,
	closedForm: () => void,
	paramPage: PayloadProps
}

export const EditCard: React.FC<Props> = ({ paramPage, closedForm, ...data }) => {
	const dispatch = useDispatch();
	const coaches = useTypedUseSelector(state => returnListCoaches(state));
	const [coachData, setCoachData] = useState<Coach>();  
	const [coachName, setCoachName] = useState<string>('');
	const [imageVisitor, setImageVisitor] = useState<string | ArrayBuffer | null>(null);
	const [showList, setShowList] = useState<boolean>(false);
	const [birthDay, setBirthDay] = useState<Date | string>('')
	const [skipassTime, setSkipassTime] = useState<Date | string>('')
	const [activeCalendar, setActiveCalendar] = useState<boolean>(false)
	const [fieldDate, setFieldDate] = useState<string>('')

	useEffect(()=> {
		setImageVisitor(data.photo)
		if (data.coach) {
			setCoachName(data.coach!.fullname)
			setCoachData(data.coach)
		}
		dispatch(fetchReturnListCoaches('coach'))
	}, [dispatch, data.coach, data.photo, setImageVisitor])
	
  
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCoachName(e.target.value)
		coachName.length === 1 && setShowList(false)
	}

	const chooseСoach = (coach: Coach | Visitor) => {
		setCoachName(coach.fullname)
		setCoachData(coach as Coach)
	}
	
	const formik = useFormik({
		initialValues: {
			id: data.id,
			fullname: data.fullname,
			dateOfBirth: data.dateOfBirth,
			skiPassExpirationTime: data.skiPassExpirationTime,
			coach: '',
			dateOfVisit: '',
			photo: '',
			sportType: data.sportType,
		},
		validationSchema: Yup.object({
			fullname: Yup.string().required('Обязательное поле*'),
			sportType: Yup.string().required('Обязательное поле*')
		}),
		onSubmit: (value) => {
			const data = {
				...value,
				coach: coachData!,
				photo: imageVisitor as string
			}
			dispatch(fetchEditCardVisitor([data, paramPage]))
			closedForm()
		}
	})
	
	const hideCoachesList = (e: MouseEvent) => {
		setShowList(false)
		e.stopPropagation()
	}
	const hideBlockUsers = (e: MouseEvent) => {
		setShowList(true)
		e.stopPropagation()
	}
	
	const removeCard = () => {
		dispatch(setEditCardVisitor({flag: false, data: {} as Visitor}))
		dispatch(setFindVisitorFullname({flag: true, data}))
	}
	
	const select = showList && <Select choose={(prop: Coach | Visitor) => chooseСoach(prop)} array={coaches} />
	
	const calendar = activeCalendar && 
		<Calendar 
			setActiveCalendar={setActiveCalendar} 
			setBirthDay={setBirthDay}
			setSkipassTime={setSkipassTime}
			fieldDate={fieldDate}
		/>
		
	const showCalendar = (e: MouseEvent) => {
		setActiveCalendar(true)
		e.stopPropagation()
	}
	
	const changeBirthday = (e: ChangeEvent<HTMLInputElement>) => setBirthDay(e.target.value)
	const changeSkipassTime = (e: ChangeEvent<HTMLInputElement>) => setSkipassTime(e.target.value)
	
	return (
		<div onClick={hideCoachesList} className={styles.formWrapper}>
			<div className={styles.formWrapper_header}>
				<div><span>Редактировать карточку посетителя</span></div>
				<div className={styles.iconclose}>
					<Delete onClick={removeCard} />
					<Close onClick={closedForm} />
				</div>
			</div>
			
			<Picture image={imageVisitor} setImage={setImageVisitor} />
			
			
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
						validate={formik.touched.fullname && formik.errors.fullname}
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
						fieldtype='date'
						id='skiPassExpirationTime'
						placeholder='День окончания ски-пасса*'
						name='skiPassExpirationTime'
						onChange={changeSkipassTime}
						value={skipassTime as string}
						date={true}
						showCalendar={showCalendar}
						setFieldDate={setFieldDate}
					/>
					<Input 
						placeholder='Назначить тренера*'
						onChange={handleChange}
						onClick={hideBlockUsers}
						value={coachName}
					/>
						{select}
					<Input 
						fieldtype='text'
						id='sportType'
						placeholder='Вид спорта*'
						name='sportType'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.sportType}
						validate={formik.touched.sportType && formik.errors.sportType}
					/>
					<Button value='Редактировать' />
					{calendar}
				</form>
			</div>
		</div>
	)
}