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
  },

  addTwitterAccount: function(customerId) {
    SocmedService.addTwitterAccount(customerId);
    AppDispatcher.handleViewAction({
      type: ActionTypes.ADD_TWITTER_ACCOUNT,
      customerId: customerId
    });
  },

  verifyTwitterAccount: function(customerId, verifier) {
    SocmedService.verifyTwitterAccount(customerId, verifier);
    AppDispatcher.handleViewAction({
      type: ActionTypes.VERIFY_TWITTER_ACCOUNT,
      customerId: customerId,
      verifier: verifier
    });
  },

  deleteSocmedAccount: function(id) {
    SocmedService.deleteSocmedAccount(id);
    AppDispatcher.handleViewAction({
      type: ActionTypes.DELETE_SOCMED_ACCOUNT,
      id: id
    })
  },

  addFbAccount: function(customerId) {
    SocmedService.addFbAccount(customerId);
    AppDispatcher.handleViewAction({
      type: ActionTypes.ADD_FB_ACCOUNT,
      customerId: customerId
    });
  },

  verifyFbAccount: function(customerId, verifier) {
    SocmedService.verifyFbAccount(customerId, verifier);
    AppDispatcher.handleViewAction({
      type: ActionTypes.VERIFY_FB_ACCOUNT,
      customerId: customerId,
      verifier: verifier
    });
  },

};

