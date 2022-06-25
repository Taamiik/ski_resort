import React from 'react';
import AuthorizationPage from '../Pages/AuthorizationPage/authorizationpage';

import { HomePage } from '../Pages/HomePage';
import { VisitorsPage } from '../Pages/VisitorsPage';
import { CoachesPage } from '../Pages/CoachesPage';
import { SkipassPage } from '../Pages/SkipassPage';
import { NotFound } from '../Pages/NotFound/NotFound';

enum RouterConfig {
	LoginPage = '/login',
	HomePage = '/',
	VisitorsPage = '/visitor',
	CoachesPage = '/coach',
	SkipassPage = '/skipass',
	NotFound='*'
}

export const Router = [
	{
		path:RouterConfig.LoginPage,
		element:<AuthorizationPage />
	},
	{
		path:RouterConfig.HomePage,
		element:<HomePage />
	},
	{
		path:RouterConfig.VisitorsPage,
		element:<VisitorsPage />
	},
	{
		path:RouterConfig.CoachesPage,
		element:<CoachesPage />
	},
	{
		path:RouterConfig.SkipassPage,
		element:<SkipassPage />
	},
	{
		path:RouterConfig.NotFound,
		element:<NotFound />
	}
]


