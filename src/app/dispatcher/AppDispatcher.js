var AppConstants = require('../constants/AppConstants.js');
var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var PayloadSources = AppConstants.PayloadSources;

var AppDispatcher = assign(new Dispatcher(), {

  handleServerAction: function(action) {
    console.log('AppDispatcher: handleServerAction', action);
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
      this.dispatch(payload);
    }
  },

  handleViewAction: function(action) {
    console.log('AppDispatcher: handleViewAction', action);
    if (!action.type) {
      console.log('AppDispatcher: empty action');
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
      this.dispatch(payload);
    }
  }
});

module.exports = AppDispatcher;

