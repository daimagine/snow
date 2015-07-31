var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var SocmedService = require('../services/SocmedService.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  loadSocmedAccounts: function(customerId) {
    SocmedService.loadSocmedAccounts(customerId);
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_SOCMED_ACCOUNTS,
      customerId: customerId
    });
  },

  postToSocmeds: function(params) {
    SocmedService.postToSocmeds(params);
    AppDispatcher.handleViewAction({
      type: ActionTypes.POST_TO_SOCMEDS,
      params: params
    });
  }

};

