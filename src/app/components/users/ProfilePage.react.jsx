var React = require('react');
var Router = require('react-router');
var State = Router.State;
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var AuthenticatedMixin = require('../../components/common/AuthenticatedMixin.react.jsx');

var StringUtils = require('../../utils/StringUtils.js');
var Breadcrumb = require('../../components/common/Breadcrumb.react.jsx');
var ProfileWidget = require('./ProfileWidget.react.jsx');


var ProfilePage = React.createClass({

  	mixins: [AuthenticatedMixin, State],

	propTypes: {
		user: ReactPropTypes.object
	},

	getInitialState: function() {
    	console.log('ProfilePage.react: getInitialState')
		return {}
	},

	componentDidMount: function() {
    	console.log('ProfilePage.react: componentDidMount')
	},

	componentWillUnmount: function() {
    	console.log('ProfilePage.react: componentWillUnmount')
	},

	_getPaths: function() {
		return [
			{ 'key' : 'home', 'title' : 'Dashboard', 'link' : 'home' },
			{ 'key' : 'profile', 'title' : 'Akun Anda', 'link' : null }
		]
	},

	render: function() {
    	return (
			<div className="content">
				<Breadcrumb paths={this._getPaths()} />
				<div className="row">
					<div className="col-xs-12 col-md-4">
						<ProfileOverview user={this.props.user} />
					</div>
		          	<div className="col-xs-12 col-md-8">
		          		<ProfileWidget user={this.props.user} />
					</div>
	          	</div>
			</div>
		);
	}
});


var ProfileOverview = React.createClass({
	render: function() {
		var username = StringUtils.split2(this.props.user.name);
		return (
			<div>
              <div className="grid simple">
                <div className="grid-title text-center">
                  <h3>{username[0]} <span className="semi-bold">{username[1]}</span></h3>
                </div>
                <div className="grid-body">
                  <div className="text-center">
                    <div className="user-profile m-b-10"><img src="/assets/images/profiles/f2x.jpg" /></div>
                  </div>
                  <h5 className="m-t-20">
	              	Cara Aman dan Mudah Jual Beli via Media Sosial
	              </h5>
                  <hr />
                  <p>
                  	Halaman ini dapat Anda gunakan untuk mengatur Akun Anda
                  </p>
                  <p>
                  	Hubungkan akun Facebook, Twitter, dan Instagram ke Jualio
                  </p>
                </div>
              </div>
            </div>
		);
	}
});

module.exports = ProfilePage;