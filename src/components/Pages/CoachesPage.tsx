import React from 'react';

import { MainLayout } from '../MainLayout/MainLayout';
import { Coaches } from '../Base/Coaches/Coaches';

export const CoachesPage: React.FC = ()=> {
	return (
		<MainLayout>
			<Coaches />
		</MainLayout>
	)
}

