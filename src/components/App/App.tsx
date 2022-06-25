import React from 'react';
import { compose } from 'redux';

import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { WithRedux } from '../../hoc/WithRedux';
import RouterHistory from '../Routing/router';


const App: React.FC = () => {
  return <RouterHistory />
}

const withAppData = (Component: React.FC): React.FC =>
	compose<React.FC>(withAuthRedirect, WithRedux)(Component)

export default withAppData(App)
