var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var ProductStore = require('../../stores/ProductStore.react.jsx')
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var ProductActionCreators = require('../../actions/ProductActionCreators.react.jsx');
var AuthenticatedMixin = require('../../components/common/AuthenticatedMixin.react.jsx');

var Breadcrumb = require('../../components/common/Breadcrumb.react.jsx');


var ProductsAdd = React.createClass({

  	mixins: [AuthenticatedMixin],

	propTypes: {
		user: ReactPropTypes.object
	},

	getInitialState: function() {
    	console.log('ProductsAdd.react: getInitialState')
		return {
			product: ProductStore.getProduct(), // get form product store
			errors: []
		}
	},

	componentDidMount: function() {
    	console.log('ProductsAdd.react: componentDidMount')
		ProductStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
    	console.log('ProductsAdd.react: componentWillUnmount')
		ProductStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    	console.log('ProductsAdd.react: _onChange')
		this.setState({
			product: ProductStore.getProduct(),
			errors: ProductStore.getErrors()
		});
	},

	_getPaths: function() {
		return [
			{ 'key' : 'home', 'title' : 'Dashboard', 'link' : 'home' },
			{ 'key' : 'products', 'title' : 'Daftar Produk', 'link' : 'products' },
			{ 'key' : 'add', 'title' : 'Tambah Produk', 'link' : null }
		]
	},

	render: function() {
		return (
			<div className="content">
				<Breadcrumb paths={this._getPaths()} />
				<div>
					form produk
				</div>
			</div>
		);
	}

});

module.exports = ProductsAdd;