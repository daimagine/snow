var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _socmedAccounts = [];
var _errors = [];
var _messages = [];
var _response = {};


var SocmedStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getErrors: function() {
    return _errors;
  },

  getMessages: function() {
    return _messages;
  },

  getSocmedAccounts: function() {
  	return _socmedAccounts;
  },

  getResponse: function() {
    return _response;
  },

  getServerResponses: function(action) {
  	if (action.errors) {
  		_errors = action.errors;
  	} else {
  		_errors = [];
  	}
    console.log('SocmedStore: errors', _errors);
  	if (action.messages) {
  		_messages = action.messages;
  	} else {
  		_messages = [];
  	}
    console.log('SocmedStore: messages', _messages);
  }

});

SocmedStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.type) {
    case ActionTypes.RECEIVE_SOCMED_ACCOUNTS:
      console.log('SocmedStore: RECEIVE_SOCMED_ACCOUNTS');
      if (action.json && action.json.social_media_accounts) {
        _socmedAccounts = action.json.social_media_accounts;
      }
      SocmedStore.getServerResponses(action);
      SocmedStore.emitChange();
      break;

    case ActionTypes.RECEIVE_TWITTER_REDIRECT_URL:
      console.log('SocmedStore: RECEIVE_TWITTER_REDIRECT_URL');
      if (action.json && action.json.redirect_url) {
        _response = {
          redirect_url: action.json.redirect_url,
          request_token: action.json.request_token
        }
      }
      SocmedStore.getServerResponses(action);
      SocmedStore.emitChange();
      break;

    case ActionTypes.RECEIVE_TWITTER_VERIFY_RESULT:
      console.log('SocmedStore: RECEIVE_TWITTER_VERIFY_RESULT');
      if (action.json && action.json.twitter_account) {
        _response = {
          twitter_account: action.json.twitter_account
        }
      }
      SocmedStore.getServerResponses(action);
      SocmedStore.emitChange();
      break;
	}

	return true;
});

module.exports = SocmedStore;