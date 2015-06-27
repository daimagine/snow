import React from 'react';
import { Route } from 'react-router';

import AuthenticatedApp from '../components/AuthenticatedApp';
import Dashboard from '../components/Dashboard/Dashboard';
import Login from '../components/Login/Login';

export default (
	<Route handler={AuthenticatedApp}>
		<Route name="home" handler={Dashboard} path="/" />
		<Route name="login" handler={Login} />
	</Route>
);