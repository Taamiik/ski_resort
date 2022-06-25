import React, { ComponentType } from 'react';
import { Provider } from 'react-redux';

import { store } from '../store/store';

export const WithRedux = (Component: ComponentType) => {
	return () => {
		return (
			<Provider store = {store}>
				<Component />
			</Provider>
		)
	}
}