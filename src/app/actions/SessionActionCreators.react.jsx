var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var AuthService = require('../services/AuthService.js');

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

  login: function(email, password, captcha) {
    AuthService.login(email, password, captcha);
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOGIN_REQUEST,
      email: email,
      password: password,
      captcha: captcha
    });
  },

  logout: function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOGOUT
    });
  }
  
};

