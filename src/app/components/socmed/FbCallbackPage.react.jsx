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


var FbCallbackPage = React.createClass({
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
    	console.log('FbCallbackPage.react: componentDidMount');
		SocmedStore.addChangeListener(this._onChange);
		this._verifyAccount();
	},

	componentWillUnmount: function() {
    	console.log('FbCallbackPage.react: componentWillUnmount');
		SocmedStore.removeChangeListener(this._onChange);
	},

	_verifyAccount: function() {
		console.log('FbCallbackPage.react: _verifyAccount');
		var verifier = this.props.query.code;
		var customerId = this.props.user.id;
		SocmedActionCreators.verifyFbAccount(customerId, verifier);
	},

	_onChange: function() {
    	console.log('FbCallbackPage.react: _onChange');
    	var response = SocmedStore.getResponse();
		console.log('FbCallbackPage.react: response', response);
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
				<h2>Mohon tunggu, akun facebook Anda sedang dalam pemrosesan</h2>
			</div>
		);
		if (this.state.response.fb_account) {
			var fb_account = this.state.response.fb_account;
			resultContent = (
				<div>
					<h2>Akun Anda <strong>{fb_account.social_name}</strong>, berhasil ditambahkan</h2>
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

module.exports = FbCallbackPage;