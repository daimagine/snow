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
var ProductStore = require('../../stores/ProductStore.react.jsx');
var SocmedStore = require('../../stores/SocmedStore.react.jsx');
var AffiliateStore = require('../../stores/AffiliateStore.react.jsx');
var ProductActionCreators = require('../../actions/ProductActionCreators.react.jsx');
var SocmedActionCreators = require('../../actions/SocmedActionCreators.react.jsx');
var AffiliateActionCreators = require('../../actions/AffiliateActionCreators.react.jsx');

var Breadcrumb = require('../../components/common/Breadcrumb.react.jsx');


var RepostPage = React.createClass({

  	mixins: [AuthenticatedMixin, State],

	propTypes: {
		user: ReactPropTypes.object
	},

	getInitialState: function() {
    	console.log('RepostPage.react: getInitialState')
		return {
			product: ProductStore.getProduct(), // get form product store
			socmedAccounts: SocmedStore.getSocmedAccounts(),
			affiliate: null,
			errors: [],
			messages: [],
			affiliateMode: this.getParams().affiliate,
			processing: false
		}
	},

	componentDidMount: function() {
    	console.log('RepostPage.react: componentDidMount')
		ProductStore.addChangeListener(this._onChange);
		SocmedStore.addChangeListener(this._onSocmedChange);
		ProductActionCreators.loadProduct(this.getParams().productId);
		SocmedActionCreators.loadSocmedAccounts(this.props.user.id);

		if (this.state.affiliateMode) {
			AffiliateStore.addChangeListener(this._onAffiliateChange);
			AffiliateActionCreators.loadAffiliateInfo(this.getParams().productId, this.props.user.id);
		}
	},

	componentWillUnmount: function() {
    	console.log('RepostPage.react: componentWillUnmount')
		ProductStore.removeChangeListener(this._onChange);
		SocmedStore.removeChangeListener(this._onSocmedChange);

		if (this.state.affiliateMode) {
			AffiliateStore.removeChangeListener(this._onAffiliateChange);
		}
	},

	_onAffiliateChange: function() {
    	console.log('RepostPage.react: _onAffiliateChange', 
    		AffiliateStore.getErrors(), 
    		AffiliateStore.getMessages());

		this.setState({
			affiliate: AffiliateStore.getAffiliate(),
			errors: AffiliateStore.getErrors(),
			messages: AffiliateStore.getMessages()
		});
	},

	_onSocmedChange: function() {
    	console.log('RepostPage.react: _onSocmedChange', 
    		SocmedStore.getErrors(), 
    		SocmedStore.getMessages());

		this.setState({
			socmedAccounts: SocmedStore.getSocmedAccounts(),
			errors: SocmedStore.getErrors(),
			messages: SocmedStore.getMessages()
		});
	},

	_onChange: function() {
    	console.log('RepostPage.react: _onChange', 
    		ProductStore.getErrors(), 
    		ProductStore.getMessages());

		this.setState({
			product: ProductStore.getProduct(),
			errors: ProductStore.getErrors(),
			messages: ProductStore.getMessages()
		});
	},

	_getPaths: function() {
		var productParams = {
			productId: this.state.product ? this.state.product.id : -1
		};
		return [
			{ 'key' : 'home', 'title' : 'Dashboard', 'link' : 'home' },
			{ 'key' : 'products', 'title' : 'Daftar Produk', 'link' : 'products' },
			{ 
				'key' : 'product', 
				'title' : this.state.product ? this.state.product.name : "Produk", 
				'link' : 'product', 
				'params' : productParams 
			},
			{ 'key' : 'repost-product', 'title' : 'Repost Produk', 'link' : null }
		]
	},

	onRepostProduct: function() {
		console.log('RepostPage: onRepostProduct');
	},

	render: function() {
    	return (
			<div className="content">
				<Breadcrumb paths={this._getPaths()} />
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
		          	<div className="col-md-12">
						{ this.state.product && this.state.socmedAccounts ? (
								<div>
									<RepostForm 
										product={this.state.product} 
										socmedAccounts={this.state.socmedAccounts}
										affiliate={this.state.affiliate}
										processing={this.state.processing}
										handler={this}/>
								</div>
							) : (
								<div className="alert alert-info" role="alert">
					              Informasi produk sedang disiapkan...
					            </div>
							)
						}
					</div>
	          	</div>
			</div>
		);
	}

});

var RepostForm = React.createClass({

	getInitialState: function() {
		return {
			selectedSocmeds: [],
			headline: ""
		}
	},

	propTypes: {
		handler: ReactPropTypes.object,
		product: ReactPropTypes.object,
		affiliate: ReactPropTypes.object,
		socmedAccounts: ReactPropTypes.array,
		processing: ReactPropTypes.bool
	},

	componentWillMount: function() {
		if (this.props.handler === undefined) {
			throw new Error("RepostForm: Parent component className must give handler props.")
		}
		else if (typeof this.props.handler.onRepostProduct !== 'function') {
			throw new Error("RepostForm: Parent component className must implement onRepostProduct().")
		}

		var headline = "";
		if (this.props.affiliate && this.props.affiliate.headline) {
			headline = this.props.affiliate.headline;

		} else if (this.props.product && this.props.product.headline) {
			headline = this.props.product.headline;
		}
		this.setState({headline: headline});
	},

	_socmedSelection: function(e) {
		var id = e.target.value;
		var isChecked = e.target.checked;
		var selection = this.state.selectedSocmeds;
		var index = selection.indexOf(id);
		if (isChecked) {
			if (index == -1) {
				selection.push(id);	
			}
		} else {
			if (index > -1) {
				selection.splice(index, 1);	
			}
		}
		console.log('RepostForm: socmed selection', selection);
		this.setState({selectedSocmeds: selection});
	},

	_onHeadlineChange: function(e) {
		var headline = e.target.value;
		this.setState({headline: headline});
	},

	render: function() {
		var handler = this;
		return(
			<div className="col-xs-12 col-sm-6">
				<div className="grid simple">
					<div className="grid-title">
						<h4>Akun <span className="semi-bold">Anda</span></h4>
					</div>
					<div className="grid-body">
						<table className="table">
                            <thead>
                              <tr>
                                <th style={{width:'1%'}}>
                                  &nbsp;
                                </th>
                                <th>Social Media</th>
                              </tr>
                            </thead>
                            <tbody>
	                            {this.props.socmedAccounts.map(function(socmedAccount, index){
						          return (
						            <tr key={"socmed-"+index}>
		                                <td className="v-align-middle">
		                                  <div className="checkbox check-success">
		                                    <input id="activeSM01" type="checkbox" 
		                                    	value={socmedAccount.id} 
		                                    	onChange={handler._socmedSelection} />
		                                    <label htmlFor="activeSM01"></label>
		                                  </div>
		                                </td>
		                                <td className="v-align-middle">
		                                	{ (() => {
		                                		console.log('render socmed button', socmedAccount.social_media);
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
		                            </tr>
						          );
						        })}
                            </tbody>
                            <tfoot>
                              <tr>
                                <td colSpan="3"><small>pilih social media untuk repost produk.</small></td>
                              </tr>
                            </tfoot>
                        </table>
					</div>
				</div>
				<div className="grid simple">
					<div className="grid-title">
						<h4>Atur <span className="semi-bold">Headline</span></h4>
					</div>
					<div className="grid-body">
						<div className="row m-b-20">
							<div className="col-sm-12 col-md-2">
								* Headline:
							</div>
							<div className="col-sm-12 col-md-10">
								<textarea onChange={this._onHeadlineChange} style={{width:'100%'}}>
									{this.state.headline}
								</textarea>
							</div>
							<div className="col-sm-12">
								* Total Karakter: <span>{this.state.headline.length}</span>
							</div>
							<div className="col-sm-12 col-md-2">
								Preview
							</div>
							<div className="col-sm-12 col-md-10">
								<div className="col-sm-12 col-md-8">
									<img src={this.props.product.image} className="img-responsive" />
								</div>
								<div className="col-sm-12 col-md-4">
									{this.state.headline}
									<hr className="m-t-10 m-b-10"/>
									<strong>{this.props.product.description}</strong>
								</div>
							</div>
							<div className="col-sm-12">
								* wajib diisi <br />
								** penambahan 24 karakter diawal digunakan untuk URL produk
							</div>
						</div>
						<div className="row">
							<div className="col-sm-12">
								<a className="btn btn-green" href="javascript:;" 
									onClick={!this.props.processing ? this.props.handler.onRepostProduct : null}
					                disabled={this.props.processing}>
									<span className="fa fa-retweet">
										&nbsp;&nbsp;{this.props.processing ? 'loading...' : 'repost'}
									</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = RepostPage;