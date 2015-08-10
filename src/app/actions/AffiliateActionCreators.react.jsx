var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var AffiliateService = require('../services/AffiliateService.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  loadAffiliateInfo: function(productId, customerId) {
    AffiliateService.loadAffiliateInfo(productId, customerId);
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_AFFILIATE,
      productId: productId,
      customerId: customerId
    });
  },

};

