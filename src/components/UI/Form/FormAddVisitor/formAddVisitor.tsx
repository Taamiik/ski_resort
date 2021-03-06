import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import * as Yup from "yup";
import {useFormik} from 'formik';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import styles from './formaddvisitor.module.scss';
import { Coach, Visitor, PayloadProps } from '../../../../types/types';
import { fetchReturnListCoaches, fetchCreateVisitor } from '../../../../store/visitors/actions';
import { useTypedUseSelector } from '../../../../hooks/useTypedUseSelector';
import { returnListCoaches } from '../../../../store/visitors/selector';
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

export const FormAddVisitor: React.FC<Props> = ({ paramPage, closedForm, requests }) => {
	const dispatch = useDispatch();
	const location = useLocation();
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
		dispatch(fetchReturnListCoaches('coach'))
	}, [dispatch])
	
	
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCoachName(e.target.value)
		coachName.length === 1 && setShowList(false)
	}

	const choose??oach = (coach: Coach | Visitor) => {
		setCoachName(coach.fullname)
		setCoachData(coach as Coach)
	}
	
	
	const formik = useFormik({
		initialValues: {
			id: Math.random(),
			fullname: '',
			dateOfBirth: '',
			skiPassExpirationTime: '',
			coach: '',
			dateOfVisit: '',
			photo: '',
			sportType: ''
		},
		validationSchema: Yup.object({
			fullname: Yup.string().required('???????????????????????? ????????*'),
			sportType: Yup.string().required('???????????????????????? ????????*')
		}),
		onSubmit: (value) => {
			const data = {
				...value,
				coach: coachData!,
				dateOfBirth: birthDay as string,
				skiPassExpirationTime: skipassTime as string,
				photo: imageVisitor as string
			}
			dispatch(fetchCreateVisitor([data, paramPage]))
			requests[location.pathname](dispatch)
			closedForm()
		}
	})

	const calendar = activeCalendar && 
		<Calendar 
			setActiveCalendar={setActiveCalendar} 
			setBirthDay={setBirthDay}
			setSkipassTime={setSkipassTime}
			fieldDate={fieldDate}
		/>
	
	const hideBlockUsers = (e: MouseEvent) => {
		setShowList(true)
		e.stopPropagation()
	}
	
	const hideCoachesList = (e: MouseEvent) => {
		setShowList(false)
		setActiveCalendar(false)
		e.stopPropagation()
	}
	
	const showCalendar = (e: MouseEvent) => {
		setActiveCalendar(true)
		e.stopPropagation()
	}
	
	const select = showList && <Select choose={(prop: Coach | Visitor) => choose??oach(prop)} array={coaches} />
	
	const changeBirthday = (e: ChangeEvent<HTMLInputElement>) => setBirthDay(e.target.value)
	const changeSkipassTime = (e: ChangeEvent<HTMLInputElement>) => setSkipassTime(e.target.value)

	return (
		<div onClick={hideCoachesList} className={styles.formWrapper}>
			<FormTitle closedForm={closedForm} title='???????????????? ????????????????????' />
			
			<Picture image={imageVisitor} setImage={setImageVisitor} />

			<form onSubmit={formik.handleSubmit}>
				<Input 
					fieldtype='text'
					id='fullname'
					placeholder='??????*'
					name='fullname'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.fullname}
					validate={formik.touched.fullname && formik.errors.fullname}
				/>
				<Input 
					fieldtype='date'
					id='dateOfBirth'
					placeholder='???????? ????????????????*'
					name='dateOfBirth'
					onChange={changeBirthday}
					onBlur={formik.handleBlur}
					value={birthDay as string}
					date={true}
					showCalendar={showCalendar}
					setFieldDate={setFieldDate}
					validate={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
				/>
				<Input 
					fieldtype='date'
					id='skiPassExpirationTime'
					placeholder='???????? ?????????????????? ??????-??????????*'
					name='skiPassExpirationTime'
					onChange={changeSkipassTime}
					value={skipassTime as string}
					date={true}
					showCalendar={showCalendar}
					setFieldDate={setFieldDate}
				/>
				<Input 
					placeholder='?????????????????? ??????????????*'
					onChange={handleChange}
					onClick={hideBlockUsers}
					value={coachName}
				/>
					{select}
				<Input 
					fieldtype='text'
					id='sportType'
					placeholder='?????? ????????????*'
					name='sportType'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.sportType}
					validate={formik.touched.sportType && formik.errors.sportType}
				/>
				<Button value='????????????????' />
				{calendar}
			</form>
		</div>
	)
}
