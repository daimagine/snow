var React = require('react');
var Alert = require('react-bootstrap').Alert;
var MessageDismissable = require('./MessageDismissable.react.jsx');

var MessageNotice = React.createClass({
  render: function() {
    var content = "";
    if (this.props.messages && this.props.messages.length) {
      content = (
        <div className="message-notice">
          { this.props.messages.map(function(message, index){
            return (
              <MessageDismissable 
                key={"msg-"+index} 
                bsStyle="success" 
                message={message}/>
            );
          }) }
        </div>
      );
    }
    return (
      <div>{content}</div>
    );
  }
});


module.exports = MessageNotice;

