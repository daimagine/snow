var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var SessionStore = require('../stores/SessionStore.react.jsx');
var RouteStore = require('../stores/RouteStore.react.jsx');
var SessionActionCreators = require('../actions/SessionActionCreators.react.jsx');

var Header = require('../components/common/Header.react.jsx');
var Sidebar = require('../components/common/Sidebar.react.jsx');


function getStateFromStores() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    user: SessionStore.getUser()
  };
}

var App = React.createClass({

  getInitialState: function() {
    console.log('App.react: getInitialState')
    return getStateFromStores();
  },
  
  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
    console.log('App.react: App will unmount, clear and logout');
    SessionActionCreators.logout();
  },

  _onChange: function() {
    console.log('App.react: _onChange')
    this.setState(getStateFromStores());
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
      <div>
        { container }
      </div>
    );
  }

});

module.exports = App;

