var React = require('react');
var SessionActionCreators = require('../../actions/SessionActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var ReactScriptLoader = require('react-script-loader');
var Config = require('config');

var LoginForm = React.createClass({

  mixins: [ReactScriptLoader.ReactScriptLoaderMixin],

  getInitialState: function() {
    return { 
      errors: [],
      loginProcessing: false,
      scriptLoading: true,
      scriptLoadError: false, 
    };
  },
 
  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    // get state from store 
    this.setState({ 
      errors: SessionStore.getErrors(), 
      loginProcessing: SessionStore.isProcessing() 
    });
  },

  _onSubmit: function(e) {
    e.preventDefault();
    this.setState({ 
      errors: [], 
      loginProcessing: true 
    });
    this.refs.submitButton.getDOMNode().blur();
    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    var rememberme = this.refs.rememberme.getDOMNode().checked;
    var captcha = document.getElementById('g-recaptcha-response').value;
    SessionActionCreators.login(email, password, rememberme, captcha);
  },
 
  getScriptURL: function() {
    return 'https://www.google.com/recaptcha/api.js';
  },

  // ReactScriptLoaderMixin calls this function when the script has loaded
  // successfully.
  onScriptLoaded: function() {
    console.log('LoginForm: onScriptLoaded');
      this.setState({scriptLoading: false});
  },

  // ReactScriptLoaderMixin calls this function when the script has failed to load.
  onScriptError: function() {
    console.log('LoginForm: onScriptLoaded');
    this.setState({scriptLoading: false, scriptLoadError: true});
  },

  onScriptTagCreated: function() {
    console.log('LoginForm: onScriptTagCreated');
  },

  render: function() {
    console.log('captcha site key', Config.CaptchaSiteKey);
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    return (
      <div>
        <form role="form" id="login-form" className="login-form">
          <div className="row">
            <div className="col-md-12">
              {errors}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-12">
              <label className="form-label">Username</label>
              <div className="controls">
                <div className="input-with-icon right">
                  <i></i>
                  <input ref="email" id="txtemail" type="text"
                    name="email" className="form-control" placeholder="email@anda.com" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-12">
              <label className="form-label">Password</label><span className="help"></span>
              <div className="controls">
                <div className="input-with-icon right"><i></i>
                  <input ref="password" id="txtpassword" type="password"
                    name="txtpassword" className="form-control" placeholder="password"/>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-12">
              <label className="form-label">Captcha</label><span className="help"></span>
              <div className="controls">
                <div className="input-with-icon right"><i></i>
                  <div className="g-recaptcha" 
                    data-sitekey={Config.CaptchaSiteKey}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="control-group col-md-12">
              <div className="checkbox checkbox check-success">
                <input ref="rememberme" id="checkbox1" type="checkbox" value="1" defaultChecked={true}/>
                <label htmlFor="checkbox1">Ingat Saya untuk 2 minggu</label>
                <p>
                  Klik <a href="#">disini?</a> untuk melaporkan kejadian fraud
                </p>
                <p>
                  <a href="#">Lupa password Anda?</a>
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <button type="submit" className="btn btn-primary btn-cons pull-right"
                ref="submitButton"
                onClick={!this.state.loginProcessing ? this._onSubmit : null}
                disabled={this.state.scriptLoading || this.state.loginProcessing}>
                  {this.state.loginProcessing ? 'Loading...' : 'Login'}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = LoginForm;

