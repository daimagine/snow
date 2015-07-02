var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Header = require('../components/Header.react.jsx');
var SessionStore = require('../stores/SessionStore.react.jsx');
var RouteStore = require('../stores/RouteStore.react.jsx');


function getStateFromStores() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    user: SessionStore.getUser()
  };
}

var App = React.createClass({

  // mixins: [AuthenticatedMixin],

  getInitialState: function() {
    console.log('App.react: getInitialState')
    return getStateFromStores();
  },
  
  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    console.log('App.react: _onChange')
    this.setState(getStateFromStores());
  },

  render: function() {
    return (
      <div className="app">
        <Header 
          isLoggedIn={this.state.isLoggedIn}
          user={this.state.user} />
        <RouteHandler
          isLoggedIn={this.state.isLoggedIn}
          user={this.state.user} />
      </div>
    );
  }

});

module.exports = App;

