var React = require('react');
var Alert = require('react-bootstrap').Alert;

var MessageDismissable = React.createClass({
  getInitialState() {
    return {
      alertVisible: true
    };
  },

  componentWillReceiveProps: function(nextProps) {
    console.log('MessageDismissable: componentWillReceiveProps', nextProps);
    this.setState({
      alertVisible: true
    });
  },

  render() {
    if (this.state.alertVisible) {
      return (
        <Alert bsStyle={this.props.bsStyle} onDismiss={this.handleAlertDismiss}>
          {this.props.message}
        </Alert>
      );
    }
    return (
      <div></div>
    );
  },

  handleAlertDismiss() {
    this.setState({alertVisible: false});
  },

  handleAlertShow() {
    this.setState({alertVisible: true});
  },

  componentWillMount: function() {
    console.log('MessageDismissable: componentWillMount');
  }
});

module.exports = MessageDismissable;