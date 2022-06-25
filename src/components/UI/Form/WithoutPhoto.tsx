import React from 'react';
import Avatar from '@mui/material/Avatar';

export const WithoutPhoto = () => {
	return (
		<label htmlFor='input__file'>
			<svg width="59" height="54" viewBox="0 0 59 54" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M7.625 8.1665V0.541504H12.7083V8.1665H20.3333V13.2498H12.7083V20.8748H7.625V13.2498H0V8.1665H7.625ZM15.25 23.4165V15.7915H22.875V8.1665H40.6667L45.3179 13.2498H53.375C56.1708 13.2498 58.4583 15.5373 58.4583 18.3332V48.8332C58.4583 51.629 56.1708 53.9165 53.375 53.9165H12.7083C9.9125 53.9165 7.625 51.629 7.625 48.8332V23.4165H15.25ZM33.0417 46.2915C40.0567 46.2915 45.75 40.5982 45.75 33.5832C45.75 26.5682 40.0567 20.8748 33.0417 20.8748C26.0267 20.8748 20.3333 26.5682 20.3333 33.5832C20.3333 40.5982 26.0267 46.2915 33.0417 46.2915ZM24.9083 33.5832C24.9083 38.0819 28.5429 41.7165 33.0417 41.7165C37.5404 41.7165 41.175 38.0819 41.175 33.5832C41.175 29.0844 37.5404 25.4498 33.0417 25.4498C28.5429 25.4498 24.9083 29.0844 24.9083 33.5832Z" fill="#DADADA"/>	
			</svg>
		</label>
	)
}

interface Props {
	image: string | ArrayBuffer | null,
	styles: any
}

export const MainPhoto: React.FC<Props> = ({image, styles}) => {
	return (
		<label htmlFor='input__file'>
			<Avatar className={styles.avatar} src={image as string} />
		</label>
	)
}


