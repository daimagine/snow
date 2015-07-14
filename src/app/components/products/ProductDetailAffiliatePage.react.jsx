var React = require('react');
var Router = require('react-router');
var State = Router.State;
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var ProductStore = require('../../stores/ProductStore.react.jsx')
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var MessageNotice = require('../../components/common/MessageNotice.react.jsx');
var ProductActionCreators = require('../../actions/ProductActionCreators.react.jsx');
var AuthenticatedMixin = require('../../components/common/AuthenticatedMixin.react.jsx');
var ReactBootstrap = require('react-bootstrap')
	, Modal = ReactBootstrap.Modal
	, Button = ReactBootstrap.Button
	, Input = ReactBootstrap.Input;

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
			errors: [],
			messages: [],
			showAffiliateModal: false
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
    	console.log('ProductDetailAffiliatePage.react: _onChange', 
    		ProductStore.getErrors(), 
    		ProductStore.getMessages());

		this.setState({
			product: ProductStore.getProduct(),
			errors: ProductStore.getErrors(),
			messages: ProductStore.getMessages()
		});
	},

	_getPaths: function() {
		var title = this.state.product ? this.state.product.name : 'Detail Produk';
		return [
			{ 'key' : 'home', 'title' : 'Dashboard', 'link' : 'home' },
			{ 'key' : 'products', 'title' : 'Daftar Produk Affiliate', 'link' : 'affiliate-products' },
			{ 'key' : 'product', 'title' : title, 'link' : null }
		]
	},

	onRemoveAffiliate: function() {
		console.log('ProductDetailAffiliatePage: onRemoveAffiliate');
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
						{ this.state.product ? (
								<div>
									<div className="col-xs-12 col-sm-6">
										<ProductCarousel product={this.state.product} />
										<ProductDescription product={this.state.product} showCustomer={true}/>
									</div>
									<ProductOverview handler={this} product={this.state.product} />
						          	
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
		handler: ReactPropTypes.object
	},

	componentWillUnmount: function() {
		if (this.props.handler === undefined) {
			throw new Error("ProductOverview: Parent component class must give handler props.")
		}
		else if (typeof this.props.handler.onRemoveAffiliate !== 'function') {
			throw new Error("ProductOverview: Parent component class must implement onRemoveAffiliate().")
		}
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
								<p>Rp. {this.props.product.price}</p>
							</div>
						</div>
					</div>
				</div>
				<div className="grid simple">
					<div className="grid-title">
						<h4>Informasi <span className="semi-bold">Affiliate</span></h4>
					</div>
					<div className="grid-body">
						<div>
							<p>
								Anda sudah terdaftar sebagai affiliator produk untuk ikut menjual produk ini.
							</p>
							<table class="table">
			                    <tbody>
			                      <tr class="no-border">
			                        <td>Tipe Komisi</td>
			                        <td width="10px">:</td>
			                        <td>
			                        	<span className="semi-bold">
			                        		{this.props.product.affiliate_fee_type == "0" ? 'Flat' : 'Persentase'}
			                        	</span>
			                        </td>
			                      </tr>
			                      <tr class="no-border">
			                        <td>Komisi Affiliate</td>
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
									onClick={this.props.handler.onRemoveAffiliate}>
									<span className="fa fa-minus-circle">
										&nbsp;&nbsp;stop affiliator
									</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
});


module.exports = ProductDetailAffiliatePage;