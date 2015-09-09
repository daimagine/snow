var ServerActionCreators = require('../actions/ServerActionCreators.react.jsx');
var GrowlActionCreators = require('../actions/GrowlActionCreators.react.jsx');
var AppConstants = require('../constants/AppConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils');
var APIEndpoints = AppConstants.APIEndpoints;
var request = WebAPIUtils.api.request;

var SessionStore = require('../stores/SessionStore.react.jsx');
var ReportStore = require('../stores/ReportStore.react.jsx');

var getUser = function() {
  return SessionStore.getUser();
}
var getAccessToken = function() {
  return SessionStore.getAccessToken();
}

module.exports = {

  loadSalesOverview: function() {
    console.log('ReportService: loadSalesOverview');
    var customerId = getUser().id;
    request.get(APIEndpoints.SALES_OVERVIEW + '/' + customerId)
      .type('application/json')
      .set('Authorization', getAccessToken())
      .end(function(error, res) {
        if (res) {
          console.log(res);
          if (res.error) {
            var errorMsgs = WebAPIUtils.getErrors(res);
            ServerActionCreators.receiveSalesOverview(null, errorMsgs);
            GrowlActionCreators.notify(errorMsgs, 'error');
          } else {
            var json = res.body;
            var messages = WebAPIUtils.getMessages(res);
            ServerActionCreators.receiveSalesOverview(json, null, messages);
            GrowlActionCreators.notify(messages, 'success');
          }
        }
      });
  },

};

