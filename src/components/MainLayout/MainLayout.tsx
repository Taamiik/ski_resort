import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import AppBar from '../UI/AppBar/AppBar';
import styles from './mainLayout.module.scss';
import { NavBar } from '../Base/NavBar/NavBar';


export const MainLayout: React.FC = ({children})=> {
	
	return (
		<div>
			<AppBar />
			<Container>
				<Grid container>
					<Grid className={styles.navbarGrid}>
						<NavBar />
					</Grid>
					<Grid className={styles.content}>
						{children}
					</Grid>
				</Grid>
			</Container>
		</div>
	)
}
