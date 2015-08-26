var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var SessionStore = require('../stores/SessionStore.react.jsx');
var RouteStore = require('../stores/RouteStore.react.jsx');
var SessionActionCreators = require('../actions/SessionActionCreators.react.jsx');
var Growl = require('../components/common/Growl.react.jsx');
var GrowlStore = require('../stores/GrowlStore.react.jsx');

var Header = require('../components/common/Header.react.jsx');
var Sidebar = require('../components/common/Sidebar.react.jsx');


function getStateFromStores() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    user: SessionStore.getUser(),
    notification: GrowlStore.getNotification()
  };
}

var App = React.createClass({

  growler: null,

  getInitialState: function() {
    console.log('App.react: getInitialState');
    return getStateFromStores();
  },
  
  componentDidMount: function() {
    this.growler = this.refs.growler;
    SessionStore.addChangeListener(this._onChange);
    GrowlStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
    GrowlStore.removeChangeListener(this._onChange);
    console.log('App.react: App will unmount, clear and logout');
    SessionActionCreators.logout();
  },

  _onChange: function() {
    var nextState = getStateFromStores();
    console.log('App.react: _onChange', nextState);
    this.setState(nextState);
    if (nextState.notification) {
      console.log('App.react: notify with growl', nextState.notification);
      var level = nextState.notification.lvl;
      var msg = nextState.notification.msg;
      this.growler.addNotification({ level: level, msg: msg });
    }
  },

  render: function() {
    var container = this.state.isLoggedIn ? (
      <div className="page-container row-fluid">
        <Header 
          isLoggedIn={this.state.isLoggedIn}
          user={this.state.user} />
        <Sidebar
          isLoggedIn={this.state.isLoggedIn}
          user={this.state.user} />
        <a href="javascript:;" className="scrollup">Scroll</a>
        <div className="page-content">
          <RouteHandler
            isLoggedIn={this.state.isLoggedIn}
            user={this.state.user} />
        </div>
      </div>
    ) : (
      <RouteHandler
          isLoggedIn={this.state.isLoggedIn}
          user={this.state.user} />
    );

    return (
      <div className="root-content">
        <Growl ref="growler" />
        { container }
      </div>
    );
  }

});

module.exports = App;

