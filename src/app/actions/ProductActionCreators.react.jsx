var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var ProductService = require('../services/ProductService.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  loadCustomerProducts: function() {
    ProductService.loadCustomerProducts();
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_PRODUCTS
    });
  },
  
  loadProduct: function(productId) {
    ProductService.loadProduct(productId);
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_PRODUCT,
      productId: productId
    });
  },

  updateProduct: function(product) {
    ProductService.updateProduct(product);
    AppDispatcher.handleViewAction({
      type: ActionTypes.UPDATE_PRODUCT,
      product: product
    });
  },

  loadCustomerAffiliateProducts: function() {
    ProductService.loadCustomerAffiliateProducts();
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_AFFILIATE_PRODUCTS
    });
  },

  searchAffiliateProducts: function(criteria) {
    ProductService.searchAffiliateProducts(criteria);
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_AFFILIATE_PRODUCTS,
      criteria: criteria
    });
  },

  sortAffiliateProducts: function(criteria) {
    ProductService.sortAffiliateProducts(criteria);
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_AFFILIATE_PRODUCTS,
      criteria: criteria
    });
  },

  joinAffiliate: function(user, product) {
    ProductService.joinAffiliate(user, product);
    AppDispatcher.handleViewAction({
      type: ActionTypes.JOIN_AFFILIATE_PRODUCT,
      user: user,
      product: product
    });
  },

  removeAffiliate: function(user, product) {
    ProductService.removeAffiliate(user, product);
    AppDispatcher.handleViewAction({
      type: ActionTypes.REMOVE_AFFILIATE_PRODUCT,
      user: user,
      product: product
    });
  },

  updateProductAffiliateInfo: function(product) {
    ProductService.updateProductAffiliateInfo(product);
    AppDispatcher.handleViewAction({
      type: ActionTypes.UPDATE_PRODUCT_AFFILIATE_INFO,
      product: product
    });
  },

};

