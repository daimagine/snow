var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var ProductStore = require('../../stores/ProductStore.react.jsx')
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var ProductActionCreators = require('../../actions/ProductActionCreators.react.jsx');
var AuthenticatedMixin = require('../../components/common/AuthenticatedMixin.react.jsx');
var ReactInfinity = require('react-infinity');

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
			<ReactInfinity
		      data={this.props.products}
		      elementWidth={300}
		      elementHeight={290}
			  justifyOnMobile={false} // pass true to switch to a list instead of a grid on mobile.
			  elementMobileWidth={400} // element width to use for mobile view when `justifyOnMobile === false`
		      margin={10}
		      align="left"
		      childComponent={React.createFactory(ProductItem)}
		      />
		);
	}
});

var ProductItem = React.createClass({
	render: function() {
		var imageURL = this.props.image.split(',')[0];
		return (
			<div className="grid simple">
				<div className="grid-title text-center">
					<h3>{this.props.name}</h3>
				</div>
				<div className="grid-body">
					<div className="text-center">
	                    <div className="product-image m-b-10" style={{ height:'100px' }}>
	                    	<img src={ imageURL } className="center"
	                    		alt="gambar produk"/>
	                    </div>
	                </div>
	                <hr className="m-b-10"/>
	                <Link to='product' params={{productId: this.props.id}} 
						className="btn btn-primary">
						<span className="fa fa-info-circle">&nbsp;lihat detail</span>
					</Link>
					&nbsp;&nbsp;
					<Link to='edit-product' params={{productId: this.props.id}} 
						className="btn btn-primary">
						<span className="fa fa-pencil-square-o">&nbsp;edit produk</span>
					</Link>
		    	</div>
		    </div>
    	);
	}
});

module.exports = ProductsPage;