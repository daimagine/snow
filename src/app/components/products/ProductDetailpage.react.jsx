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


var ProductDetailPage = React.createClass({

  	mixins: [AuthenticatedMixin, State],

	propTypes: {
		user: ReactPropTypes.object
	},

	getInitialState: function() {
    	console.log('ProductDetailPage.react: getInitialState')
		return {
			product: ProductStore.getProduct(), // get form product store
			errors: [],
			messages: [],
			showAffiliateModal: false
		}
	},

	componentDidMount: function() {
    	console.log('ProductDetailPage.react: componentDidMount')
		ProductStore.addChangeListener(this._onChange);
		ProductActionCreators.loadProduct(this.getParams().productId);
	},

	componentWillUnmount: function() {
    	console.log('ProductDetailPage.react: componentWillUnmount')
		ProductStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    	console.log('ProductDetailPage.react: _onChange', 
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
			{ 'key' : 'products', 'title' : 'Daftar Produk', 'link' : 'products' },
			{ 'key' : 'product', 'title' : title, 'link' : null }
		]
	},

	onOpenAffilateModal: function() {
		console.log('ProductDetailPage: onOpenAffilateModal');
		this.setState({ showAffiliateModal: true, errors: [] });
	},

	onCloseAffiliateModal: function() {
		console.log('ProductDetailPage: onCloseAffiliateModal');
		this.setState({ showAffiliateModal: false });
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
										<ProductDescription product={this.state.product} />
									</div>
									<ProductOverview handler={this} product={this.state.product} />
						          	<AffiliateModal 
						          		handler={this}
						          		show={this.state.showAffiliateModal} 
						          		product={this.state.product}/>
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

	componentWillMount: function() {
		if (this.props.handler === undefined) {
			throw new Error("ProductOverview: Parent component class must give handler props.")
		}
		else if (typeof this.props.handler.onOpenAffilateModal !== 'function') {
			throw new Error("ProductOverview: Parent component class must implement onOpenAffilateModal().")
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
						<h4>Pengaturan <span className="semi-bold">Affiliate</span></h4>
					</div>
					<div className="grid-body">
						{ this.props.product.is_affiliate_ready ? (
							<div>
								<p>
									Produk ini sudah terdaftar sebagai produk affiliate dan 
									sudah tersedia bagi affiliator untuk ikut menjual produk ini.
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
						) : (
							<p>
								Aktifkan affiliate dan atur komisi penjualan affiliator untuk produk ini
							</p>
						) }
						
		                <hr/>
						<ul className="list-inline with-margin">
							<li>
								{ this.props.product.is_affiliate_ready ? (
									<a className="btn btn-success" href="javascript:;" 
										onClick={this.props.handler.onOpenAffilateModal}>
										<span className="fa fa-pencil-square-o">
											&nbsp;&nbsp;atur affiliate
										</span>
									</a>
								) : (
									<a className="btn btn-default" href="javascript:;" 
										onClick={this.props.handler.onOpenAffilateModal}>
										<span className="fa fa-money">
											&nbsp;&nbsp;aktifkan affiliate
										</span>
									</a>
								) }
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
});


var AffiliateModal = React.createClass({

	propTypes: {
		handler: ReactPropTypes.object,
		product: ReactPropTypes.object
	},

	getInitialState: function() {
		return({
			product: this.props.product,
			errors: [],
			saving: false
		});
	},

	componentWillReceiveProps: function(nextProps) {
		console.log('AffiliateModal: componentWillReceiveProps', nextProps);
		this.setState({
			saving: false
		});
	},

	componentWillMount: function() {
		console.log('AffiliateModal: componentWillMount', this.props.product);
		if (this.props.handler === undefined) {
			throw new Error("AffiliateModal: Parent component class must give handler props.")
		}
		else if (typeof this.props.handler.onCloseAffiliateModal !== 'function') {
			throw new Error("AffiliateModal: Parent component class must implement onCloseAffiliateModal().")
		}
	},

	onAffiliateChange: function() {
		var product = this.state.product;
		product.is_affiliate_ready = !product.is_affiliate_ready;
		var nextState = {
			product: product
		};
		console.log('AffiliateModal: onAffiliateChange', nextState);
	    this.setState(nextState);
	},

	onAffiliateFeeTypeChange: function(e) {
		var product = this.state.product;
		product.affiliate_fee_type = e.target.value;
		var nextState = {
			product: product
		};
		console.log('AffiliateModal: onAffiliateFeeTypeChange', nextState);
	    this.setState(nextState);
	},

	onAffiliateFeeChange: function(e) {
		if (!e.target.value && Number(e.target.value) == 0) {
			e.preventDefault();
			return;
		}
		var product = this.state.product;
		product.affiliate_fee = Number(e.target.value);
		var nextState = {
			product: product
		};
	    this.setState(nextState);
	},

	onSave: function() {
		console.log('AffiliateModal: onSave', this.refs);
		this.setState({
			saving: true
		});

		var product = this.state.product;
		if (product.is_affiliate_ready ) {
			if (product.affiliate_fee <= 0) {
				this.setState({
					errors: ["Affiliate fee tidak boleh kurang dari 0"],
					saving: false
				});
				return

			} else if (product.affiliate_fee_type == 1 && product.affiliate_fee > 100) {
				this.setState({
					errors: ["Affiliate fee tidak boleh kurang dari 0% dan tidak lebih dari 100%"],
					saving: false
				});
				return
			}
		}
		console.log('AffiliateModal: updating product', product);
		ProductActionCreators.updateProduct(product);
		this.props.handler.onCloseAffiliateModal();
	},

	render: function() {
		var errors = this.state.errors.length > 0 ? (
			<div className="form-row"><ErrorNotice errors={this.state.errors} /></div>
		) : (
			<div></div>
		);

		return(
			<Modal show={this.props.show} onHide={this.props.handler.onCloseAffiliateModal} bySize="medium">
				<Modal.Header closeButton>
					<Modal.Title>Pengaturan Affiliate</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{errors}
					<div className="form-row">
				        <div className="form-group">
				            <div className="checkbox check-success">
			                    <input ref="affiliateReady" name="affiliateReady" type="checkbox" 
				                    checked={this.state.product.is_affiliate_ready}
			                    	readOnly />
			                    <label htmlFor="affiliateReady" className="form-label"
			                    	onClick={this.onAffiliateChange}>
					              Affiliate aktif
					            </label>
			                  </div>
				        </div>
				        <div className="form-group">
							<label htmlFor="affiliateFeeType">
								Product Type :
								<select ref="affiliateFeeType" name="affiliateFeeType" 
									className="select2 form-control" 
									value={this.state.product.affiliate_fee_type}
									onChange={this.onAffiliateFeeTypeChange} >
									{this.state.product.affiliate_fee_type == '0' ? (
										<option value="0" selected>Flat</option>
									):(
										<option value="0">Flat</option>
									)}
									{this.state.product.affiliate_fee_type == '1' ? (
										<option value="1" selected>Persentase</option>
									):(
										<option value="1">Persentase</option>
									)}
								</select>
							</label>
			          	</div>
					    <div className="form-group">
				            <label htmlFor="affiliateFee" className="form-label">
				              Affiliate Fee :
				            </label>
				            <input
				            	type="number"
				            	ref="affiliateFee"
				            	className="form-control" 
				            	value={this.state.product.affiliate_fee}
				            	onChange={this.onAffiliateFeeChange}
				            	addonAfter={this.state.product.affiliate_fee_type == '1' ? '%' : ''} />
				        </div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button bsStyle="primary" onClick={this.onSave} disabled={this.state.saving}>
						{this.state.saving ? "meyimpan..." : "simpan"} 
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
});


module.exports = ProductDetailPage;