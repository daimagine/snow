var ServerActionCreators = require('../actions/ServerActionCreators.react.jsx');
var GrowlActionCreators = require('../actions/GrowlActionCreators.react.jsx');
var AppConstants = require('../constants/AppConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils');
var APIEndpoints = AppConstants.APIEndpoints;
var SocmedConstant = AppConstants.SocmedConstant;
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
            GrowlActionCreators.notify(errorMsgs, 'error');
          } else {
            var json = res.body;
            var messages = WebAPIUtils.getMessages(res);
            ServerActionCreators.receiveSocmedAccounts(json, null, messages);
            GrowlActionCreators.notify(messages, 'success');
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
            GrowlActionCreators.notify(errorMsgs, 'error');
          } else {
            var json = res.body;
            var messages = WebAPIUtils.getMessages(res);
            ServerActionCreators.receiveSocmedPostingResponse(json, null, messages);
            GrowlActionCreators.notify(messages, 'success');
          }
        }
      });
  },

  addTwitterAccount: function(customerId) {
    console.log('SocmedService: addTwitterAccount', customerId);
    request.get(APIEndpoints.GET_TWITTER_REDIRECT_URL)
      .query({ customer: customerId })
      .query({ callback_url: SocmedConstant.TWITTER.CALLBACK_URL })
      .type('application/json')
      .set('Authorization', getAccessToken())
      .end(function(error, res) {
        if (res) {
          console.log(res);
          if (res.error) {
            var errorMsgs = WebAPIUtils.getErrors(res);
            ServerActionCreators.receiveTwitterRedirectUrl(null, errorMsgs);
            GrowlActionCreators.notify(errorMsgs, 'error');
          } else {
            var json = res.body;
            var messages = WebAPIUtils.getMessages(res);
            ServerActionCreators.receiveTwitterRedirectUrl(json, null, messages);
            GrowlActionCreators.notify(messages, 'success');
          }
        }
      });
  },

  verifyTwitterAccount: function(customerId, verifier) {
    console.log('SocmedService: verifyTwitterAccount', customerId, verifier);
    var request_token = JSON.parse(sessionStorage.getItem(SocmedConstant.TWITTER.REQUEST_TOKEN_KEY));
    sessionStorage.removeItem(SocmedConstant.TWITTER.REQUEST_TOKEN_KEY);
    var socmedParams = {
      customer_id: customerId,
      request_token : request_token,
      verifier: verifier
    }
    console.log('SocmedService: verifyTwitterAccount socmedParams', socmedParams);

    request.post(APIEndpoints.VERIFY_TWITTER_ACCOUNT)
      .send(socmedParams)
      .type('application/json')
      .set('Authorization', getAccessToken())
      .end(function(error, res) {
        if (res) {
          console.log(res);
          if (res.error) {
            var errorMsgs = WebAPIUtils.getErrors(res);
            ServerActionCreators.receiveTwitterVerifyResult(null, errorMsgs);
            GrowlActionCreators.notify(errorMsgs, 'error');
          } else {
            var json = res.body;
            var messages = WebAPIUtils.getMessages(res);
            ServerActionCreators.receiveTwitterVerifyResult(json, null, messages);
            GrowlActionCreators.notify(messages, 'success');
          }
        }
      });
  },

  deleteSocmedAccount: function(id) {
    console.log('SocmedService: deleteSocmedAccount', id);
    request.del(APIEndpoints.CUSTOMER_SOCMEDS + "/" + id)
      .type('application/json')
      .set('Authorization', getAccessToken())
      .end(function(error, res) {
        if (res) {
          console.log(res);
          if (res.error) {
            var errorMsgs = WebAPIUtils.getErrors(res);
            ServerActionCreators.receiveRemoveResponseSocmedAccount(null, errorMsgs);
            GrowlActionCreators.notify(errorMsgs, 'error');
          } else {
            var json = res.body;
            json.affected_ids = [Number(id)];
            var messages = WebAPIUtils.getMessages(res);
            ServerActionCreators.receiveRemoveResponseSocmedAccount(json, null, messages);
            GrowlActionCreators.notify(messages, 'success');
          }
        }
      });
  },

  addFbAccount: function(customerId) {
    console.log('SocmedService: addFbAccount', customerId);
    var callback_url = SocmedConstant.FB.CALLBACK_URL;
    request.get(APIEndpoints.GET_FB_REDIRECT_URL)
      .query({ customer: customerId })
      .query({ callback_url: callback_url })
      .type('application/json')
      .set('Authorization', getAccessToken())
      .end(function(error, res) {
        if (res) {
          console.log(res);
          if (res.error) {
            var errorMsgs = WebAPIUtils.getErrors(res);
            ServerActionCreators.receiveFbRedirectUrl(null, errorMsgs);
            GrowlActionCreators.notify(errorMsgs, 'error');
          } else {
            var json = res.body;
            var messages = WebAPIUtils.getMessages(res);
            ServerActionCreators.receiveFbRedirectUrl(json, null, messages);
            GrowlActionCreators.notify(messages, 'success');
          }
        }
      });
  },

  verifyFbAccount: function(customerId, verifier) {
    console.log('SocmedService: verifyFbAccount', customerId, verifier);
    var socmedParams = {
      customer_id: customerId,
      verifier: verifier,
      callback_url: SocmedConstant.FB.CALLBACK_URL
    }
    console.log('SocmedService: verifyFbAccount socmedParams', socmedParams);

    request.post(APIEndpoints.VERIFY_FB_ACCOUNT)
      .send(socmedParams)
      .type('application/json')
      .set('Authorization', getAccessToken())
      .end(function(error, res) {
        if (res) {
          console.log(res);
          if (res.error) {
            var errorMsgs = WebAPIUtils.getErrors(res);
            ServerActionCreators.receiveFbVerifyResult(null, errorMsgs);
            GrowlActionCreators.notify(errorMsgs, 'error');
          } else {
            var json = res.body;
            var messages = WebAPIUtils.getMessages(res);
            ServerActionCreators.receiveFbVerifyResult(json, null, messages);
            GrowlActionCreators.notify(messages, 'success');
          }
        }
      });
  },

};

