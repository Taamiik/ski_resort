import React, { useState, MouseEvent } from 'react';
import cn from 'classnames';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import { useDispatch} from 'react-redux';

import styles from './parametrs.module.scss';
import { MoreVertIcon } from '../../../assets/icons';
import { setFindVisitorFullname, setEditCardVisitor } from '../../../store/visitors/actions';
import { setFindCoachFullname, setEditCardCoach } from '../../../store/coaches/actions';
import { setFindSkipassFullname, setEditCardSkipass } from '../../../store/skipass/actions';
import { Visitor, Coach, SkiPass } from '../../../types/types';

interface Props {
	card: Visitor | Coach | SkiPass,
	prop: string
}
interface requestType {
	[prop: string]: (card: Props['card']) => void
}
interface optionsType {
	value: string, 
	request: requestType
}

export const Parametrs: React.FC<Props> = ({ card, prop })=> {
	const dispatch = useDispatch()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const options: optionsType [] = [ 
		{value:'Редактировать', 
			request: {
				visitor: (card: Props['card']) => dispatch(setEditCardVisitor({flag: true, data: card as Visitor})),
				coach: (card: Props['card']) => dispatch(setEditCardCoach({flag: true, data: card as Coach})),
				skipass: (card: Props['card']) => dispatch(setEditCardSkipass({flag: true, data: card as SkiPass}))
			}
		},
		{value:'Удалить', 
			request: {
				visitor: (card: Props['card']) => dispatch(setFindVisitorFullname({flag: true, data: card as Visitor})),
				coach: (card: Props['card']) => dispatch(setFindCoachFullname({flag: true, data: card as Coach})),
				skipass: (card: Props['card']) => dispatch(setFindSkipassFullname({flag: true, data: card as SkiPass}))
			}
		}
	]

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	}
	
	const handleClose = (value: string) => {
		options.map((elem: optionsType) => {
			return elem.value === value && elem.request[prop](card)
		})
		setAnchorEl(null)
	}
	
	
	const menu = <Grid className={cn(styles.menu,{[styles.skipassMenu]: prop === 'skipass'})}>
			<IconButton onClick={handleClick}>
				<MoreVertIcon />
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				>
				{options.map((option) => (
					<MenuItem key={option.value} onClick={() => handleClose(option.value)}>
						{option.value}
					</MenuItem>
				))}
			</Menu>
		</Grid>
	
	return (
		<div>
			{menu}
		</div>
	)
}
