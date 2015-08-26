var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  notify: function(messages, lvl='info') {
    var notify = function(message, lvl) {
      AppDispatcher.handleViewAction({
        type: ActionTypes.NOTIFY,
        notification: {
          lvl: lvl,
          msg: message
        }
      });
    }
    if (messages instanceof Array) {
      messages.map(function(msg) {
        notify(msg, lvl)
      });
    } else {
      notify(messages, lvl);
    }
  },

};

