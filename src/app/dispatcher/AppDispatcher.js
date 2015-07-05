var AppConstants = require('../constants/AppConstants.js');
var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var PayloadSources = AppConstants.PayloadSources;

var AppDispatcher = assign(new Dispatcher(), {

  handleServerAction: function(action) {
    if (!action.type) {
      console.log('AppDispatcher: handleServerAction empty action');
      return
    }
    
    var payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };
    if (this.$Dispatcher_isDispatching) {
      window.setTimeout(() => {
        console.log('AppDispatcher: handleServerAction setTimeout', action);
        this.dispatch(payload);
      });
    } else {
      console.log('AppDispatcher: handleServerAction', action);
      this.dispatch(payload);
    }
  },

  handleViewAction: function(action) {
    if (!action.type) {
      console.log('AppDispatcher: handleViewAction empty action');
      return
    }

    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    if (this.$Dispatcher_isDispatching) {
      window.setTimeout(() => {
        console.log('AppDispatcher: handleViewAction setTimeout', action);
        this.dispatch(payload);
      });
    } else {
      console.log('AppDispatcher: handleViewAction', action);
      this.dispatch(payload);
    }
  }
});

module.exports = AppDispatcher;

