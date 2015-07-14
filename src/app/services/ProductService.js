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

  loadProduct: function(productId) {
    console.log('ProductService: loadProduct');
    request.get(APIEndpoints.PRODUCTS + '/' + productId)
      .type('application/json')
      .set('Authorization', getAccessToken())
      .end(function(error, res) {
        if (res) {
          console.log(res);
          if (res.error) {
            var errorMsgs = WebAPIUtils.getErrors(res);
            ServerActionCreators.receiveProduct(null, errorMsgs);
          } else {
            var json = res.body;
            ServerActionCreators.receiveProduct(json, null);
          }
        }
      });
  },

  loadCustomerProducts: function() {
    console.log('ProductService: loadCustomerProducts', getUser());
    request.get(APIEndpoints.PRODUCTS)
      .query('customer=' + getUser().id )
      .type('application/json')
      .set('Authorization', getAccessToken())
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
  },

  updateProduct: function(product) {
    console.log('ProductService: updateProduct', product.id);
    request.post(APIEndpoints.PRODUCTS + "/" + product.id)
      .send({
        product: product
      })
      .type('application/json')
      .set('Authorization', getAccessToken())
      .end(function(error, res) {
        if (res) {
          console.log(res);
          if (res.error) {
            var errorMsgs = WebAPIUtils.getErrors(res);
            ServerActionCreators.receiveUpdatedProduct(null, errorMsgs);
          } else {
            var json = res.body;
            ServerActionCreators.receiveUpdatedProduct(json, null);
          }
        }
      });
  },

  loadCustomerAffiliateProducts: function() {
    console.log('ProductService: loadCustomerAffiliateProducts', getUser());
    request.get(APIEndpoints.PRODUCTS)
      .query('affiliator=' + getUser().id )
      .type('application/json')
      .set('Authorization', getAccessToken())
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
  },

};

