var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _notification = null;


var GrowlStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getNotification: function() {
    var notif = _notification;
    _notification = null;
    console.log('GrowlStore: getNotification', notif);
    return notif;
  },

});

GrowlStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.type) {
    case ActionTypes.NOTIFY:
      console.log('GrowlStore: NOTIFY', action);
      _notification =  action.notification
      GrowlStore.emitChange();
      break;
	}

	return true;
});

module.exports = GrowlStore;