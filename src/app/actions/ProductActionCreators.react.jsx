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

};

