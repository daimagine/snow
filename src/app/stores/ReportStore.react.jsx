var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _salesOverview = {
  count: 0,
  amount: 0
};
var _errors = [];
var _messages = [];
var _response = {};


var ReportStore = assign({}, EventEmitter.prototype, {

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

  getSalesOverview: function() {
  	return _salesOverview;
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
    console.log('ReportStore: errors', _errors);
  	if (action.messages) {
  		_messages = action.messages;
  	} else {
  		_messages = [];
  	}
    console.log('ReportStore: messages', _messages);
  }

});

ReportStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.type) {
    case ActionTypes.RECEIVE_SALES_OVERVIEW:
      console.log('ReportStore: RECEIVE_SALES_OVERVIEW');
      if (action.json && action.json.sales_overview) {
        _salesOverview = action.json.sales_overview;
      }
      ReportStore.getServerResponses(action);
      ReportStore.emitChange();
      break;
	}

	return true;
});

module.exports = ReportStore;