var ServerActionCreators = require('../actions/ServerActionCreators.react.jsx');
var GrowlActionCreators = require('../actions/GrowlActionCreators.react.jsx');
var AppConstants = require('../constants/AppConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils');
var APIEndpoints = AppConstants.APIEndpoints;
var request = WebAPIUtils.api.request;

var SessionStore = require('../stores/SessionStore.react.jsx');
var ProductStore = require('../stores/ProductStore.react.jsx');

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
            GrowlActionCreators.notify(errorMsgs, 'error');
          } else {
            var json = res.body;
            var messages = WebAPIUtils.getMessages(res);
            ServerActionCreators.receiveProduct(json, null);
            GrowlActionCreators.notify(messages, 'success');
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
            GrowlActionCreators.notify(errorMsgs, 'error');
          } else {
            var json = res.body;
            var messages = WebAPIUtils.getMessages(res);
            ServerActionCreators.receiveProducts(json, null);
            GrowlActionCreators.notify(messages, 'success');
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
            GrowlActionCreators.notify(errorMsgs, 'error');
          } else {
            var json = res.body;
            var messages = WebAPIUtils.getMessages(res);
            ServerActionCreators.receiveUpdatedProduct(json, null);
            GrowlActionCreators.notify(messages, 'success');
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
            GrowlActionCreators.notify(errorMsgs, 'error');
          } else {
            var json = res.body;
            var messages = WebAPIUtils.getMessages(res);
            ServerActionCreators.receiveProducts(json, null);
            GrowlActionCreators.notify(messages, 'success');
          }
        }
      });
  },

  searchAffiliateProducts: function(criteria) {
    console.log('ProductService: searchAffiliateProducts', getUser());
    var query = {}
    // build advance search query if needed
    if (criteria.advance) {
      query = criteria;
    } else {
      query.name = criteria.name
    }
    // set customer id
    query.customer = getUser().id;
    console.log('ProductService: query params', query);
    request.get(APIEndpoints.SEARCH_AFFILIATES)
      .query(query)
      .type('application/json')
      .set('Authorization', getAccessToken())
      .end(function(error, res){
        if (res) {
          console.log(res);
          if (res.error) {
            var errorMsgs = WebAPIUtils.getErrors(res);
            ServerActionCreators.receiveProducts(null, errorMsgs, null, criteria);
            GrowlActionCreators.notify(errorMsgs, 'error');
          } else {
            var json = res.body;
            var messages = WebAPIUtils.getMessages(res);
            ServerActionCreators.receiveProducts(json, null, messages, criteria);
            GrowlActionCreators.notify(messages, 'success');
          }
        }
      });
  },

  sortAffiliateProducts: function(criteria) {
    console.log('ProductService: sortAffiliateProducts', criteria);
    ServerActionCreators.sortProducts(criteria);
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
            GrowlActionCreators.notify(errorMsgs, 'error');
          } else {
            var json = res.body;
            var messages = WebAPIUtils.getMessages(res);
            ServerActionCreators.receiveUpdatedProduct(json, null, messages);
            GrowlActionCreators.notify(messages, 'success');
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
            GrowlActionCreators.notify(errorMsgs, 'error');
          } else {
            var json = res.body;
            var messages = WebAPIUtils.getMessages(res);
            ServerActionCreators.receiveUpdatedProduct(json, null, messages);
            GrowlActionCreators.notify(messages, 'success');
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
            GrowlActionCreators.notify(errorMsgs, 'error');
          } else {
            var json = res.body;
            var messages = WebAPIUtils.getMessages(res);
            ServerActionCreators.receiveUpdatedProduct(json, null, messages);
            GrowlActionCreators.notify(messages, 'success');
          }
        }
      });
  },

};

