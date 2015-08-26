var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var AuthenticatedMixin = require('../../components/common/AuthenticatedMixin.react.jsx');

var Breadcrumb = require('../../components/common/Breadcrumb.react.jsx');
var GettingStartedWidget = require('./GettingStartedWidget.react.jsx');
var SalesOverviewWidget = require('./SalesOverviewWidget.react.jsx');


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

				<div className="row">
					<div className="col-xs-12 col-md-8">
						<GettingStartedWidget {...this.props} />
					</div>
					<div className="col-xs-12 col-md-4">
						<SalesOverviewWidget {...this.props} />
					</div>
				</div>
			</div>
		);
	}

});

module.exports = HomePage;