import React from 'react';
import Router, {
	Route,
	create as createRouter,
	HistoryLocation 
} from 'react-router';
import routes from './commons/AppRouter';

var router = createRouter({ routes, HistoryLocation });

const rootEl = document.getElementById('root');
Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler/>, rootEl);
});