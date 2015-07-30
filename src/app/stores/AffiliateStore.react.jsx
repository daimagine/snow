var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _affiliate = null;
var _affiliates = [];
var _errors = [];
var _messages = [];


var AffiliateStore = assign({}, EventEmitter.prototype, {

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

  getAllAffiliates: function() {
  	return _affiliates;
  },

  getAffiliate: function() {
  	return _affiliate;
  }

});

AffiliateStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.type) {
		case ActionTypes.RECEIVE_AFFILIATES:
			console.log('AffiliateStore: RECEIVE_AFFILIATES');
			if (action.json && action.json.affiliates) {
				_affiliates = action.json.affiliates;
			}
			if (action.errors) {
				_errors = action.errors;
			} else {
				_errors = [];
			}
			AffiliateStore.emitChange();
			break;

		case ActionTypes.RECEIVE_AFFILIATE:
			console.log('AffiliateStore: RECEIVE_AFFILIATE');
			if (action.json && action.json.affiliate) {
				_affiliate = action.json.affiliate;
			}
			if (action.errors) {
				_errors = action.errors;
			} else {
				_errors = [];
			}
			AffiliateStore.emitChange();
			break;
	}

	return true;
});

module.exports = AffiliateStore;