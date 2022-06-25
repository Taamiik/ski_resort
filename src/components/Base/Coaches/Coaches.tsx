import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Dispatch } from 'redux';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styles from './coach.module.scss';
import { 
	fetchSectionCoaches,
	setNewCreateCoach,
	setFindCoachFullname,
	setEditCardCoach,
	setFoundCoach
} from '../../../store/coaches/actions';
import {
	sectionCoaches,
	returnNewCoach,
	returnEditCardCoach,
	returnCoachToDelete,
	returnArrayCoaches
} from '../../../store/coaches/selector';
import { Coach } from '../../../types/types';
import { Arrow, ArrowForward } from '../../../assets/icons';
import { useTypedUseSelector } from '../../../hooks/useTypedUseSelector';
import { FormAddCoach } from '../../UI/Form/FormAddCoach/formAddCoach';
import { SuccessAdded } from '../../UI/Form/FormAddCoach/SuccessAdded/SuccessAdded';
import { RemoveCard } from '../../UI/Form/FormAddCoach/RemoveCard/RemoveCard';
import { EditCard } from '../../UI/Form/FormAddCoach/EditCard/EditCard';
import { Pagination } from '../../UI/Pagination/Pagination';
import { ModalWindow } from '../../UI/ModalWindow/ModalWindow';
import { Card } from '../../UI/Card/Card';
import { Button } from '../../UI/Button/Button';

interface requestsType {
	[value: string]: (dispatch: Dispatch, page?: number | undefined) => void
}

export const Coaches: React.FC = () => {
	const dispatch = useDispatch()
	const location = useLocation()
	const coaches = useTypedUseSelector(state => sectionCoaches(state))
	const newCoach = useTypedUseSelector(state => returnNewCoach(state))
	const editCard = useTypedUseSelector(state => returnEditCardCoach(state))
	const removeCard = useTypedUseSelector(state => returnCoachToDelete(state))
	const arrayCoaches = useTypedUseSelector(state => returnArrayCoaches(state))
	const [ modal, setModal ] = useState<boolean>(false)
	const [roll, setRoll] = useState<boolean>(false)
	const [paramPage, setParamPage] = useState({page:1, size:10})
	const url = {home: '/', path:'/coach'}

	const requests: requestsType = {
		[url.home]: (dispatch: Dispatch, page = 1) => dispatch(fetchSectionCoaches({page:page, size:10})),
		[url.path]: (dispatch: Dispatch, page = 1) => {
			dispatch(fetchSectionCoaches({page:page, size:26}))
			setParamPage({page, size: 26})
		}
	}
	
	useEffect(() => {
		requests[location.pathname](dispatch)
	}, [dispatch, location.pathname])

	const closedForm = () => {
		setModal(false)
		dispatch(setFoundCoach({} as Coach))
		dispatch(setNewCreateCoach({flag: false, data: null}))
		dispatch(setFindCoachFullname({flag: false, data: null}))
		dispatch(setEditCardCoach({flag: false, data: null}))
	}
	
	const active = modal && 
		<ModalWindow closedForm={closedForm}>
			<FormAddCoach paramPage={paramPage} requests={requests} closedForm={closedForm} />
		</ModalWindow>

	const successForm = newCoach.flag &&
		<ModalWindow closedForm={closedForm}>
			<SuccessAdded {...newCoach.data!} closedForm={closedForm} />
		</ModalWindow>

	const editForm = editCard.flag &&
		<ModalWindow closedForm={closedForm}>
			<EditCard paramPage={paramPage} {...editCard.data!} closedForm={closedForm} />
		</ModalWindow>
		
	const removeForm = removeCard.flag &&
		<ModalWindow closedForm={closedForm}>
			<RemoveCard paramPage={paramPage} {...removeCard.data!} closedForm={closedForm} />
		</ModalWindow>
	
	
	return (
		<div>
			<Box className={cn({
				[styles.hideMain]: roll === true,
				[styles.main]: roll === false
			})}>
				<Grid container className={styles.header}>
					<Grid className={styles.title}>
						<Typography>Инструкторы</Typography>
					</Grid>
					<Grid className={styles.addButton}>
						<Button addButton={true} setModal={() => setModal(true)} />
					</Grid>
					
					<Grid className={styles.pagination}>
						<Pagination 
							getquantity={coaches.getquantity}
							requests={requests}
						/>
					</Grid>
					<Grid className={styles.rollBlock}>
						<p 
							onClick={() => setRoll(!roll)}
							className={cn(styles.expand, {[styles.rollUp]: roll === true})}
						>
							<Arrow className={styles.arrow} />
						</p>
					</Grid>
				</Grid>
				
				<Card users={arrayCoaches.slice(0, paramPage.size)} types={coaches.types} />
				
				<Container className={styles.footer}>
					<div className={styles.all}>
						<Link to='/coach'>Все</Link>
						<ArrowForward />
					</div>
				</Container>
				{active}
				{successForm}
				{editForm}
				{removeForm}
			</Box>
		</div>
	)
}