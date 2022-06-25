import React, { useEffect, useState, ChangeEvent } from 'react';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch } from 'react-redux';

import styles from './input.module.scss';
import { SearchIcon } from '../../../assets/icons';
import { useTypedUseSelector } from '../../../hooks/useTypedUseSelector';
import ResultSearch from './ResultSearch/resultSearch';
import { fetchSearchVisitors } from '../../../store/visitors/actions';
import { fetchSearchCoaches } from '../../../store/coaches/actions';
import { searchVisitor } from '../../../store/visitors/selector';
import { searchCoach } from '../../../store/coaches/selector';

const Input: React.FC = () => {
	const dispatch = useDispatch()
	const [ value, setValue ] = useState<string>('')
	const visitor = useTypedUseSelector(state => searchVisitor(state))
	const coach = useTypedUseSelector(state => searchCoach(state))
	const data = [...visitor, ...coach]
	const resultSearch = visitor && value !== '' && <ResultSearch data={data} />

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	useEffect(() => {
		if (value !== '') {
			dispatch(fetchSearchVisitors(value))
			dispatch(fetchSearchCoaches(value))
		}
	}, [value, dispatch])
	
	return (
		<Grid className={styles.search}>
			<OutlinedInput 
				placeholder='Поиск'
				className={styles.input}
				value={value}
				onChange={handleChange}
				startAdornment={
					<InputAdornment position="start">
						<SearchIcon className={styles.search_icon} />
					</InputAdornment>
				}
			/>
			{resultSearch}
		</Grid>
	)
}

export default React.memo(Input)
