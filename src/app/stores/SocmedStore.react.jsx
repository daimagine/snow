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

    case ActionTypes.RECEIVE_UPDATED_SOCMED_ACCOUNT:
      console.log('SocmedStore: RECEIVE_UPDATED_SOCMED_ACCOUNT');
      if (action.json && action.json.social_media_account) {
        var _socmedAccount = action.json.social_media_account;
        for (var idx in _socmedAccounts) {
            var socmedAccount = _socmedAccounts[idx];
            if (socmedAccount.id == _socmedAccount.id) {
              _socmedAccounts[idx] = _socmedAccount;
              break;
            }
          }
      }
      SocmedStore.getServerResponses(action);
      SocmedStore.emitChange();
      break;

    case ActionTypes.RECEIVE_REMOVE_RESPONSE_SOCMED_ACCOUNT:
      console.log('SocmedStore: RECEIVE_REMOVE_RESPONSE_SOCMED_ACCOUNT');
      if (action.json && action.json.success) {
        var affected_ids = [];
        if (action.json.affected_ids) {
          affected_ids = action.json.affected_ids
        }
        console.log('SocmedStore: affected_ids', affected_ids);
        for (var idx in _socmedAccounts) {
          var socmedAccount = _socmedAccounts[idx];
          console.log('SocmedStore: socmedAccount', socmedAccount);
          if (affected_ids.indexOf(socmedAccount.id) > -1) {
            _socmedAccounts.splice(idx, 1);
            break;
          }
        }
      }
      SocmedStore.getServerResponses(action);
      SocmedStore.emitChange();
      break;
	}

	return true;
});

module.exports = SocmedStore;