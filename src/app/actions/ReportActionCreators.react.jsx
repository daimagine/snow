var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var ReportService = require('../services/ReportService.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  loadSalesOverview: function() {
    ReportService.loadSalesOverview();
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_SALES_OVERVIEW
    });
  },

};

