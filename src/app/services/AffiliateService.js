var ServerActionCreators = require('../actions/ServerActionCreators.react.jsx');
var AppConstants = require('../constants/AppConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils');
var APIEndpoints = AppConstants.APIEndpoints;
var request = WebAPIUtils.api.request;

var SessionStore = require('../stores/SessionStore.react.jsx');

var getUser = function() {
  return SessionStore.getUser();
}
var getAccessToken = function() {
  return SessionStore.getAccessToken();
}

module.exports = {

  loadAffiliateInfo: function(productId, customerId) {
    console.log('AffiliateService: loadAffiliateInfo');
    request.get(APIEndpoints.AFFILIATES)
      .query('product=' + productId )
      .query('customer=' + customerId )
      .type('application/json')
      .set('Authorization', getAccessToken())
      .end(function(error, res){
        if (res) {
          console.log(res);
          if (res.error) {
            var errorMsgs = WebAPIUtils.getErrors(res);
            ServerActionCreators.receiveAffiliateInfo(null, errorMsgs);
          } else {
            var json = res.body;
            ServerActionCreators.receiveAffiliateInfo(json, null);
          }
        }
      });
  },

};

