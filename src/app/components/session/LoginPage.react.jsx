var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var SessionActionCreators = require('../../actions/SessionActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var LoginForm = require('./LoginForm.react.jsx');

var LoginPage = React.createClass({
 
  componentDidMount: function() {
    document.body.classList.add('error-body');
    document.body.classList.add('no-top');
  },

  componentWillUnmount: function() {
    document.body.classList.remove('error-body');
    document.body.classList.remove('no-top'); 
  },

  render: function() {
    return (
      <div className="row login-container column-seperation">
        <div className="col-md-10 col-md-offset-1">
          <h2>Login <span className="highlight">Jualio</span></h2>
          <br/>
          <p>
            Jika Anda belum menjadi member Jualio, 
            silahkan <Link to="signup">daftar</Link> sekarang supaya anda bisa menjual barang 
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
});

module.exports = LoginPage;

