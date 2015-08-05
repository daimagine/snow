var React = require('react');
var Alert = require('react-bootstrap').Alert;
var MessageDismissable = require('./MessageDismissable.react.jsx');

var ErrorNotice = React.createClass({
  render: function() {
    var content = "";
    if (this.props.errors && this.props.errors.length) {
      content = (
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
    return (
      <div>{content}</div>
    );
  }
});

module.exports = ErrorNotice;

