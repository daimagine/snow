var React = require('react');
var router = require('./stores/RouteStore.react.jsx').getRouter();
window.React = React;
var SessionStore = require('./stores/SessionStore.react.jsx');
var AuthService = require('./services/AuthService.js');


var run = function() {
	router.run(function (Handler, state) {
	  React.render(<Handler/>, document.getElementById('root'));
	});
}

// detect remember me
var remember = JSON.parse(localStorage.getItem('rememberme'));
console.log('app: rememberme', remember);
if (remember) {
	AuthService.authenticateToken(function() {
		run();
	});
} else {
	run();
}