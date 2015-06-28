var ServerActionCreators = require('../actions/ServerActionCreators.react.jsx');
var AppConstants = require('../constants/AppConstants.js');
var request = require('superagent');

function _getErrors(res) {
  var errorMsgs = ["Gagal menghubungi server. Silahkan coba kembali"];
  var json = res.body;
  if (json) {
    if (json['errors']) {
      errorMsgs = json['errors'];
    } else if (json['error']) {
      errorMsgs = [json['error']];
    }
  }
  console.log(errorMsgs);
  return errorMsgs;
}

var APIEndpoints = AppConstants.APIEndpoints;

// setup superagent parser
request.parse['application/vnd.api+json'] = JSON.parse


module.exports = {

  signup: function(email, username, password, passwordConfirmation) {
    request.post(APIEndpoints.REGISTRATION)
      .send({ user: { 
        email: email, 
        username: username,
        password: password,
        password_confirmation: passwordConfirmation
      }})
      .type('json')
      .end(function(error, res) {
        if (res) {
            console.log(res);
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveLogin(null, errorMsgs);
          } else {
            var json = res.body;
            ServerActionCreators.receiveLogin(json, null);
          }
        }
      });
  },

  login: function(email, password, captcha) {
    request.post(APIEndpoints.LOGIN)
      .send({ email: email, password: password, captcha: captcha })
      .type('json')
      .end(function(error, res){
        if (res) {
          console.log(res);
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveLogin(null, errorMsgs);
          } else {
            var json = res.body;
            ServerActionCreators.receiveLogin(json, null);
          }
        }
      });
  },

  loadStories: function() {
    request.get(APIEndpoints.STORIES)
      .type('application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          var json = res.body;
          ServerActionCreators.receiveStories(json);
        }
      });
  },

  loadStory: function(storyId) {
    request.get(APIEndpoints.STORIES + '/' + storyId)
      .type('json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          var json = res.body;
          ServerActionCreators.receiveStory(json);
        }
      });
  },

  createStory: function(title, body) {
    request.post(APIEndpoints.STORIES)
      .type('json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .send({ story: { title: title, body: body } })
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveCreatedStory(null, errorMsgs);
          } else {
            var json = res.body;
            ServerActionCreators.receiveCreatedStory(json, null);
          }
        }
      });
  }

};

