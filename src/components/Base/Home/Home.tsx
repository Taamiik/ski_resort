import React from 'react';

import { Visitors } from '../Visitors/Visitors';
import { Coaches } from '../Coaches/Coaches';
import { Skipass } from '../Skipass/Skipass';


export const Home: React.FC = ()=> {
	return (
		<div>
			<Visitors />
			<Coaches />
			<Skipass />
		</div>
	)
}

