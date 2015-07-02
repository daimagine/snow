var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');


var AuthenticatedMixin = {
	statics: {
	    willTransitionTo: function (transition) {
	      console.log("AuthenticatedMixin: intercepting transition path", transition.path);
	      console.log("AuthenticatedMixin: verifying user logged in");
	      if (!SessionStore.isLoggedIn()) {
	      	console.log("AuthenticatedMixin: user is not logged in. " +
	      	 		"trigger router redirect action to login");
	      	
	      	RouteActionCreators.redirect('login');
	      }
	    }
	},

	getInitialState: function() {
	    console.log('AuthenticatedMixin: getInitialState')
		return {
		    isLoggedIn: SessionStore.isLoggedIn(),
		    user: SessionStore.getUser()
		};
	},

	componentDidMount: function() {
	    SessionStore.addChangeListener(this._onSessionChange);
	},

	componentWillUnmount: function() {
	    SessionStore.removeChangeListener(this._onSessionChange);
	},

	_onSessionChange: function() {
	    console.log('AuthenticatedMixin: _onSessionChange')
	    this.setState({
		    isLoggedIn: SessionStore.isLoggedIn(),
		    user: SessionStore.getUser()
		});

		console.log('AuthenticatedMixin: _onSessionChange', SessionStore.isLoggedIn());
		if (!SessionStore.isLoggedIn()) {
			RouteActionCreators.redirect('login');
		}
	},
}

module.exports = AuthenticatedMixin;