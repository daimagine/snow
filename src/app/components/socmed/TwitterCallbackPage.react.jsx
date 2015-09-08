var React = require('react');
var Router = require('react-router');
var State = Router.State;
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var AuthenticatedMixin = require('../../components/common/AuthenticatedMixin.react.jsx');

var AppConstants = require('../../constants/AppConstants.js');
var SocmedType = AppConstants.SocmedType;
var SocmedConstant = AppConstants.SocmedConstant;
var SocmedStore = require('../../stores/SocmedStore.react.jsx');
var SocmedActionCreators = require('../../actions/SocmedActionCreators.react.jsx');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');


var TwitterCallbackPage = React.createClass({
  	mixins: [AuthenticatedMixin, State],

	propTypes: {
		user: ReactPropTypes.object
	},

	getInitialState: function() {
		return {
			response: SocmedStore.getResponse(),
			processing: true
		}
	},

	componentDidMount: function() {
    	console.log('TwitterCallbackPage.react: componentDidMount');
		SocmedStore.addChangeListener(this._onChange);
		this._verifyAccount();
	},

	componentWillUnmount: function() {
    	console.log('TwitterCallbackPage.react: componentWillUnmount');
		SocmedStore.removeChangeListener(this._onChange);
	},

	_verifyAccount: function() {
		console.log('TwitterCallbackPage.react: _verifyAccount');
		var verifier = this.props.query.oauth_verifier;
		var customerId = this.props.user.id;
		SocmedActionCreators.verifyTwitterAccount(customerId, verifier);
	},

	_onChange: function() {
    	console.log('TwitterCallbackPage.react: _onChange');
    	var response = SocmedStore.getResponse();
		console.log('TwitterCallbackPage.react: response', response);
    	this.setState({ 
    		response: response,
			processing: false
    	});
	},

	componentDidUpdate: function() {
		if (!this.state.processing) {
	    	setTimeout(function() {
	    		RouteActionCreators.redirect('profile');
	    	}, 3000);
		}
	},

	render: function() {
		var resultContent = (
			<div>
				<h2>Mohon tunggu, akun twitter Anda sedang dalam pemrosesan</h2>
			</div>
		);
		if (this.state.response.twitter_account) {
			var twitter_account = this.state.response.twitter_account;
			resultContent = (
				<div>
					<h2>Akun Anda @{twitter_account.social_name}, berhasil ditambahkan</h2>
					<p>
						Halaman ini akan dialihkan (redirect) otomatis. 
					</p>
					<p>
						Klik <Link to="profile">disini</Link> jika pengalihan otomatis tidak bekerja
					</p>
				</div>
			);
		}
		return(
			<div className="content">
				<div className="row text-center">
					{ resultContent }
				</div>
			</div>
		);
	}
});

module.exports = TwitterCallbackPage;