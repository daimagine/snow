var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _product = null;
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

  getProduct: function() {
  	return _product;
  }

});

ProductStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	console.log('ProductStore: action', action);

	switch(action.type) {
		case ActionTypes.RECEIVE_PRODUCTS:
			console.log('ProductStore: RECEIVE_PRODUCTS');
			if (action.json && action.json.products) {
				_products = action.json.products;
			}
			if (action.errors) {
				_errors = action.errors;
			} else {
				_errors = [];
			}
			ProductStore.emitChange();
			break;

		case ActionTypes.RECEIVE_PRODUCT:
			console.log('ProductStore: RECEIVE_PRODUCT');
			if (action.json && action.json.product) {
				_product = action.json.product;
			}
			if (action.errors) {
				_errors = action.errors;
			} else {
				_errors = [];
			}
			ProductStore.emitChange();
			break;
	}

	return true;
});

module.exports = ProductStore;