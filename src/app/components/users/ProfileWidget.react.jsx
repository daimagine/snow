var React = require('react');
var Router = require('react-router');
var State = Router.State;
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var MessageNotice = require('../../components/common/MessageNotice.react.jsx');
var AuthenticatedMixin = require('../../components/common/AuthenticatedMixin.react.jsx');
var ReactBootstrap = require('react-bootstrap')
	, Modal = ReactBootstrap.Modal
	, Button = ReactBootstrap.Button
	, Input = ReactBootstrap.Input;

var AppConstants = require('../../constants/AppConstants.js');
var SocmedType = AppConstants.SocmedType;
var SocmedConstant = AppConstants.SocmedConstant;
var SocmedStore = require('../../stores/SocmedStore.react.jsx');
var SocmedActionCreators = require('../../actions/SocmedActionCreators.react.jsx');


var ProfileWidget = React.createClass({
	propTypes: {
		user: ReactPropTypes.object
	},

	render: function() {
		return(
			<div>
				<ul id="tab-01" className="nav nav-tabs">
					<li className="active">
						<a href="#profileGI" aria-controls="profileGI" 
							role="tab" data-toggle="tab">
							Informasi Umum
						</a>
					</li>
					<li>
						<a href="#profileSI" aria-controls="profileSI" 
							role="tab" data-toggle="tab">
							Akun Social Media
						</a>
					</li>
					<li className="dropdown">
						<a data-toggle="dropdown" href="javascript:;" className="dropdown-toggle">
							Edit<b className="caret"></b>
						</a>
						<ul className="dropdown-menu">
							<li>
								<a href="#profile-editGI" aria-controls="profile-editGI" 
									role="tab" data-toggle="tab">
									Informasi Umum
								</a>
							</li>
							<li>
								<a href="#profile-editSI" aria-controls="profile-editSI" 
									role="tab" data-toggle="tab">
									Akun Social Media
								</a>
							</li>
						</ul>
					</li>
				</ul>
				<div className="tab-content">
					<GeneralInfoTab user={this.props.user} />
					<SocmedInfoTab user={this.props.user} />
					<SocmedInfoEditTab user={this.props.user} />
				</div>
			</div>
		);
	}
});

var GeneralInfoTab = React.createClass({
	propTypes: {
		user: ReactPropTypes.object
	},
	render: function() {
		return(
			<div id="profileGI" className="tab-pane active">
				<h3>Informasi <span className="semi-bold">Umum</span></h3>
				<hr />
				<table className="table">
					<tbody>
						<tr className="no-border">
							<td>Email</td>
							<td width="10px">:</td>
							<td>{this.props.user.email}</td>
						</tr>
						<tr className="no-border">
							<td>Name</td>
							<td width="10px">:</td>
							<td>{this.props.user.name}</td>
						</tr>
						<tr className="no-border">
							<td>Telp</td>
							<td width="10px">:</td>
							<td>{this.props.user.mobile_no}</td>
						</tr>
						<tr className="no-border">
							<td>Alamat</td>
							<td width="10px">:</td>
							<td>{this.props.user.address}</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
});

var SocmedInfoTab = React.createClass({
	propTypes: {
		user: ReactPropTypes.object
	},

	getInitialState: function() {
		return {
			socmedAccounts: SocmedStore.getSocmedAccounts(),
			errors: [],
			messages: [],
			processing: false
		}
	},

	componentDidMount: function() {
    	console.log('ProfileWidget.react: componentDidMount')
		SocmedStore.addChangeListener(this._onSocmedChange);
		SocmedActionCreators.loadSocmedAccounts(this.props.user.id);
	},

	componentWillUnmount: function() {
    	console.log('ProfileWidget.react: componentWillUnmount')
		SocmedStore.removeChangeListener(this._onSocmedChange);
	},

	_onSocmedChange: function() {
    	console.log('ProfileWidget.react: _onSocmedChange');
		this.setState({
			socmedAccounts: SocmedStore.getSocmedAccounts(),
			errors: SocmedStore.getErrors(),
			messages: SocmedStore.getMessages()
		});
	},

	deleteSocmedAccount: function() {
		console.log('ProfileWidget: deleteSocmedAccount');
	},

	render: function() {
		var handler = this;
		return(
			<div id="profileSI" className="tab-pane">
				<h3>Akun <span className="semi-bold">Social Media</span></h3>
				<hr />
				<div className="row">
					{ this.state.messages.length > 0 ?
		          		(
		            		<div className="col-md-12">
			              		<MessageNotice messages={this.state.messages}/>
			              	</div>
		          		) : (
		          			<div></div>
		          		)
		          	}
		          	{ this.state.errors.length > 0 ?
		          		(
		            		<div className="col-md-12">
			              		<ErrorNotice errors={this.state.errors}/>
			              	</div>
		          		) : (
			            	<div></div>
		          		)
		          	}
				</div>
				<table className="table">
					<thead>
						<tr>
							<th>Akun Social Media</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{this.state.socmedAccounts.map(function(socmedAccount, index){
				          return (
				            <tr key={"socmed-"+index}>
                                <td className="v-align-middle">
                                	{ (() => {
                                		switch(socmedAccount.social_media.id) {
                                			case SocmedType.Twitter: 
                                				return(
													<a href="javascript:;" 
														className="btn btn-block btn-twitter btn-small">
				                                		<span className="pull-left">
				                                			<i className="fa fa-twitter"></i>
				                                		</span>
				                                		<span className="bold">
				                                			@{socmedAccount.social_name}
				                                		</span>
				                                	</a>
                                				);
                                			case SocmedType.Facebook: 
                                				return(
													<a href="javascript:;" 
														className="btn btn-block btn-facebook btn-small">
				                                		<span className="pull-left">
				                                			<i className="fa fa-facebook"></i>
				                                		</span>
				                                		<span className="bold">
				                                			{socmedAccount.social_name}
				                                		</span>
				                                	</a>
                                				);
                                			default: return "";
                                		}
                                	})() }
                                </td>
								<td className="v-align-middle">
									<a className="btn btn-danger btn-small" href="javascript:;" 
										onClick={!handler.state.processing ? handler.deleteSocmedAccount : null}
						                disabled={handler.state.processing}>
										{handler.state.processing ? 'loading...' : 'delete'}
									</a>
								</td>
                            </tr>
				          );
				        })}
					</tbody>
					<tfoot>
						<tr>
							<td colSpan="2"><small>daftar akun social media yang sudah terintegrasi.</small></td>
						</tr>
					</tfoot>
				</table>
			</div>
		);
	}
});

var SocmedInfoEditTab = React.createClass({
	propTypes: {
		user: ReactPropTypes.object
	},

	getInitialState: function() {
		return {
			response: SocmedStore.getResponse(),
			errors: [],
			messages: [],
			processing: false
		}
	},

	componentDidMount: function() {
    	console.log('SocmedInfoEditTab.react: componentDidMount')
		SocmedStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
    	console.log('SocmedInfoEditTab.react: componentWillUnmount')
		SocmedStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    	console.log('SocmedInfoEditTab.react: _onChange');
    	var response = SocmedStore.getResponse();
    	if (response.request_token) {
    		var token = JSON.stringify(response.request_token);
    		sessionStorage.setItem(SocmedConstant.TWITTER.REQUEST_TOKEN_KEY, token)
    	}
    	if (response.redirect_url) {
    		window.location = response.redirect_url;
    	}
    	this.setState({ 
    		response: response,
			errors: SocmedStore.getErrors(),
			messages: SocmedStore.getMessages(),
			processing: false
    	});
	},

	addTwitterAccount: function(e) {
		e.preventDefault();
		console.log('SocmedInfoEditTab.react: addTwitterAccount');
		this.setState({ 
			errors: [],
			messages: [],
			processing: true
		});
		SocmedActionCreators.addTwitterAccount(this.props.user.id);
	},
	
	render: function() {
		return(
			<div id="profile-editSI" className="tab-pane">
              <h3>Tambah Akun Social Media</h3>
              <hr />
              <div className="row">
	            { this.state.messages.length > 0 ?
	          		(
	            		<div className="col-md-12">
		              		<MessageNotice messages={this.state.messages}/>
		              	</div>
	          		) : (
	          			<div></div>
	          		)
	          	}
	          	{ this.state.errors.length > 0 ?
	          		(
	            		<div className="col-md-12">
		              		<ErrorNotice errors={this.state.errors}/>
		              	</div>
	          		) : (
		            	<div></div>
	          		)
	          	}
                <div className="col-xs-12">
                  <p>
                  	<a href="javascript:;" className="btn btn-twitter btn-block"
                  		onClick={this.state.processing ? null : this.addTwitterAccount}>
                  		<span className="fa fa-twitter">&nbsp;&nbsp;&nbsp;
                  			{this.state.processing ? 'loading...' : 'Twitter'}
                  		</span>
                  	</a>
                  </p>
                  <p>
                  	<a href="javascript:;" className="btn btn-facebook btn-block">
                  		<span className="fa fa-facebook">&nbsp;&nbsp;&nbsp;Facebook</span>
                  	</a>
                  </p>
                  <p>
                  	<a href="javascript:;" className="btn btn-instagram btn-block">
                  		<span className="fa fa-instagram">&nbsp;&nbsp;&nbsp;Instagram</span>
                  	</a>
                  </p>
                </div>
              </div>
            </div>
		);
	}
});

module.exports = ProfileWidget;