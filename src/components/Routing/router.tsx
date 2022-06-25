import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Router } from './config';


const RouterHistory: React.FC = () => {
	const routers = Router.map((item, i) => (
		<Route key={i} path={item.path} element={item.element} />
	))

	return (
		<Routes>
			{routers}
		</Routes>
  )
}

export default RouterHistory
