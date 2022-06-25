import React from 'react';
import cn from 'classnames';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';

import styles from './card.module.scss';
import { Visitor, Coach, SkiPass, Types } from '../../../types/types';
import { Parametrs } from '../Parametrs/Parametrs';
import { Blueimgskipass, Pinkimgskipass, Darkimgskipass, Greenimgskipass } from '../../../assets/images';
import { setNewCreateVisitor } from '../../../store/visitors/actions';
import { setNewCreateCoach } from '../../../store/coaches/actions';
import { setNewCreateSkipass } from '../../../store/skipass/actions';

interface Props {
	users?: Types['types'][],
	skipass?: SkiPass[],
	types: string
}


export const Card: React.FC<Props> = ({ users, skipass, types }) => {
	const imagesSkipass:string[] = [Blueimgskipass, Pinkimgskipass, Darkimgskipass, Greenimgskipass]
	const dispatch = useDispatch()
	
	const imageSkipass = (index: number) => {
		if(index > imagesSkipass.length && index % imagesSkipass.length !== 0) {
			const equation = index - (Math.floor(index / imagesSkipass.length) * imagesSkipass.length)
			return imagesSkipass[equation]
		}
		if(index >= imagesSkipass.length && index % imagesSkipass.length === 0) {
			return imagesSkipass[0]
		}
		return imagesSkipass[index]
	}
	
	const outputCard = (card: Types['types']) => {
		if (card.hasOwnProperty('coach')) {
			dispatch(setNewCreateCoach({flag: false, data: {} as Coach}))
			dispatch(setNewCreateVisitor({flag: true, data: card as Visitor}))
		}
		if (card.hasOwnProperty('category')) {
			dispatch(setNewCreateVisitor({flag: false, data: {} as Visitor}))
			dispatch(setNewCreateCoach({flag: true, data: card as Coach}))
		}
	}
	
	const outputSkipass = (card: SkiPass) => {
		dispatch(setNewCreateSkipass({ flag:true, data: card as SkiPass}))
	}
	
	const age = (card: any) => {
		if (card.hasOwnProperty('coach')) {
			const milliseconds = new Date().getTime() - new Date(card.dateOfBirth).getTime() 
			const age = Math.ceil((milliseconds / 1000) / 31104000)
			if (age <= 0) return 25
			return age
		}
		if (card.hasOwnProperty('workExperience')) {
			return `${card.sportType}.Опыт ${card.workExperience}`
		}
	}

	const cardsUsers = users?.map((card: Types['types'], i: number) => {
		return <Grid key={i} className={styles.item}>
			<div className={styles.card}>
				<Grid container className={styles.grid}>
					<Grid className={styles.ava}>
						<Avatar 
							onClick={() => outputCard(card!)}
							src={card.photo!}
							className={styles.avatar}
						/>
					</Grid>
					<Grid className={styles.description}>
						<Typography className={styles.name}>{card.fullname}</Typography>
						<Typography className={styles.age}>{age(card)} лет</Typography>
					</Grid>
						<Parametrs card={card} prop={types} />
				</Grid>
			</div>
		</Grid>
	})
	
	const cardsSkipass = skipass?.map((card: SkiPass, index: number) => (
		<Box key={index} className={styles.itemSkipass}>
			<Grid container className={styles.container}>
				<img 
					onClick={() => outputSkipass(card!)}
					className={styles.background}
					src={imageSkipass(index)}
					alt='background'
				/>
				<Grid className={styles.description}>
					<Typography className={styles.numberCard}>{card.expirationTime}</Typography>
					<Typography className={styles.price}>{card.price} р</Typography>
				</Grid>
					<Parametrs card={card} prop={types} />
			</Grid>
		</Box>
	))
	
	return (
		<Grid className={cn(styles.bodyUser, {[styles.bodySkipass]: types === 'skipass'})}>
			{cardsUsers}
			{cardsSkipass}
		</Grid>
	)
}

