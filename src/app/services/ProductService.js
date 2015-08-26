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
    request.put(APIEndpoints.PRODUCTS + "/" + product.id)
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

  searchAffiliateProducts: function(criteria) {
    console.log('ProductService: searchAffiliateProducts', getUser());
    request.get(APIEndpoints.SEARCH_AFFILIATES)
      .query('customer=' + getUser().id )
      .query('name=' + criteria )
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

  joinAffiliate: function(user, product) {
    console.log('ProductService: joinAffiliate', product.id);
    request.post(APIEndpoints.AFFILIATES + "/" + product.id)
      .send({
        customer_id: user.id
      })
      .type('application/json')
      .set('Authorization', getAccessToken())
      .end(function(error, res) {
        if (res) {
          console.log(res);
          if (res.error) {
            var errorMsgs = WebAPIUtils.getErrors(res);
            ServerActionCreators.receiveUpdatedProduct(null, errorMsgs, null);
          } else {
            var json = res.body;
            var messages = WebAPIUtils.getMessages(res);
            ServerActionCreators.receiveUpdatedProduct(json, null, messages);
          }
        }
      });
  },

  removeAffiliate: function(user, product) {
    console.log('ProductService: removeAffiliate', product.id);
    request.del(APIEndpoints.AFFILIATES + "/" + product.id)
      .send({
        customer_id: user.id
      })
      .type('application/json')
      .set('Authorization', getAccessToken())
      .end(function(error, res) {
        if (res) {
          console.log(res);
          if (res.error) {
            var errorMsgs = WebAPIUtils.getErrors(res);
            ServerActionCreators.receiveUpdatedProduct(null, errorMsgs, null);
          } else {
            var json = res.body;
            var messages = WebAPIUtils.getMessages(res);
            ServerActionCreators.receiveUpdatedProduct(json, null, messages);
          }
        }
      });
  },

  updateProductAffiliateInfo: function(product) {
    console.log('ProductService: updateProductAffiliateInfo', product.id);
    request.put(APIEndpoints.PRODUCTS_AFFILIATE_INFO + "/" + product.id)
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
            var messages = WebAPIUtils.getMessages(res);
            ServerActionCreators.receiveUpdatedProduct(json, null, messages);
          }
        }
      });
  },

};

