var ServerActionCreators = require('../actions/ServerActionCreators.react.jsx');
var GrowlActionCreators = require('../actions/GrowlActionCreators.react.jsx');
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

  updateUser: function(user) {
    console.log('UserService: updateUser', user.id);
    request.put(APIEndpoints.USERS + "/" + user.id)
      .send({
        user: user
      })
      .type('application/json')
      .set('Authorization', getAccessToken())
      .end(function(error, res) {
        if (res) {
          console.log(res);
          if (res.error) {
            var errorMsgs = WebAPIUtils.getErrors(res);
            ServerActionCreators.receiveUpdatedUser(null, errorMsgs);
            GrowlActionCreators.notify(errorMsgs, 'error');
          } else {
            var json = res.body;
            var messages = WebAPIUtils.getMessages(res);
            ServerActionCreators.receiveUpdatedUser(json, null, messages);
            GrowlActionCreators.notify(messages, 'success');
          }
        }
      });
  },

};

