var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var jwt = require('jsonwebtoken');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

// Load an access token from the session storage, you might want to implement
// a 'remember me' using localStorage
var _accessToken = JSON.parse(localStorage.getItem('accessToken'));
var _user = JSON.parse(localStorage.getItem('user'));
var _rememberMe = JSON.parse(localStorage.getItem('rememberme', 'false'));
var _sessionValidTime = JSON.parse(localStorage.getItem('session_valid_time'));
var _errors = [];
var _messages = [];
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

  isRememberMe: function() {
    return _rememberMe;
  },

  isSessionValid: function() {
    console.log('SessionStore: check session valid time', _sessionValidTime);
    if (_sessionValidTime) {
      var now = new Date();
      var valid = _sessionValidTime > now.getTime();
      console.log('SessionStore: session valid', valid);
      return valid
    }
    return false;
  },

  getAccessToken: function() {
    return _accessToken;
  },

  getUser: function() {
    console.log('SessionStore: getUser', _user);
    return _user;
  },

  getErrors: function() {
    return _errors;
  },

  getMessages: function() {
    return _messages;
  },

  isProcessing: function() {
    return _processing;
  },

  getServerResponses: function(action) {
    if (action.errors) {
      _errors = action.errors;
    } else {
      _errors = [];
    }
    console.log('SessionStore: errors', _errors);
    if (action.messages) {
      _messages = action.messages;
    } else {
      _messages = [];
    }
    console.log('SessionStore: messages', _messages);
  },

});

SessionStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.LOGIN_RESPONSE:
      console.log('SessionStore: LOGIN_RESPONSE')
      console.log(action);
      if (action.json && action.json.payload) {
        var payload = jwt.decode(action.json.payload);

        _accessToken = payload.client_token;
        _user = payload.user;
        // Token will always live in the session, so that the API can grab it with no hassle
        localStorage.setItem('accessToken', JSON.stringify(_accessToken));
        localStorage.setItem('user', JSON.stringify(_user));

        var now = new Date();
        var validTime = new Date(now.getTime() + 60000 * 5);
        _sessionValidTime = validTime.getTime();
        console.log('session valid time', _sessionValidTime);
        localStorage.setItem('session_valid_time', JSON.stringify(_sessionValidTime));

        if (action.json.rememberme) {
          console.log('store rememberme: ', action.json.rememberme);
          localStorage.setItem('rememberme', JSON.stringify(action.json.rememberme));
        }
      }
      
      _processing = false;
      SessionStore.getServerResponses(action);
      SessionStore.emitChange();
      break;

    case ActionTypes.LOGOUT_RESPONSE:
      console.log('SessionStore: LOGOUT_RESPONSE')
      _accessToken = null;
      _user = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      localStorage.removeItem('rememberme');
      localStorage.removeItem('session_valid_time');
      
      _processing = false;
      SessionStore.getServerResponses(action);
      SessionStore.emitChange();
      break;

    case ActionTypes.RECEIVE_UPDATED_USER:
      console.log('SessionStore: RECEIVE_UPDATED_USER');
      if (action.json && action.json.user) {
        _user = action.json.user;
        localStorage.setItem('user', JSON.stringify(_user));
      }
      SessionStore.getServerResponses(action);
      SessionStore.emitChange();
      break;

    default:
  }
  
  return true;
});

module.exports = SessionStore;

