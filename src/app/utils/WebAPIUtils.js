var ServerActionCreators = require('../actions/ServerActionCreators.react.jsx');
var AppConstants = require('../constants/AppConstants.js');
var request = require('superagent');
// setup superagent parser
request.parse['application/vnd.api+json'] = JSON.parse

module.exports = {

  api: {
    request: request
  },

  getErrors: function(res) {
    var errorMsgs = ["Gagal menghubungi server. Silahkan coba kembali"];
    var json = res.body;
    if (json) {
      if (json['errors']) {
        errorMsgs = json['errors'];
      } else if (json['error']) {
        errorMsgs = [json['error']];
      }
    }
    console.log('Server error notices', errorMsgs);
    return errorMsgs;
  },

  getMessages: function(res) {
    var msgs = [];
    var json = res.body;
    if (json) {
      if (json['messages']) {
        msgs = json['messages'];
      } else if (json['message']) {
        msgs = [json['message']];
      }
    }
    console.log('Server messages', msgs);
    return msgs;
  },

  loadStories: function() {
    request.get(APIEndpoints.STORIES)
      .type('application/json')
      .set('Authorization', localStorage.getItem('accessToken'))
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
      .set('Authorization', localStorage.getItem('accessToken'))
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
      .set('Authorization', localStorage.getItem('accessToken'))
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

