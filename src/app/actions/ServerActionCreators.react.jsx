var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  receiveLogin: function(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveLogout: function(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOGOUT,
      json: json,
      errors: errors
    });
  },

  receiveStories: function(json) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_STORIES,
      json: json
    });
  },

  receiveStory: function(json) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_STORY,
      json: json
    });
  },
  
  receiveCreatedStory: function(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_CREATED_STORY,
      json: json,
      errors: errors
    });
  },

  receiveProducts: function(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_PRODUCTS,
      json: json,
      errors: errors
    });
  },

  receiveProduct: function(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_PRODUCT,
      json: json,
      errors: errors
    });
  },

  receiveUpdatedProduct: function(json, errors, messages) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_UPDATED_PRODUCT,
      json: json,
      errors: errors,
      messages: messages
    })
  },

  receiveSocmedAccounts: function(json, errors, messages) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_SOCMED_ACCOUNTS,
      json: json,
      errors: errors,
      messages: messages
    })
  },

  receiveAffiliateInfo: function(json, errors, messages) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_AFFILIATE,
      json: json,
      errors: errors,
      messages: messages
    })
  },

  receiveSocmedPostingResponse: function(json, errors, messages) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_SOCMED_POSTING_RESPONSE,
      json: json,
      errors: errors,
      messages: messages
    })
  },

  receiveTwitterRedirectUrl: function(json, errors, messages) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_TWITTER_REDIRECT_URL,
      json: json,
      errors: errors,
      messages: messages
    })
  },

  receiveTwitterVerifyResult: function(json, errors, messages) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_TWITTER_VERIFY_RESULT,
      json: json,
      errors: errors,
      messages: messages
    })
  }
  
};

