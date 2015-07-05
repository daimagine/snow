var React = require('react');
var router = require('./stores/RouteStore.react.jsx').getRouter();
window.React = React;
var SessionStore = require('./stores/SessionStore.react.jsx');


router.run(function (Handler, state) {
  React.render(<Handler/>, document.getElementById('root'));
});