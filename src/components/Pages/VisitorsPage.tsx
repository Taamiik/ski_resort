import React from 'react';

import { MainLayout } from '../MainLayout/MainLayout';
import { Visitors } from '../Base/Visitors/Visitors';

export const VisitorsPage: React.FC = ()=> {
	return (
		<MainLayout>
			<Visitors />
		</MainLayout>
	)
}

