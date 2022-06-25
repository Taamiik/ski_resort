import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Dispatch } from 'redux';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styles from './skipass.module.scss';
import { SkiPass } from '../../../types/types';
import { Arrow, ArrowForward } from '../../../assets/icons';
import { 
	fetchSectionSkipass,
	setNewCreateSkipass,
	setFindSkipassFullname,
	setEditCardSkipass
} from '../../../store/skipass/actions';
import { useTypedUseSelector } from '../../../hooks/useTypedUseSelector';
import {
	sectionSkipass,
	returnNewSkipass,
	returnEditCardSkipass,
	returnSkipassToDelete,
	returnArraySkipass
} from '../../../store/skipass/selector';
import { FormAddSkipass } from '../../UI/Form/FormAddSkiPass/formAddSkiPass';
import { SuccessAdded } from '../../UI/Form/FormAddSkiPass/SuccessAdded/SuccessAdded';
import { RemoveCard } from '../../UI/Form/FormAddSkiPass/RemoveCard/RemoveCard';
import { EditCard } from '../../UI/Form/FormAddSkiPass/EditCard/EditCard';
import { Pagination } from '../../UI/Pagination/Pagination';
import { Card } from '../../UI/Card/Card';
import { ModalWindow } from '../../UI/ModalWindow/ModalWindow';
import { Button } from '../../UI/Button/Button';

interface requestsType {
	[value: string]: (dispatch: Dispatch, page?: number | undefined) => void
}

export const Skipass: React.FC = () => {
	const dispatch = useDispatch()
	const location = useLocation()
	const skipass = useTypedUseSelector(state => sectionSkipass(state))
	const newSkipass = useTypedUseSelector(state => returnNewSkipass(state))
	const editCard = useTypedUseSelector(state => returnEditCardSkipass(state))
	const skipassToDelete = useTypedUseSelector(state => returnSkipassToDelete(state))
	const arraySkipass = useTypedUseSelector(state => returnArraySkipass(state))
	const [ modal, setModal ] = useState<boolean>(false)
	const [roll, setRoll] = useState<boolean>(false)
	const [paramPage, setParamPage] = useState({page:1, size:3})
	const url = {home: '/', path:'/skipass'}

	const requests: requestsType = {
		[url.home]: (dispatch: Dispatch, page = 1) => dispatch(fetchSectionSkipass({page:page, size:3})),
		[url.path]: (dispatch: Dispatch, page = 1) => {
			dispatch(fetchSectionSkipass({page:page, size:5}))
			setParamPage({page, size: 5})
		}
	}
	
	useEffect(() => {
		requests[location.pathname](dispatch)
	}, [dispatch, location.pathname])
		
	
	const closedForm = () => {
		setModal(false)
		dispatch(setNewCreateSkipass({flag: false, data: null}))
		dispatch(setFindSkipassFullname({flag: false, data: null}))
		dispatch(setEditCardSkipass({flag: false, data: null}))
	}
	

	const activeModalWindow = modal && 
		<ModalWindow closedForm={closedForm}>
			<FormAddSkipass paramPage={paramPage} requests={requests} closedForm={closedForm} />
		</ModalWindow>
	
	const successAddedSkipass = newSkipass.flag &&
		<ModalWindow closedForm={closedForm}>
			<SuccessAdded {...newSkipass.data!} closedForm={closedForm} />
		</ModalWindow>
		
	const removeCard = skipassToDelete.flag &&
		<ModalWindow closedForm={closedForm}>
			<RemoveCard paramPage={paramPage} {...skipassToDelete.data!} closedForm={closedForm} />
		</ModalWindow>
	
	const editForm = editCard.flag &&
		<ModalWindow closedForm={closedForm}>
			<EditCard paramPage={paramPage} {...editCard.data!} closedForm={closedForm} />
		</ModalWindow>
	
	return (
		<div>
			<Box className={cn({
				[styles.hideMain]: roll === true,
				[styles.main]: roll === false
			})}>
				<Grid container className={styles.header}>
					<Grid className={styles.title}>
						<Typography>{skipass.title}</Typography>
					</Grid>
					<Grid className={styles.addButton}>
						<Button addButton={true} setModal={() => setModal(true)} />
					</Grid>
					
					<Grid className={styles.pagination}>
						<Pagination 
							getquantity={skipass.getquantity}
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
				
				<Card skipass={arraySkipass.slice(0, paramPage.size)} types={skipass.types} />
				
				<Container className={styles.footer}>
					<div className={styles.all}>
						<Link to='/skipass'>Все</Link>
						<ArrowForward />
					</div>
				</Container>
			</Box>
			{activeModalWindow}
			{successAddedSkipass}
			{removeCard}
			{editForm}
		</div>
	)
}

