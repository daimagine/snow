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
			affiliate: AffiliateStore.getAffiliate(),
			errors: [],
			messages: [],
			processing: false
		}
	},

	componentDidMount: function() {
    	console.log('RepostPage.react: componentDidMount')
		ProductStore.addChangeListener(this._onChange);
		SocmedStore.addChangeListener(this._onSocmedChange);
		ProductActionCreators.loadProduct(this.getParams().productId);
		SocmedActionCreators.loadSocmedAccounts(this.props.user.id);

		console.log('RepostPage.react: affiliate mode', this.props.query.affiliate);
		if (this.props.query.affiliate) {
			AffiliateStore.addChangeListener(this._onAffiliateChange);
			AffiliateActionCreators.loadAffiliateInfo(this.getParams().productId, this.props.user.id);
		}
	},

	componentWillUnmount: function() {
    	console.log('RepostPage.react: componentWillUnmount')
		ProductStore.removeChangeListener(this._onChange);
		SocmedStore.removeChangeListener(this._onSocmedChange);

		if (this.props.query.affiliate) {
			AffiliateStore.removeChangeListener(this._onAffiliateChange);
		}
	},

	_onAffiliateChange: function() {
    	console.log('RepostPage.react: _onAffiliateChange', 
    		AffiliateStore.getAffiliate(),
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
		var title = this.state.product ? this.state.product.name : 'Detail Produk';
		var links = [];
		links.push({ 'key' : 'home', 'title' : 'Dashboard', 'link' : 'home' });
		if (this.props.query.affiliate) {
			links.push({ 'key' : 'affiliates', 'title' : 'Daftar Produk Affiliate', 'link' : 'affiliate-products' });
			links.push({ 
				'key' : 'affiliate', 
				'title' : title, 
				'link' : 'affiliate-detail', 
				'params' : productParams 
			});
		} else {
			links.push({ 'key' : 'products', 'title' : 'Daftar Produk', 'link' : 'products' });
			links.push({ 
				'key' : 'product', 
				'title' : title, 
				'link' : 'product', 
				'params' : productParams 
			});
		}
		links.push({ 'key' : 'repost-product', 'title' : 'Repost Produk', 'link' : null });
		return links
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
			headline: "",
			product_page: ""
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
	},

	componentWillReceiveProps: function(nextProps) {
		var headline = "";
		var product_page = "";
		console.log('RepostForm: componentWillReceiveProps affiliate', nextProps.affiliate);
		if (nextProps.affiliate) {
			if (nextProps.affiliate.headline) {
				headline = nextProps.affiliate.headline;
			}
			if (nextProps.affiliate.product_page) {
				product_page = nextProps.affiliate.product_page;
			}

		} else {
			if (nextProps.product.headline) {
				headline = nextProps.product.headline;
			}
			if (nextProps.product.product_page) {
				product_page = nextProps.product.product_page;
			}
		}
		console.log('RepostForm: set headline, product page', headline, product_page);

		var selections = [];
		for (var idx in nextProps.socmedAccounts) {
			var socmed = nextProps.socmedAccounts[idx];
			selections.push(socmed.id);
		}
		console.log('RepostForm: socmed selections', selections);

		this.setState({headline: headline, product_page: product_page, selectedSocmeds: selections});
	},

	_socmedSelection: function(e) {
		var id = Number(e.target.value);
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
		console.log('RepostForm: render. affiliate', this.props.affiliate);
		var handler = this;
		return(
			<div className="row">
				<div className="col-xs-12 col-sm-7">
					<div className="grid simple">
						<div className="grid-title">
							<h4>Atur <span className="semi-bold">Headline</span></h4>
						</div>
						<div className="grid-body">
							<div className="row m-b-20">
								<div className="col-xs-12 col-md-3">
									* Headline:
								</div>
								<div className="col-xs-12 col-md-9">
									<textarea onChange={this._onHeadlineChange} style={{width:'100%'}}>
										{this.state.headline}
									</textarea>
								</div>
								<div className="col-xs-12 col-md-9 col-md-offset-3 m-b-10">
									* Total Karakter: <span>{this.state.headline.length}</span>
								</div>
								<div className="col-xs-12">
									Preview
								</div>
								<div className="col-xs-12 col-md-7 m-b-20">
									<img src={this.props.product.image} className="img-responsive" />
								</div>
								<div className="col-xs-12 col-md-5">
									{this.state.headline} <strong>{this.state.product_page}</strong>
									<hr className="m-t-10 m-b-10"/>
									<strong>{this.props.product.description}</strong>
								</div>
								<div className="col-xs-12 m-t-30">
									* wajib diisi <br />
									** penambahan 24 karakter diawal digunakan untuk URL produk
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xs-12 col-sm-5">
					<div className="grid simple">
						<div className="grid-title">
							<h4>Akun <span className="semi-bold">Anda</span></h4>
						</div>
						<div className="grid-body">
							<div className="row">
								<div className="col-xs-12">
									<table className="table">
			                            <tbody>
				                            {this.props.socmedAccounts.map(function(socmedAccount, index){
									          return (
									            <tr key={"socmed-"+index}>
					                                <td className="v-align-middle" style={{width:'1%'}}>
					                                  <div className="checkbox check-success">
					                                    <input id="activeSM01" type="checkbox" 
					                                    	value={socmedAccount.id} 
					                                    	onChange={handler._socmedSelection}
					                                    	defaultChecked={true} />
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
							<div className="row">
								<div className="col-xs-12">
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
			</div>
		);
	}
});

module.exports = RepostPage;