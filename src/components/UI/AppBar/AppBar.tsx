import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import styles from './appbar.module.scss';
import Header from './Header/Header';
import Navigation from './Navigation/Navigation';


const AppBar: React.FC = ()=> {

	
	return (
		<Box className={styles.box}>
			<Container className={styles.container}>
				<Toolbar className={styles.header} variant="dense">
					<Header />
				</Toolbar>
					
				<Toolbar className={styles.nav}>
					<Navigation />
				</Toolbar>
			</Container>
		</Box>
	)
}

export default React.memo(AppBar)
