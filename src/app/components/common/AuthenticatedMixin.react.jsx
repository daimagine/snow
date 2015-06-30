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
}

module.exports = AuthenticatedMixin;