var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _products = [];
var _errors = [];


var ProductStore = assign({}, EventEmitter.prototype, {

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

  getAllProducts: function() {
  	return _products;
  },

});

ProductStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action) {
		case ActionTypes.RECEIVE_PRODUCTS:
			console.log('ProductStore: RECEIVE_PRODUCTS');
			console.log(action);
			if (action.json && action.json.products) {
				_products = action.json.products;
			}
			if (action.errors) {
			_errors = action.errors;
			}
			ProductStore.emitChange();
			break;
	}

	return true;
});

module.exports = ProductStore;