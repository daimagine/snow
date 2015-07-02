var React = require('react');

var ErrorNotice = React.createClass({
  render: function() {
    return (
      <div className="error-notice">
        {this.props.errors.map(function(error, index){
          return (
            <div className="alert alert-danger alert-dismissible" role="alert" key={"error-"+index}>
              {error}
            </div>
          );
        })}
      </div>
      );
  }
});

module.exports = ErrorNotice;

