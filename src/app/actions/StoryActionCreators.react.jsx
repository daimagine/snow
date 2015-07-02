var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  loadStories: function() {
    WebAPIUtils.loadStories();
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_STORIES
    });
  },
  
  loadStory: function(storyId) {
    WebAPIUtils.loadStory(storyId);
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_STORY,
      storyId: storyId
    });
  },

  createStory: function(title, body) {
    WebAPIUtils.createStory(title, body);
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_STORY,
      title: title,
      body: body
    });
  }

};

