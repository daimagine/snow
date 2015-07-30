var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _socmedAccounts = [];
var _errors = [];
var _messages = [];


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
			if (action.errors) {
				_errors = action.errors;
			} else {
				_errors = [];
			}
			SocmedStore.emitChange();
			break;
	}

	return true;
});

module.exports = SocmedStore;