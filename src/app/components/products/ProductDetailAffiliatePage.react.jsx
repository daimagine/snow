var React = require('react');
var Router = require('react-router');
var State = Router.State;
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var AuthenticatedMixin = require('../../components/common/AuthenticatedMixin.react.jsx');
var ReactBootstrap = require('react-bootstrap')
	, Modal = ReactBootstrap.Modal
	, Button = ReactBootstrap.Button
	, Input = ReactBootstrap.Input;
var NumberFormatter = require('../../utils/StringUtils.js').numberFormatter();

var ProductStore = require('../../stores/ProductStore.react.jsx');
var ProductActionCreators = require('../../actions/ProductActionCreators.react.jsx');
var AffiliateStore = require('../../stores/AffiliateStore.react.jsx');
var AffiliateActionCreators = require('../../actions/AffiliateActionCreators.react.jsx');

var Breadcrumb = require('../../components/common/Breadcrumb.react.jsx');
var ProductCarousel = require('./ProductCarousel.react.jsx');
var ProductDescription = require('./ProductDescription.react.jsx');


var ProductDetailAffiliatePage = React.createClass({

  	mixins: [AuthenticatedMixin, State],

	propTypes: {
		user: ReactPropTypes.object
	},

	getInitialState: function() {
    	console.log('ProductDetailAffiliatePage.react: getInitialState')
		return {
			product: ProductStore.getProduct(), // get form product store
			isAffiliator: false,
			processing: false
		}
	},

	componentDidMount: function() {
    	console.log('ProductDetailAffiliatePage.react: componentDidMount')
		ProductStore.addChangeListener(this._onChange);
		ProductActionCreators.loadProduct(this.getParams().productId);
	},

	componentWillUnmount: function() {
    	console.log('ProductDetailAffiliatePage.react: componentWillUnmount')
		ProductStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    	console.log('ProductDetailAffiliatePage.react: _onChange');

		this.setState({
			product: ProductStore.getProduct(),
			isAffiliator: ProductStore.isProductAffiliator(this.props.user),
			processing: false
		});
	},

	_getPaths: function() {
		var title = this.state.product ? this.state.product.name : 'Detail Produk';
		var links = [];
		links.push({ 'key' : 'home', 'title' : 'Dashboard', 'link' : 'home' });
		if (this.props.query.searchMode) {
			links.push({ 'key' : 'products', 'title' : 'Cari Produk Affiliate', 'link' : 'affiliate-search' });
		} else {
			links.push({ 'key' : 'products', 'title' : 'Daftar Produk Affiliate', 'link' : 'affiliate-products' });
		}
		links.push({ 'key' : 'product', 'title' : title, 'link' : null });
		return links
	},

	onRemoveAffiliate: function() {
		console.log('ProductDetailAffiliatePage: onRemoveAffiliate');
		// call product action creator to remove affiliate
		this.setState({processing: true});
		ProductActionCreators.removeAffiliate(this.props.user, this.state.product);
	},

	onJoinAffiliate: function() {
		console.log('ProductDetailAffiliatePage: onJoinAffiliate');
		// call product action creator to join affiliate
		this.setState({processing: true});
		ProductActionCreators.joinAffiliate(this.props.user, this.state.product);
	},

	render: function() {
    	return (
			<div className="content">
				<Breadcrumb paths={this._getPaths()} />
				<div className="row">
					<div className="col-md-12">
						{ this.state.product ? (
								<div>
									<div className="col-xs-12 col-sm-6">
										<ProductCarousel product={this.state.product} />
										<ProductDescription product={this.state.product} showCustomer={true}/>
									</div>
									<ProductOverview handler={this} 
										user={this.props.user}
										product={this.state.product} 
										isAffiliator={this.state.isAffiliator}
										processing={this.state.processing}/>
						          	
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

var ProductOverview = React.createClass({

	propTypes: {
		handler: ReactPropTypes.object,
		isAffiliator: ReactPropTypes.bool,
		processing: ReactPropTypes.bool
	},

	componentWillMount: function() {
		if (this.props.handler === undefined) {
			throw new Error("ProductOverview: Parent component class must give handler props.")
		}
		else if (typeof this.props.handler.onRemoveAffiliate !== 'function') {
			throw new Error("ProductOverview: Parent component class must implement onRemoveAffiliate().")
		}
	},

	onRemoveAffiliate: function() {
		console.log('ProductOverview: onRemoveAffiliate');
		this.props.handler.onRemoveAffiliate();
	},

	onJoinAffiliate: function() {
		console.log('ProductOverview: onJoinAffiliate');
		this.props.handler.onJoinAffiliate();
	},

	render: function() {
		return(
			<div className="col-xs-12 col-sm-6">
				<div className="grid simple">
					<div className="grid-title">
						<h4>Informasi <span className="semi-bold">Harga</span></h4>
					</div>
					<div className="grid-body">
						<div className="entitites">
							<div className="icon"><span className="fa fa-tag"></span></div>
							<div className="entity-content">
								<p>{NumberFormatter.formatMoney(this.props.product.price)}</p>
							</div>
						</div>
					</div>
				</div>
				{this.props.isAffiliator == true ? (
					<AffiliatorGrid handler={this} product={this.props.product} 
						user={this.props.user}
						processing={this.props.processing}/>
				) : (
					<NotAffiliatorGrid handler={this} product={this.props.product} 
						processing={this.props.processing}/>
				)}
			</div>
		);
	}
});


var NotAffiliatorGrid = React.createClass({

	propTypes: {
		handler: ReactPropTypes.object,
		processing: ReactPropTypes.bool
	},

	componentWillMount: function() {
		if (this.props.handler === undefined) {
			throw new Error("NotAffiliatorGrid: Parent component class must give handler props.")
		}
		else if (typeof this.props.handler.onJoinAffiliate !== 'function') {
			throw new Error("NotAffiliatorGrid: Parent component class must implement onJoinAffiliate().")
		}
	},

	onJoinAffiliate: function() {
		console.log('NotAffiliatorGrid: onJoinAffiliate');
		this.props.handler.onJoinAffiliate();
	},

	render: function() {
		return(
			<div className="grid simple">
				<div className="grid-title">
					<h4>Informasi <span className="semi-bold">Affiliate</span></h4>
				</div>
				<div className="grid-body">
					<div>
						<p>
							Join sebagai affiliator produk untuk ikut menjual produk ini.
						</p>
						<table className="table">
		                    <tbody>
		                      <tr className="no-border">
		                        <td width="110px">Tipe Komisi</td>
		                        <td width="10px">:</td>
		                        <td>
		                        	<span className="semi-bold">
		                        		{this.props.product.affiliate_fee_type == "0" ? 'Flat' : 'Persentase'}
		                        	</span>
		                        </td>
		                      </tr>
		                      <tr className="no-border">
		                        <td width="110px">Komisi Affiliate</td>
		                        <td width="10px">:</td>
		                        <td>
	                        		{this.props.product.affiliate_fee_type == "0" ? (
	                        			<span className="semi-bold">Rp {this.props.product.affiliate_fee}</span>
	                        		) : (
	                        			<span className="semi-bold">{this.props.product.affiliate_fee}%</span>
	                        		)}
		                        </td>
		                      </tr>
		                    </tbody>
		                </table>
	                </div>
					
	                <hr/>
					<ul className="list-inline with-margin">
						<li>
							<a className="btn btn-green" href="javascript:;" 
								onClick={!this.props.processing ? this.props.handler.onJoinAffiliate : null}
				                disabled={this.props.processing}>
								<span className="fa fa-users">
									&nbsp;&nbsp;{this.props.processing ? 'loading...' : 'join affiliate'}
								</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		);
	}
});


var AffiliatorGrid = React.createClass({

	propTypes: {
		user: ReactPropTypes.object,
		product: ReactPropTypes.object,
		handler: ReactPropTypes.object,
		processing: ReactPropTypes.bool
	},

	getInitialState: function() {
		return {
			affiliate: AffiliateStore.getAffiliate(),
		}
	},

	componentWillMount: function() {
		if (this.props.handler === undefined) {
			throw new Error("AffiliatorGrid: Parent component class must give handler props.")
		}
		else if (typeof this.props.handler.onRemoveAffiliate !== 'function') {
			throw new Error("AffiliatorGrid: Parent component class must implement onRemoveAffiliate().")
		}
	},

	componentDidMount: function() {
		console.log('AffiliatorGrid: componentDidMount');
		AffiliateStore.addChangeListener(this._onAffiliateChange);
		AffiliateActionCreators.loadAffiliateInfo(this.props.product.id, this.props.user.id);
	},

	componentWillUnmount: function() {
		console.log('AffiliatorGrid: componentWillUnmount');
		AffiliateStore.removeChangeListener(this._onAffiliateChange);
	},

	_onAffiliateChange: function() {
    	console.log('AffiliatorGrid: _onAffiliateChange', AffiliateStore.getAffiliate());
		this.setState({
			affiliate: AffiliateStore.getAffiliate()
		});
	},

	onRemoveAffiliate: function() {
		console.log('AffiliatorGrid: onRemoveAffiliate');
		this.props.handler.onRemoveAffiliate();
	},

	render: function() {
		return(
			<div>
				<div className="grid simple">
					<div className="grid-title">
						<h4>Informasi <span className="semi-bold">Affiliate</span></h4>
					</div>
					<div className="grid-body">
						<div>
							<p>
								Anda sudah terdaftar sebagai affiliator produk untuk ikut menjual produk ini.
							</p>
							<table className="table">
			                    <tbody>
			                      <tr className="no-border">
			                        <td width="110px">Tipe Komisi</td>
			                        <td width="10px">:</td>
			                        <td>
			                        	<span className="semi-bold">
			                        		{this.props.product.affiliate_fee_type == "0" ? 'Flat' : 'Persentase'}
			                        	</span>
			                        </td>
			                      </tr>
			                      <tr className="no-border">
			                        <td width="110px">Komisi Affiliate</td>
			                        <td width="10px">:</td>
			                        <td>
		                        		{this.props.product.affiliate_fee_type == "0" ? (
		                        			<span className="semi-bold">Rp {this.props.product.affiliate_fee}</span>
		                        		) : (
		                        			<span className="semi-bold">{this.props.product.affiliate_fee}%</span>
		                        		)}
			                        </td>
			                      </tr>
			                    </tbody>
			                </table>
		                </div>
						
		                <hr/>
						<ul className="list-inline with-margin">
							<li>
								<a className="btn btn-danger" href="javascript:;" 
									onClick={!this.props.processing ? this.props.handler.onRemoveAffiliate : null}
					                disabled={this.props.processing}>
									<span className="fa fa-minus-circle">
										&nbsp;&nbsp;{this.props.processing ? 'loading...' : 'stop affiliate'}
									</span>
								</a>
							</li>
							<li>
								<Link to="repost" 
									params={{productId: this.props.product.id}}
									query={{af: 1}}
									className="btn btn-info">
										<span className="fa fa-retweet">
											&nbsp;&nbsp;repost produk
										</span>
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{ this.state.affiliate ? (
						<div className="grid simple">
							<div className="grid-title">
								<h4>Link <span className="semi-bold">Produk</span></h4>
							</div>
							<div className="grid-body">
								<div className="entitites">
									<div className="icon"><span className="fa fa-globe"></span></div>
									<div className="entity-content">
										<a href={this.state.affiliate.product_page} target="_blank">
											{this.state.affiliate.product_page}
										</a>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div></div>
					) 
				}
			</div>
		);
	}
});


module.exports = ProductDetailAffiliatePage;