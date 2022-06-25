import React, { useState } from 'react';
import cn from 'classnames';

import styles from './calendar.module.scss';

interface Props {
	setBirthDay?: (prop: Date | string) => void,
	setSkipassTime?: (prop: Date | string) => void,
	setActiveCalendar: (prop: boolean) => void,
	fieldDate: string
}

export const Calendar: React.FC<Props> = ({setActiveCalendar, setBirthDay, setSkipassTime, fieldDate}) => {
	const day: number | string = new Date().getDate()
	const dayWeek: number = new Date().getDay() - 1 < 0 ? 6 : new Date().getDay() - 1
	const [year, setYear] = useState<number>(new Date().getFullYear())
	const [month, setMonth] = useState<number>(new Date().getMonth())
	const [showListYears, setShowListYears] = useState<boolean>(false)
	const arrayWeekDays = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']
	const arrayMonths = [
			'Январь','Февраль','Март',
			'Апрель','Май','Июнь',
			'Июль','Август','Сентябрь',
			'Октябрь','Ноябрь','Декабрь'
		]

	const weekDays = () => arrayWeekDays.map((elem: string, i: number) => <li key={i}>{elem}</li>)
	
		
	const numberDays = (year:number, month:number) => {
		const arr = []
		const firstDay = () => {
			const result = new Date(year, month, 1).getDay()
			return result === 0 ? 7 : result
		}
		const lastDay = new Date(year, month + 1, 0).getDate()
		
		for(let i=1; i<=lastDay; i++) arr.push(i)
		for(let i=1; i<firstDay(); i++) arr.unshift('')
		
		return arr
	}
	
	const chooseYear = (prop: number) => {
		setYear(prop)
		setShowListYears(false)
	}
	
	const createDate = (prop: string | number) => {
		const date = new Date(year, month, prop as number)
		if (fieldDate === 'dateOfBirth') {
			setBirthDay!(date.getFullYear() + '-' + Number(date.getMonth() + 1) + '-' + date.getDate())
		}
		
		if (fieldDate === 'skiPassExpirationTime' || fieldDate === 'expirationTime') {
			setSkipassTime!(date.getFullYear() + '-' + Number(date.getMonth() + 1) + '-' + date.getDate())
		}
		setActiveCalendar(false)
	}
	
	const createItem = (arr: Array<string | number>) => arr.map((n:string | number, i:number) => (
		<li key={i} onClick={() => createDate(n)} className={cn({
			[styles.days]: n !== '',
			[styles.today]: n === day && month === new Date().getMonth()
		})}>{n}</li>
	))
	
	const scrollRight = () => {
		setMonth((prev) => {
			if (prev > 10) {
				setYear(year + 1)
				return 0
			}
			return prev + 1
		})
	}
	
	const scrollLeft = () => {
		setMonth((prev) => {
			if (prev <= 0) {
				setYear(year - 1)
				return 11
			}
			return prev - 1
		})
	}
	
	const arrayYears = () => {
		const arr = []
		for(let i=1900; i<2099; i++) arr.push(<span key={i} onClick={() => chooseYear(i)} className={styles.year}>{i}</span>)
		return arr;
	}
	
	const listYears = showListYears && 
			<div className={styles.showListYears}>
				{arrayYears()}
			</div>
	
	
	const weekDay = !showListYears &&
		<div>
			<div className={styles.weekDays}>
				<ul className={styles.listDays}>
					{weekDays()}
				</ul>
			</div>

			<div>
				<ul className={styles.numberDays}>
					{createItem(numberDays(year, month))}
				</ul>
			</div>
		</div>
		
	return (
		<div className={styles.wrapper}>
			<div onClick={(e) => e.stopPropagation()} className={styles.calendar}>
				<div className={styles.container}>
					<h4>{year}</h4>
					<h2>{arrayWeekDays[dayWeek]}, {day} {arrayMonths[new Date().getMonth()]}</h2>
					<div className={styles.monthSlider}>
						<p onClick={scrollLeft} className={styles.arrow}> ← </p>
						<div className={styles.monthAndYear}>
							<p className={styles.monthName}>{arrayMonths[month]}</p>
							<p className={styles.numberYear} onClick={() => setShowListYears(!showListYears)}> 
								{year} г.
							</p>
						</div>
						<p onClick={scrollRight} className={styles.arrow}> → </p>
					</div>
					
					{listYears}
					{weekDay}
				</div>
			</div>
		</div>
	)
}


