import React, { ChangeEvent, FocusEvent, MouseEvent, ReactElement } from 'react';
import cn from 'classnames';

import styles from './input.module.scss';
import { EventNoteIcon } from '../../../assets/icons';

interface Props {
	fieldtype?: string,
	id?: string,
	placeholder?: string,
	name?: string,
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
	onBlur?: (e: FocusEvent) => void,
	onFocus?: () => void,
	value?: string,
	validate?: string | boolean,
	onClick?: (e: MouseEvent<HTMLInputElement>) => void,
	date?: boolean,
	showCalendar?: (e: MouseEvent) => void
	setFieldDate?: (prop: string) => void
}

export const Input: React.FC<Props> = ({
	fieldtype,
	id,
	placeholder,
	name,
	onChange,
	onBlur,
	onFocus,
	onClick,
	value,
	validate,
	date,
	showCalendar,
	setFieldDate
})=> {
	
	const open = (e: MouseEvent) => {
		setFieldDate!(name!)
		showCalendar!(e)
	}
	
	const typeInput = (): ReactElement => {
		return date 
			? 
				<div className={styles.fieldDate}>
					<input
						readOnly
						placeholder={placeholder}
						value={value}
						onChange={onChange}
						onBlur={onBlur}
						className={cn(styles.inputdate, {[styles.error]:validate !== undefined})}
					/>
					<EventNoteIcon 
						onClick={open} 
						className={styles.iconcalend} 
					/>
				</div>
			:
				<div className={styles.inputWrapper}>
					<input
						onChange={onChange}
						onBlur={onBlur}
						onFocus={onFocus}
						onClick={onClick}
						value={value}
						id={id}
						name={name}
						placeholder={placeholder}
						type={fieldtype}
						className={cn(styles.input, {[styles.error]:validate !== undefined})}
					/>
				</div>
	}
	
	return (
		<div>
			{typeInput()}
		</div>
	)
}


