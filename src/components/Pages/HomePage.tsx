import React from 'react';

import { MainLayout } from '../MainLayout/MainLayout';
import { Home } from '../Base/Home/Home';

export const HomePage: React.FC = ()=> {
	return (
		<MainLayout>
			<Home />
		</MainLayout>
	)
}

