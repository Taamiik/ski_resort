import React, { ReactNode, ChangeEvent } from 'react';

import styles from './picture.module.scss';
import { WithoutPhoto, MainPhoto } from '../WithoutPhoto';


interface Props {
	image: string | ArrayBuffer | null,
	setImage: (elem: Props['image']) => void
}

export const Picture: React.FC<Props> = ({ image, setImage }) => {
	
	const uploadingPhoto = (e: ChangeEvent<HTMLInputElement>)=> {
		const reader = new FileReader()
		e.target.files![0] && reader.readAsDataURL(e.target.files![0])
		reader.onload = ev => {
			setImage(reader.result)
		}
	}

	const upLoadAvatar = (): ReactNode => {
		if (image !== null) {
			return <MainPhoto styles={styles} image={image} />
		}
		return <WithoutPhoto />
	}


	return (
		<div className={styles.picture}>
			<div className={styles.avatar}>
				<input className={styles.input} onChange={uploadingPhoto} type='file' id='input__file' />
				{upLoadAvatar()}
			</div>
		</div>
	)
}
