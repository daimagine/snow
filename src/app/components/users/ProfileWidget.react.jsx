var React = require('react');
var Router = require('react-router');
var State = Router.State;
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var AuthenticatedMixin = require('../../components/common/AuthenticatedMixin.react.jsx');

var AppConstants = require('../../constants/AppConstants.js');
var SocmedType = AppConstants.SocmedType;
var SocmedConstant = AppConstants.SocmedConstant;
var SocmedStore = require('../../stores/SocmedStore.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var SocmedActionCreators = require('../../actions/SocmedActionCreators.react.jsx');
var SessionActionCreators = require('../../actions/SessionActionCreators.react.jsx');


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
					<GeneralInfoEditTab />
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
			showAlert: false,
			deletedSocmedId: null,
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
    	console.log('ProfileWidget.react: _onSocmedChange', SocmedStore.getSocmedAccounts());
		this.setState({
			socmedAccounts: SocmedStore.getSocmedAccounts()
		});
	},

	showDeleteConfirmation: function(e) {
		e.preventDefault();
		var id = e.target.getAttribute('data-socmed-account-id');
		console.log('ProfileWidget: showDeleteConfirmation socmed account id', id);
		this.setState({ showAlert: true, deletedSocmedId: id });
	},

	deleteSocmedAccount: function(e) {
		e.preventDefault();
		var id = this.state.deleteSocmedAccount
		console.log('ProfileWidget: showDeleteConfirmation socmed account id', id);
		if (id) {
			SocmedActionCreators.deleteSocmedAccount(id);
		}
		this.setState({ showAlert: false, deletedSocmedId: null });
	},

	render: function() {
		console.log('SocmedType ', SocmedType);
		var handler = this;
		if (this.state.socmedAccounts.length <= 0) {
			return (
				<div id="profileSI" className="tab-pane">
	              <h3>Tambah Akun Social Media</h3>
	              <hr />
	              <p>
	              	<small>Tidak ada social media yang terintegrasi.</small>
	              </p>
	              <SocmedInfoEditTabContent {...this.props} />
	            </div>
			);
		}

		return(
			<div id="profileSI" className="tab-pane">
				<h3>Akun <span className="semi-bold">Social Media</span></h3>
				<hr />
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
										data-socmed-account-id={socmedAccount.id}
										onClick={!handler.state.processing ? handler.showDeleteConfirmation : null}
						                disabled={handler.state.processing}>
										{handler.state.processing ? 'loading...' : 'delete'}
									</a>
								</td>
                            </tr>
				          );
				        })}
					</tbody>
					<tfoot>
						<td colSpan="2"><small>Daftar akun social media yang sudah terintegrasi.</small></td>
					</tfoot>
				</table>

				<Alert bsStyle='danger' onDismiss={this.handleAlertDismiss} show={this.state.showAlert}>
		          <h4>Hapus Social Media!</h4>
		          <p>Aksi ini akan menghapus integrasi social media Anda dengan Jualio sehingga Anda tidak dapat melakukan posting ke akun Social Media tersebut.</p>
		          <p>Apakah yakin untuk menghapus Social Media ini?</p>
		          <p>
		            <Button onClick={this.deleteSocmedAccount} bsStyle='danger'>Delete</Button>
		            <Button onClick={this.handleAlertDismiss}>Cancel</Button>
		          </p>
		        </Alert>
			</div>
		);
	}
});

var SocmedInfoEditTab = React.createClass({
	render: function() {
		return(
			<div id="profile-editSI" className="tab-pane">
              <h3>Tambah Akun Social Media</h3>
              <hr />
              <SocmedInfoEditTabContent {...this.props} />
            </div>
		);
	}
});

var SocmedInfoEditTabContent = React.createClass({
	propTypes: {
		user: ReactPropTypes.object
	},

	getInitialState: function() {
		return {
			response: SocmedStore.getResponse(),
			processing: false
		}
	},

	componentDidMount: function() {
    	console.log('SocmedInfoEditTabContent.react: componentDidMount')
		SocmedStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
    	console.log('SocmedInfoEditTabContent.react: componentWillUnmount')
		SocmedStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    	console.log('SocmedInfoEditTabContent.react: _onChange');
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
			processing: false
    	});
	},

	addTwitterAccount: function(e) {
		e.preventDefault();
		console.log('SocmedInfoEditTabContent.react: addTwitterAccount');
		this.setState({
			processing: true
		});
		SocmedActionCreators.addTwitterAccount(this.props.user.id);
	},

	addFbAccount: function(e) {
		e.preventDefault();
		console.log('SocmedInfoEditTabContent.react: addFbAccount');
		this.setState({
			processing: true
		});
		SocmedActionCreators.addFbAccount(this.props.user.id);
	},
	
	render: function() {
		return(
			<div className="row">
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
                  	<a href="javascript:;" className="btn btn-facebook btn-block"
                  		onClick={this.state.processing ? null : this.addFbAccount}>
                  		<span className="fa fa-facebook">&nbsp;&nbsp;&nbsp;
                  			{this.state.processing ? 'loading...' : 'Facebook'}
                  		</span>
                  	</a>
                  </p>
                  <p>
                  	<a href="javascript:;" className="btn btn-instagram btn-block">
                  		<span className="fa fa-instagram">&nbsp;&nbsp;&nbsp;Instagram</span>
                  	</a>
                  </p>
                  <p>
	              	<small>Klik tombol diatas untuk melakukan integrasi dengan social media Anda</small>
	              </p>
                </div>
            </div>
		);
	}
});


var GeneralInfoEditTab = React.createClass({
	getInitialState: function() {
		return {
			user: SessionStore.getUser(),
			processing: false
		}
	},

	componentDidMount: function() {
    	console.log('GeneralInfoEditTab.react: componentDidMount');
		SessionStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
    	console.log('GeneralInfoEditTab.react: componentWillUnmount');
		SessionStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    	console.log('GeneralInfoEditTab.react: _onChange');
    	this.setState({
    		user: SessionStore.getUser(),
			processing: false
    	});
	},

	_onPhoneChange: function(e) {
		var value = e.target.value;
		if (!value.startsWith('+62')) {
			if (value.startsWith('0')) {
				value = value.substr(1);
			}
			value = '+62' + value;
		}
		if (isNaN(value)) {
			return false;
		}
		console.log('GeneralInfoEditTab.react: mobile number', value);
		var user = this.state.user;
		user.mobile_no = value;
		this.setState({ user: user });
	},

	onSaveGeneralInfo: function(e) {
		e.preventDefault();
		console.log('GeneralInfoEditTab.react: onSaveGeneralInfo');
		var user = this.state.user;
		user.name = this.refs.name.getDOMNode().value.trim();
		user.mobile_no = this.refs.mobile_no.getDOMNode().value.trim();
		user.address = this.refs.address.getDOMNode().value.trim();
		SessionActionCreators.updateUser(user);
		this.setState({ processing: true });
	},

	render: function() {
		var mobile_no = this.state.user.mobile_no; 
		if (mobile_no) {
			mobile_no = mobile_no.replace('+62', '');
		}
		console.log('GeneralInfoEditTab.react: render mobile number', mobile_no);
		return(
			<div id="profile-editGI" className="tab-pane">
            	<h4 className="m-t-20">Basic Information</h4>
				<hr />
				<form action="javascript:;">
					<div className="form-group">
                      <label htmlFor="GI-email" className="form-label">Email</label>
                      <input id="GI-email" type="email" value={this.state.user.email} disabled className="form-control" />
                    </div>
					<div className="form-group">
                      <label htmlFor="GI-name" className="form-label">Nama</label>
                      <input ref="name" id="GI-name" type="text" className="form-control" 
                      	defaultValue={this.state.user.name} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="GI-phone" className="form-label">Telp :</label><span className="help">contoh +628561271000</span>
                      <div className="input-group">
						  <span className="input-group-addon">+62</span>
						  <input ref="mobile_no" id="GI-phone" type="text" className="form-control" 
	                      	onChange={this._onPhoneChange}
	                      	value={mobile_no} />
					  </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="GI-address" className="form-label">Alamat :</label>
                      <textarea ref="address" id="GI-address" className="form-control" 
                      	defaultValue={this.state.user.address} />
                    </div>
                    <div className="form-group text-right">
                    	<button className="btn btn-primary" type="submit"
							onClick={!this.state.processing ? this.onSaveGeneralInfo : null}
			                disabled={this.state.processing}>
							{this.state.processing ? 'loading...' : 'save'}
						</button>
                    </div>
				</form>
				<h4 className="m-t-20">Security Information</h4>
				<hr />
				<form action="javascript:;">
					<div className="form-group">
						<label htmlFor="GI-oldPassword" className="form-label">Old Password :</label>
						<input id="GI-oldPassword" type="password" placeholder="" className="form-control" />
					</div>
					<div className="form-group">
						<label htmlFor="GI-newPassword" className="form-label">New Password :</label>
						<input id="GI-newPassword" type="password" placeholder="" className="form-control" />
					</div>
					<div className="form-group">
						<label htmlFor="GI-confirmNewPassword" className="form-label">Confirm New Password :</label>
						<input id="GI-confirmNewPassword" type="password" placeholder="" className="form-control" />
					</div>
					<div className="form-group text-right">
						<button type="submit" className="btn btn-primary">Save</button>
				    </div>
                </form>
             </div>
		);
	}
});

module.exports = ProfileWidget;