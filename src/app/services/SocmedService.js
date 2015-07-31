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

  loadSocmedAccounts: function(customerId) {
    console.log('SocmedService: loadCustomerSocmed - userID: ', customerId);
    request.get(APIEndpoints.CUSTOMER_SOCMEDS)
      .query('customer=' + customerId )
      .type('application/json')
      .set('Authorization', getAccessToken())
      .end(function(error, res){
        if (res) {
          console.log(res);
          if (res.error) {
            var errorMsgs = WebAPIUtils.getErrors(res);
            ServerActionCreators.receiveSocmedAccounts(null, errorMsgs);
          } else {
            var json = res.body;
            var messages = WebAPIUtils.getMessages(res);
            ServerActionCreators.receiveSocmedAccounts(json, null, messages);
          }
        }
      });
  },

  postToSocmeds: function(params) {
    console.log('SocmedService: postToSocmed', params);
    var affiliate_id = 0;
    var productPage = params.product.product_page;
    if (params.affiliate) {
      productPage = params.affiliate.product_page;
      affiliate_id = params.affiliate.id;
    }
    var socmedParams = {
      headline: params.headline,
      product_page: productPage,
      socmed_accounts: params.socmedAccounts,
      product_id: params.product.id,
      affiliate_id: affiliate_id
    };

    request.post(APIEndpoints.SOCMEDS_POSTING)
      .send(socmedParams)
      .type('application/json')
      .set('Authorization', getAccessToken())
      .end(function(error, res) {
        if (res) {
          console.log(res);
          if (res.error) {
            var errorMsgs = WebAPIUtils.getErrors(res);
            ServerActionCreators.receiveSocmedPostingResponse(null, errorMsgs);
          } else {
            var json = res.body;
            var messages = WebAPIUtils.getMessages(res);
            ServerActionCreators.receiveSocmedPostingResponse(json, null, messages);
          }
        }
      });
  }

};

