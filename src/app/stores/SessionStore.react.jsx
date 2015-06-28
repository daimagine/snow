var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var jwt = require('jsonwebtoken');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

// Load an access token from the session storage, you might want to implement
// a 'remember me' using localStorage
var _accessToken = sessionStorage.getItem('accessToken');
var _user = sessionStorage.getItem('user');
var _errors = [];
var _processing = false;

var SessionStore = assign({}, EventEmitter.prototype, {
  
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isLoggedIn: function() {
    return _accessToken ? true : false;    
  },

  getAccessToken: function() {
    return _accessToken;
  },

  getUser: function() {
    return _user;
  },

  getErrors: function() {
    return _errors;
  },

  isProcessing: function() {
    return _processing;
  }

});

SessionStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.LOGIN_RESPONSE:
      console.log(action);
      if (action.json && action.json.payload) {
        var payload = jwt.decode(action.json.payload);

        _accessToken = payload.client_token;
        _user = payload.user;
        // Token will always live in the session, so that the API can grab it with no hassle
        sessionStorage.setItem('accessToken', _accessToken);
        sessionStorage.setItem('user', _user);
      }
      if (action.errors) {
        _errors = action.errors;
      }
      _processing = false;
      SessionStore.emitChange();
      break;

    case ActionTypes.LOGOUT:
      _accessToken = null;
      _user = null;
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('user');
      _processing = false;
      SessionStore.emitChange();
      break;

    default:
  }
  
  return true;
});

module.exports = SessionStore;

