var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;


var Breadcrumb = React.createClass({

  propTypes: {
    paths: ReactPropTypes.array
  },

	render: function() {
		return (
			<ul className="breadcrumb">
        {this.props.paths.map(function(crumb) {
          return (
            <li key={"crumb-" + crumb.key}>
              {crumb.link ? (
                <Link to={crumb.link} >{crumb.title}</Link>
              ) : (
                <a href="#" className="active">{crumb.title}</a>
              )}
            </li>
          );
        })}
      </ul>
		);
	}

});

module.exports = Breadcrumb;