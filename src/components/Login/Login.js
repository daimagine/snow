import React from 'react/addons';
import ReactMixin from 'react-mixin';
import { Link } from 'react-router';
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
				<div className="col-md-12">
					<Link to="home">home</Link>
					<Link to="login">login</Link>
				</div>

		        <div className="col-md-10 col-md-offset-1">
		          <h2>Login <span className="highlight">Jualio</span></h2>
		          <p>
		          	Jika Anda belum menjadi member Jualio, 
		          	silahkan daftar sekarang supaya anda bisa menjual barang 
		          	langsung ke follower / fans / teman.
		          </p>
		          <br/>
		        </div>
		        <div className="col-md-5 col-md-offset-1">
		          <LoginForm />
		          <br/>
		        </div>
		        <div className="col-md-5">
		          <br/>
		          <p>
		            Login dengan menggunakan akun sosial media Anda.
		            <br/>
		          </p>
		          <br/>
		          <button type="button" className="btn btn-block btn-info col-md-8">
		          	<span className="pull-left"><i className="icon-facebook"></i></span>
		          	<span className="bold">Login dengan Facebook</span>
		          </button>
		          <button type="button" className="btn btn-block btn-success col-md-8">
		          	<span className="pull-left"><i className="icon-twitter"></i></span>
		          	<span className="bold">Login dengan Twitter</span>
		          </button>
		          <br/>
		        </div>
		    </div>
		);
	}
}

ReactMixin(Login.prototype, React.addons.LinkedStateMixin);