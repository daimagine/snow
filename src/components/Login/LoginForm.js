import React from 'react/addons';
import ReactMixin from 'react-mixin';
import ReactScriptLoader from 'react-script-loader';
import AuthService from '../../services/AuthService';


export default class LoginForm extends React.Component {
	constructor() {
		super();
		this.state = {
			user: '',
			password: '',
			scriptLoading: true,
            scriptLoadError: false,
		};
	}

	// this function tells ReactScriptLoaderMixin where to load the script from
    getScriptURL() {
        return 'https://www.google.com/recaptcha/api.js';
    }

    // ReactScriptLoaderMixin calls this function when the script has loaded
    // successfully.
    onScriptLoaded() {
    	console.log('LoginForm: onScriptLoaded');
        this.setState({scriptLoading: false});
    }

    // ReactScriptLoaderMixin calls this function when the script has failed to load.
    onScriptError() {
    	console.log('LoginForm: onScriptLoaded');
        this.setState({scriptLoading: false, scriptLoadError: true});
    }

    onScriptTagCreated() {
    	console.log('LoginForm: onScriptTagCreated');
    }

	login(e) {
		e.preventDefault();
	    var captcha = document.getElementById('g-recaptcha-response').value;
		AuthService.login(this.state.user, this.state.password, captcha)
			.catch(function(error) {
				console.log('AuthService: error', error);
				alert('Login failed. ' + error.data.message);
			});
	}

	render() {
		var message = "LoginForm ScriptLoader: "
		if (this.state.scriptLoading) {
            message += 'loading script...';
        } else if (this.state.scriptLoadError) {
            message += 'loading failed';
        } else {
            message += 'loading succeeded';
        }
        console.log(message);

		return(
			<form role="form" id="login-form" className="login-form">
	            <div className="row">
	              <div className="form-group col-md-12">
	                <label className="form-label">Username</label>
	                <div className="controls">
	                  <div className="input-with-icon right">
	                    <i></i>
	                    <input id="txtusername" type="text" name="txtusername" className="form-control"
	                      valueLink={this.linkState('user')} />
	                  </div>
	                </div>
	              </div>
	            </div>
	            <div className="row">
	              <div className="form-group col-md-12">
	                <label className="form-label">Password</label><span className="help"></span>
	                <div className="controls">
	                  <div className="input-with-icon right"><i></i>
	                    <input id="txtpassword" type="password" name="txtpassword" className="form-control"
	                      valueLink={this.linkState('password')} />
	                  </div>
	                </div>
	              </div>
	            </div>
	            <div className="row">
	              <div className="form-group col-md-12">
	                <label className="form-label">Captcha</label><span className="help"></span>
	                <div className="controls">
	                  <div className="input-with-icon right"><i></i>
	                    <div className="g-recaptcha" data-sitekey="6Lc4zggTAAAAAIQhg0kFlMA0qpy4PLyulMaPt-8-"></div>
	                  </div>
	                </div>
	              </div>
	            </div>
	            <div className="row">
	              <div className="control-group col-md-12">
	                <div className="checkbox checkbox check-success"><a href="#">Trouble login in?</a>
	                  <br/><br/>
	                  <input id="checkbox1" type="checkbox" value="1" />
	                  <label htmlFor="checkbox1">Keep me reminded</label>
	                </div>
	              </div>
	            </div>
	            <div className="row">
	              <div className="col-md-12">
	                <button type="submit" className="btn btn-primary btn-cons pull-right" 
	                  onClick={this.login.bind(this)} 
	                  disabled={this.state.scriptLoading}>Login</button>
	              </div>
	            </div>
	        </form>
		);
	}
}

var TestMixin = {
	componentWillMount: function() {
    	console.log('TestMixin: componentWillMount');
	},

	componentDidMount: function() {
    	console.log('TestMixin: componentDidMount');
	}
}

ReactMixin(LoginForm.prototype, React.addons.LinkedStateMixin);
ReactMixin(LoginForm.prototype, ReactScriptLoader.ReactScriptLoaderMixin);
// ReactMixin(LoginForm.prototype, TestMixin);



// var React = require('react');
// var ReactScriptLoaderMixin = require('react-script-loader').ReactScriptLoaderMixin;

// var LoginForm = React.createClass({
//     mixins: [ReactScriptLoaderMixin],
//     getInitialState: function() {
//         return {
//             scriptLoading: true,
//             scriptLoadError: false,
//         };
//     },

//     // this function tells ReactScriptLoaderMixin where to load the script from
//     getScriptURL: function() {
//         return [
//         	'https://www.google.com/recaptcha/api.js',
//         	'http://d3js.org/d3.v3.min.js'
//         ];
//     },

//     // ReactScriptLoaderMixin calls this function when the script has loaded
//     // successfully.
//     onScriptLoaded: function() {
//     	console.log('ReactScriptLoaderMixin: onScriptLoaded');
//         this.setState({scriptLoading: false});
//     },

//     // ReactScriptLoaderMixin calls this function when the script has failed to load.
//     onScriptError: function() {
//     	console.log('ReactScriptLoaderMixin: onScriptError');
//         this.setState({scriptLoading: false, scriptLoadError: true});
//     },

//     onScriptTagCreated: function() {
//     	console.log('ReactScriptLoaderMixin: onScriptTagCreated');
//     },

//     render: function() {
//         var message;
//         if (this.state.scriptLoading) {
//             message = 'loading script...';
//         } else if (this.state.scriptLoadError) {
//             message = 'loading failed';
//         } else {
//             message = 'loading succeeded';
//         }
//         return (
//         	<div>
// 	        	<div className="g-recaptcha" data-sitekey="6Lc4zggTAAAAAIQhg0kFlMA0qpy4PLyulMaPt-8-"></div>
// 	        	<span>{message}</span>
//         	</div>
//         );
//     }
// });

// module.exports = LoginForm;