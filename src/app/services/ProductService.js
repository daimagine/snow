var ServerActionCreators = require('../actions/ServerActionCreators.react.jsx');
var AppConstants = require('../constants/AppConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils');
var APIEndpoints = AppConstants.APIEndpoints;
var request = WebAPIUtils.api.request;

var SessionStore = require('../stores/SessionStore.react.jsx');
var user = SessionStore.getUser();
var accessToken = SessionStore.getAccessToken();

module.exports = {

  loadCustomerProducts: function() {
    console.log('ProductService: loadCustomerProducts');
    request.get(APIEndpoints.PRODUCTS)
      .type('application/json')
      .query({ 
        customer: user.id
      })
      .set('Authorization', accessToken)
      .end(function(error, res){
        if (res) {
          console.log(res);
          if (res.error) {
            var errorMsgs = WebAPIUtils.getErrors(res);
            ServerActionCreators.receiveProducts(null, errorMsgs);
          } else {
            var json = res.body;
            ServerActionCreators.receiveProducts(json, null);
          }
        }
      });
  }

};

