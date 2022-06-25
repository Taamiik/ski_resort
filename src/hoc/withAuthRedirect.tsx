import React, {ComponentType} from 'react';
import { BrowserRouter } from 'react-router-dom';


export const withAuthRedirect = (Component: ComponentType) => {
	return () => {
		return (
			<BrowserRouter>
				<Component />
			</BrowserRouter>
		)
	}
}