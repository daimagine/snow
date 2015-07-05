var React = require('react');
var Router = require('react-router');
var State = Router.State;
var ReactPropTypes = React.PropTypes;
var ProductStore = require('../../stores/ProductStore.react.jsx')
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var ProductActionCreators = require('../../actions/ProductActionCreators.react.jsx');
var AuthenticatedMixin = require('../../components/common/AuthenticatedMixin.react.jsx');

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
			errors: []
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
    	console.log('ProductDetailPage.react: _onChange')
		this.setState({
			product: ProductStore.getProduct(),
			errors: ProductStore.getErrors()
		});
		console.log('ProductDetailPage.react: errors', ProductStore.getErrors());
	},

	_getPaths: function() {
		return [
			{ 'key' : 'home', 'title' : 'Dashboard', 'link' : 'home' },
			{ 'key' : 'products', 'title' : 'Daftar Produk', 'link' : 'products' },
			{ 'key' : 'product', 'title' : 'Detail Produk', 'link' : null }
		]
	},

	render: function() {
    	return (
			<div className="content">
				<Breadcrumb paths={this._getPaths()} />
				<div className="row">
		          	{ this.state.errors.length > 0 ?
		          		(
		            		<div className="col-md-12">
			              		<ErrorNotice errors={this.state.errors}/>
			              	</div>
		          		) : (
			            	<div className="col-md-12">
								{ this.state.product ? (
										<div>
											<div className="col-xs-12 col-sm-6">
												<ProductCarousel product={this.state.product} />
												<ProductDescription product={this.state.product} />
											</div>
											<ProductOverview product={this.state.product} />
										</div>
									) : (
										<div className="alert alert-info" role="alert">
							              Informasi produk sedang disiapkan...
							            </div>
									)
								}
							</div>
		          		)
		          	}
	          	</div>
			</div>
		);
	}

});

var ProductOverview = React.createClass({
	render: function() {
		return(
			<div className="col-xs-12 col-sm-6">
				<div className="grid simple">
					<div className="grid-title">
						<h4>{this.props.product.name}</h4>
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
						<h4>Social Media</h4>
					</div>
					<div className="grid-body">
						<ul className="list-inline with-margin">
							<li><a href="javascript:;" className="btn btn-facebook btn normal"><span className="fa fa-facebook"></span></a></li>
							<li><a href="javascript:;" className="btn btn-twitter btn normal"><span className="fa fa-twitter"></span></a></li>
							<li><a href="javascript:;" className="btn btn-instagram btn normal"><span className="fa fa-instagram"></span></a></li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = ProductDetailPage;