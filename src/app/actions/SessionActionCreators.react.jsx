var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var AuthService = require('../services/AuthService.js');
var UserService = require('../services/UserService.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  signup: function(email, username, password, passwordConfirmation) {
    AuthService.signup(email, username, password, passwordConfirmation);
    AppDispatcher.handleViewAction({
      type: ActionTypes.SIGNUP_REQUEST,
      email: email,
      username: username,
      password: password,
      passwordConfirmation: passwordConfirmation
    });
  },

  login: function(email, password, rememberme, captcha) {
    AuthService.login(email, password, rememberme, captcha);
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOGIN_REQUEST,
      email: email,
      password: password,
      rememberme: rememberme,
      captcha: captcha
    });
  },

  logout: function() {
    AuthService.logout();
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOGOUT_REQUEST
    });
  },

  updateUser: function(user) {
    UserService.updateUser(user);
    AppDispatcher.handleViewAction({
      type: ActionTypes.UPDATE_USER
    })
  }
  
};

