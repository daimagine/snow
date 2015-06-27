import React from 'react/addons';
import ReactMixin from 'react-mixin';
import LoginForm from './LoginForm';

export default class Login extends React.Component {
	constructor() {
		super();
	}
	
	componentWillMount() {
		document.body.classList.add('error-body');
		document.body.classList.add('no-top');
	}

	componentDidUnmount() {
		document.body.classList.remove('error-body');
		document.body.classList.remove('no-top');  
	}

	render() {
		return(
			<div className="row login-container column-seperation">
		        <div className="col-md-10 col-md-offset-1">
		          <h2>Sign in to <span className="highlight">Jualio</span></h2><br/>
		        </div>
		        <div className="col-md-5 col-md-offset-1">
		          <LoginForm />
		          <br/>
		        </div>
		        <div className="col-md-5">
		          <br/>
		          <p>
		            Use Facebook, Twitter or your email to sign in.
		            <br/>
		            <a href="sign-up.html">Sign up Now! </a>
		            for a Jualio account, it's free and always will be..
		              <br/>
		          </p>
		          <br/>
		          <button type="button" className="btn btn-block btn-info col-md-8"><span className="pull-left"><i className="icon-facebook"></i></span><span className="bold">Login with Facebook</span></button>
		          <button type="button" className="btn btn-block btn-success col-md-8"><span className="pull-left"><i className="icon-twitter"></i></span><span className="bold">Login with Twitter</span></button>
		          <br/>
		        </div>
		    </div>
		);
	}
}

ReactMixin(Login.prototype, React.addons.LinkedStateMixin);