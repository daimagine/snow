var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var ProductStore = require('../../stores/ProductStore.react.jsx')
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var ProductActionCreators = require('../../actions/ProductActionCreators.react.jsx');
var AuthenticatedMixin = require('../../components/common/AuthenticatedMixin.react.jsx');
var ReactInfinity = require('react-infinity');
var AppConstants = require('../../constants/AppConstants.js')
	, ProductCategory = AppConstants.ProductCategory;
var ProductItemBase = require('./ProductItem.react.jsx')
	, DigitalOverlay = ProductItemBase.DigitalOverlay
	, RetailOverlay = ProductItemBase.RetailOverlay
	, TicketOverlay = ProductItemBase.TicketOverlay;

var Breadcrumb = require('../../components/common/Breadcrumb.react.jsx');
var ProductList = require('./ProductList.react.jsx');


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
				<ProductList user={this.props.user} products={this.state.products} />
			</div>
		);
	}

});

module.exports = ProductsPage;