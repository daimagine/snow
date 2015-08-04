var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _product = null;
var _products = [];
var _errors = [];
var _messages = [];


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

  getMessages: function() {
  	return _messages;
  },

  getAllProducts: function() {
  	return _products;
  },

  getProduct: function() {
  	return _product;
  },

  getServerResponses: function(action) {
	if (action.errors) {
		_errors = action.errors;
	} else {
		_errors = [];
	}
	console.log('ProductStore: errors', _errors);
	if (action.messages) {
		_messages = action.messages;
	} else {
		_messages = [];
	}
	console.log('ProductStore: messages', _messages);
  },

  isProductAffiliator: function(user, prefferedProduct) {
  	var product = this.getProduct();
  	if (prefferedProduct) {
  		product = prefferedProduct;
  	}
  	console.log('check if affiliator of product', user.id, product.id);
  	if (product && product.affiliates) {
	   	return ProductStore.isInAffiliateList(user, product.affiliates);
  	}
  	return false;
  },

  isInAffiliateList: function(user, affiliates) {
  	console.log('check if affiliator of affiliates', user.id, affiliates);
  	for (var idx in affiliates) {
  		var affiliate = affiliates[idx];
  		console.log('check isProductAffiliator', affiliate);
  		if (user.id == affiliate.customer.id) 
  			return true;
  	}
  }

});

ProductStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.type) {
		case ActionTypes.RECEIVE_PRODUCTS:
			console.log('ProductStore: RECEIVE_PRODUCTS');
			if (action.json && action.json.products) {
				_products = action.json.products;
			}
			ProductStore.getServerResponses(action);
			ProductStore.emitChange();
			break;

		case ActionTypes.RECEIVE_PRODUCT:
			console.log('ProductStore: RECEIVE_PRODUCT');
			if (action.json && action.json.product) {
				_product = action.json.product;
			}
			ProductStore.getServerResponses(action);
			ProductStore.emitChange();
			break;

		case ActionTypes.RECEIVE_UPDATED_PRODUCT:
			console.log('ProductStore: RECEIVE_UPDATED_PRODUCT');
			if (action.json && action.json.product) {
				_product = action.json.product;
			}
			ProductStore.getServerResponses(action);
			ProductStore.emitChange();
			break;

		case ActionTypes.RECEIVE_SOCMED_POSTING_RESPONSE:
			console.log('ProductStore: RECEIVE_SOCMED_POSTING_RESPONSE');
			if (action.json && action.json.product) {
				_product = action.json.product;
			}
			ProductStore.getServerResponses(action);
			ProductStore.emitChange();
			break;
	}

	return true;
});

module.exports = ProductStore;