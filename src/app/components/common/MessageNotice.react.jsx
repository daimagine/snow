var React = require('react');
var Alert = require('react-bootstrap').Alert;
var MessageDismissable = require('./MessageDismissable.react.jsx');

var MessageNotice = React.createClass({
  render: function() {
    return (
      <div className="message-notice">
        {this.props.messages.map(function(message, index){
          return (
            <MessageDismissable 
              key={"msg-"+index} 
              bsStyle="success" 
              message={message}/>
          );
        })}
      </div>
    );
  }
});


module.exports = MessageNotice;

