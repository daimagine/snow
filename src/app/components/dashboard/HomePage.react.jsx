var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var AuthenticatedMixin = require('../../components/common/AuthenticatedMixin.react.jsx');

var Breadcrumb = require('../../components/common/Breadcrumb.react.jsx');
var GettingStartedWidget = require('../../components/common/GettingStartedWidget.react.jsx');


var HomePage = React.createClass({

  	mixins: [AuthenticatedMixin],

	propTypes: {
		user: ReactPropTypes.object
	},
	
	_getPaths: function() {
		return [
			{ 'title' : 'Dashboard', 'link' : 'home', 'active' : true }
		]
	},

	render: function() {
		return (
			<div className="content">
				<Breadcrumb paths={this._getPaths()} />
				<GettingStartedWidget user={this.props.user} />
			</div>
		);
	}

});

module.exports = HomePage;