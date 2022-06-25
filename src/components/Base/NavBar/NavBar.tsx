import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './navbar.module.scss';
import { People, RecordVoiceOver, CreditCard, Settings } from '../../../assets/icons';
import { ModalWindow } from '../../UI/ModalWindow/ModalWindow';
import { FormSettings } from '../../UI/Form/Settings/formSettings';


export const NavBar: React.FC = () => {
	const activeLink = ({ isActive }: boolean | any) => isActive ? styles.active : styles.link
	const [settingsForm, setSettingForm] = useState<boolean>(false)
	
	const settings = () => setSettingForm(true)
	
	const closedForm = () => {
		setSettingForm(false)
	}
	
	const formSettings = settingsForm && 
		<ModalWindow closedForm={closedForm}>
			<FormSettings closedForm={closedForm} />
		</ModalWindow>
	
	return (
		<div className={styles.navbar}>
			<div className={styles.item}>
				<People className={styles.icon} />
				<NavLink to='/visitor' className={activeLink}>Посетители</NavLink>
			</div>
			<div className={styles.item}>
				<RecordVoiceOver className={styles.icon} />
				<NavLink to='/coach' className={activeLink}>Инструкторы</NavLink>
			</div>
			<div className={styles.item}>
				<CreditCard className={styles.icon} />
				<NavLink to='/skipass' className={activeLink}>Ски-пасс</NavLink>
			</div>
			<div className={[styles.item, styles.settings].join(' ')}>
				<Settings className={styles.icon} />
				<p onClick={settings} className={styles.link}>Настройки</p>
			</div>
			{formSettings}
		</div>
	)
}

			