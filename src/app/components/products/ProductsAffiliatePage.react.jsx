var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var ProductStore = require('../../stores/ProductStore.react.jsx')
var ProductActionCreators = require('../../actions/ProductActionCreators.react.jsx');
var AuthenticatedMixin = require('../../components/common/AuthenticatedMixin.react.jsx');
var ReactInfinity = require('react-infinity');

var Breadcrumb = require('../../components/common/Breadcrumb.react.jsx');
var ProductList = require('./ProductList.react.jsx');


var ProductsAffiliatePage = React.createClass({

  	mixins: [AuthenticatedMixin],

	propTypes: {
		user: ReactPropTypes.object
	},

	getInitialState: function() {
    	console.log('ProductsAffiliatePage.react: getInitialState')
		return {
			products: ProductStore.getAllProducts(), // get form product store
		}
	},

	componentDidMount: function() {
    	console.log('ProductsAffiliatePage.react: componentDidMount')
		ProductStore.addChangeListener(this._onChange);
		ProductActionCreators.loadCustomerAffiliateProducts();
	},

	componentWillUnmount: function() {
    	console.log('ProductsAffiliatePage.react: componentWillUnmount')
		ProductStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    	console.log('ProductsAffiliatePage.react: _onChange')
		this.setState({
			products: ProductStore.getAllProducts()
		});
	},

	_getPaths: function() {
		return [
			{ 'key' : 'home', 'title' : 'Dashboard', 'link' : 'home' },
			{ 'key' : 'products', 'title' : 'Daftar Produk Affiliate', 'link' : null }
		]
	},

	render: function() {
		return (
			<div className="content">
				<Breadcrumb paths={this._getPaths()} />
				<ProductList user={this.props.user} products={this.state.products} affiliate_mode={true} />
			</div>
		);
	}
});

module.exports = ProductsAffiliatePage;