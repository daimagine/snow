var ServerActionCreators = require('../actions/ServerActionCreators.react.jsx');
var AppConstants = require('../constants/AppConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');
var APIEndpoints = AppConstants.APIEndpoints;
var request = WebAPIUtils.api.request;


module.exports = {

  signup: function(email, username, password, passwordConfirmation) {
    console.log('AuthService: signup');
    request.post(APIEndpoints.REGISTRATION)
      .send({ user: { 
        email: email, 
        username: username,
        password: password,
        password_confirmation: passwordConfirmation
      }})
      .type('json')
      .end(function(error, res) {
        if (res) {
            console.log(res);
          if (res.error) {
            var errorMsgs = WebAPIUtils.getErrors(res);
            ServerActionCreators.receiveLogin(null, errorMsgs);
          } else {
            var json = res.body;
            ServerActionCreators.receiveLogin(json, null);
          }
        }
      });
  },

  login: function(email, password, rememberme, captcha) {
    console.log('AuthService: login');
    request.post(APIEndpoints.LOGIN)
      .send({ email: email, password: password, captcha: captcha })
      .type('json')
      .end(function(error, res){
        if (res) {
          console.log(res);
          if (res.error) {
            var errorMsgs = WebAPIUtils.getErrors(res);
            ServerActionCreators.receiveLogin(null, errorMsgs);
          } else {
            var json = res.body;
            json.rememberme = rememberme;
            ServerActionCreators.receiveLogin(json, null);
          }
        } else {
          var errorMsgs = ["Server tidak merespon"];
          ServerActionCreators.receiveLogin(null, errorMsgs);
        }
      });
  },

  logout: function() {
    console.log('AuthService: logout');
    ServerActionCreators.receiveLogout();
  },

  authenticateToken: function(callback) {
    console.log('AuthService: authenticateToken');
    var accessToken = JSON.parse(localStorage.getItem('accessToken'));
    console.log('AuthService: stored accessToken', accessToken);
    if (accessToken) {
      request.post(APIEndpoints.AUTHENTICATE_TOKEN)
        .send({client_token: accessToken})
        .type('json')
        .end(function(error, res) {
          if (res) {
            console.log(res);
            if (res.error) {
              var errorMsgs = WebAPIUtils.getErrors(res);
              console.log(errorMsgs);
              ServerActionCreators.receiveLogout(null, errorMsgs);
            } else {
              var json = res.body;
              ServerActionCreators.receiveLogin(json, null);
            }
          }
          callback();
        });
    } else {
      callback();
    }
  }

};

