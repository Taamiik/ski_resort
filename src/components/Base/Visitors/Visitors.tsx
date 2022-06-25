import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Dispatch } from 'redux';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styles from './visitor.module.scss';
import { 
	fetchSectionVisitors,
	setNewCreateVisitor,
	setFindVisitorFullname,
	setEditCardVisitor,
	setFoundVisitor
} from '../../../store/visitors/actions';
import {
	sectionVisitors,
	returnNewVisitor,
	returnEditCardVisitor,
	returnVisitorToDelete,
	returnArrayVisitors
} from '../../../store/visitors/selector';
import { Visitor } from '../../../types/types';
import { Arrow, ArrowForward } from '../../../assets/icons';
import { useTypedUseSelector } from '../../../hooks/useTypedUseSelector';
import { FormAddVisitor } from '../../UI/Form/FormAddVisitor/formAddVisitor';
import { SuccessAdded } from '../../UI/Form/FormAddVisitor/SuccessAdded/SuccessAdded';
import { RemoveCard } from '../../UI/Form/FormAddVisitor/RemoveCard/RemoveCard';
import { EditCard } from '../../UI/Form/FormAddVisitor/EditCard/EditCard';
import { Pagination } from '../../UI/Pagination/Pagination';
import { ModalWindow } from '../../UI/ModalWindow/ModalWindow';
import { Card } from '../../UI/Card/Card';
import { Button } from '../../UI/Button/Button';

interface requestsType {
	[value: string]: (dispatch: Dispatch, page?: number) => void
}

export const Visitors: React.FC = () => {
	const dispatch = useDispatch()
	const location = useLocation()
	const visitors = useTypedUseSelector(state => sectionVisitors(state))
	const newVisitor = useTypedUseSelector(state => returnNewVisitor(state))
	const editCard = useTypedUseSelector(state => returnEditCardVisitor(state))
	const removeCard = useTypedUseSelector(state => returnVisitorToDelete(state))
	const arrayVisitors = useTypedUseSelector(state => returnArrayVisitors(state))
	const [ modal, setModal ] = useState<boolean>(false)
	const [roll, setRoll] = useState<boolean>(false)
	const [paramPage, setParamPage] = useState({page:1, size:10})
	const url = {home: '/', path:'/visitor'}

	const requests: requestsType = {
		[url.home]: (dispatch: Dispatch, page = 1) => dispatch(fetchSectionVisitors({page, size: 10})),
		[url.path]: (dispatch: Dispatch, page = 1) => {
			dispatch(fetchSectionVisitors({page, size: 26}))
			setParamPage({page, size: 26})
		}
	}

	useEffect(() => {
		requests[location.pathname](dispatch)
	}, [dispatch, location.pathname])
		
	const closedForm = () => {
		setModal(false)
		dispatch(setFoundVisitor({} as Visitor))
		dispatch(setNewCreateVisitor({flag: false, data: null}))
		dispatch(setFindVisitorFullname({flag: false, data: null}))
		dispatch(setEditCardVisitor({flag: false, data: null}))
	}
	
	const active = modal && 
		<ModalWindow closedForm={closedForm}>
			<FormAddVisitor paramPage={paramPage} requests={requests} closedForm={closedForm} />
		</ModalWindow>

	const successForm = newVisitor.flag &&
		<ModalWindow closedForm={closedForm}>
			<SuccessAdded {...newVisitor.data!} closedForm={closedForm} />
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
						<Typography>Посетители</Typography>
					</Grid>
					<Grid className={styles.addButton}>
						<Button addButton={true} setModal={() => setModal(true)} />
					</Grid>
					
					<Grid className={styles.pagination}>
						<Pagination 
							getquantity={visitors.getquantity}
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
				
				<Card users={arrayVisitors} types={visitors.types} />
				
				<Container className={styles.footer}>
					<div className={styles.all}>
						<Link to='/visitor'>Все</Link>
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
