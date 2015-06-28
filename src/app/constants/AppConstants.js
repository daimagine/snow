var keyMirror = require('keymirror');

var APIRoot = "http://localhost:3000/api/v1";

module.exports = {

  APIEndpoints: {
    LOGIN:          APIRoot + "/sessions/create",
    REGISTRATION:   APIRoot + "/users",
    STORIES:        APIRoot + "/stories"
  },

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ActionTypes: keyMirror({
    // Session
    LOGIN_REQUEST: null,
    LOGIN_RESPONSE: null,

    // Routes
    REDIRECT: null,

    LOAD_STORIES: null,
    RECEIVE_STORIES: null,
    LOAD_STORY: null,
    RECEIVE_STORY: null,
    CREATE_STORY: null,
    RECEIVE_CREATED_STORY: null
  })

};
