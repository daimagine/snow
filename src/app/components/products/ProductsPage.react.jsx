var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var ProductStore = require('../../stores/ProductStore.react.jsx')
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var ProductActionCreators = require('../../actions/ProductActionCreators.react.jsx');
var AuthenticatedMixin = require('../../components/common/AuthenticatedMixin.react.jsx');

var Breadcrumb = require('../../components/common/Breadcrumb.react.jsx');
var GettingStartedWidget = require('../../components/common/GettingStartedWidget.react.jsx');


var ProductsPage = React.createClass({

  	mixins: [AuthenticatedMixin],

	propTypes: {
		user: ReactPropTypes.object
	},

	getInitialState: function() {
    	console.log('ProductsPage.react: getInitialState')
		return {
			products: ProductStore.getAllProducts(), // get form product store
			errors: []
		}
	},

	componentDidMount: function() {
    	console.log('ProductsPage.react: componentDidMount')
		ProductStore.addChangeListener(this._onChange);
		ProductActionCreators.loadCustomerProducts();
	},

	componentWillUnmount: function() {
    	console.log('ProductsPage.react: componentWillUnmount')
		ProductStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    	console.log('ProductsPage.react: _onChange')
		this.setState({
			products: ProductStore.getAllProducts(),
			errors: ProductStore.getErrors()
		});
	},

	_getPaths: function() {
		return [
			{ 'key' : 'home', 'title' : 'Dashboard', 'link' : 'home' },
			{ 'key' : 'products', 'title' : 'Daftar Produk', 'link' : null }
		]
	},

	render: function() {
		return (
			<div className="content">
				<Breadcrumb paths={this._getPaths()} />
				<ProductList products={this.state.products} />
			</div>
		);
	}

});

var ProductList = React.createClass({
	render: function() {
		return (
			<div className="row">
		        { this.props.products.map(function(product, index) {
		        	return <ProductItem product={product} key={"product-" + index}/>
		        })}
			</div>
		);
	}
});

var ProductItem = React.createClass({
	render: function() {
		var imageURL = this.props.product.image.split(',')[0];
		return (
			<div className="col-xs-12 col-sm-4">
				<div className="grid simple">
					<div className="grid-title text-center">
						<h3>{this.props.product.name}</h3>
					</div>
					<div className="grid-body">
						<div class="text-center">
		                    <div class="product-image m-b-10">
		                    	<img src="/assets/images/ajax-loader.gif" 
		                    		data-src={ imageURL } className="center lazy"
		                    		alt="gambar produk"/>
		                    </div>
		                </div>
		                <hr />
		                <p>
		                	{ this.props.product.is_affiliate_ready ? (
		                			<h5>
		                				affiliate fee &nbsp;
		                				<strong>Rp { this.props.product.affiliate_fee }</strong>
		                			</h5>
		                		) : (
		                			<span>produk belum mendukung affiliate</span>
		                		) 
		                	}
		                </p>
		                <hr className="m-b-10"/>
			    		<Link to='product' params={ {productId: this.props.product.id} }>lihat detail produk</Link>
			    	</div>
			    </div>
    		</div>
    	);
	}
});

module.exports = ProductsPage;