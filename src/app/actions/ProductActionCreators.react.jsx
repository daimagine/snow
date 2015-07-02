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

};

