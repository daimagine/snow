var React = require('react');
var Alert = require('react-bootstrap').Alert;
var MessageDismissable = require('./MessageDismissable.react.jsx');

var ErrorNotice = React.createClass({
  render: function() {
    return (
      <div className="error-notice">
        {this.props.errors.map(function(error, index){
          return (
            <MessageDismissable 
              key={"error-"+index} 
              bsStyle="danger" 
              message={error}/>
          );
        })}
      </div>
    );
  }
});

module.exports = ErrorNotice;

