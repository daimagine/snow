var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  redirect: function(route, storageMessage=null) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.REDIRECT,
      route: route,
      storageMessage: storageMessage
    });
  },

};


