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


var ProductAffiliateSearchPage = React.createClass({

  	mixins: [AuthenticatedMixin],

	propTypes: {
		user: ReactPropTypes.object
	},

	getInitialState: function() {
    	console.log('ProductAffiliateSearchPage.react: getInitialState')
		return {
			products: ProductStore.getAllProducts(), // get form product store
			errors: []
		}
	},

	componentDidMount: function() {
    	console.log('ProductAffiliateSearchPage.react: componentDidMount')
		ProductStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
    	console.log('ProductAffiliateSearchPage.react: componentWillUnmount')
		ProductStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    	console.log('ProductAffiliateSearchPage.react: _onChange')
		this.setState({
			products: ProductStore.getAllProducts(),
			errors: ProductStore.getErrors()
		});
	},

	_onSearch: function(e) {
		console.log('ProductAffiliateSearchPage.react: _onSearch');
		var criteria = e.target.value;
		ProductActionCreators.searchAffiliateProducts(criteria);
	},

	_getPaths: function() {
		return [
			{ 'key' : 'home', 'title' : 'Dashboard', 'link' : 'home' },
			{ 'key' : 'products', 'title' : 'Cari Produk Affiliate', 'link' : null }
		]
	},

	render: function() {
		return (
			<div className="content">
				<Breadcrumb paths={this._getPaths()} />
				<div className="row">
					<div className="col-xs-12">
						<div className="m-r-10 input-prepend inside search-form no-boarder" style={{width:'100%'}}>
							<span className="add-on">
								<span className="iconset top-search"></span>
							</span>
		                	<input type="text"
		                		ref="searchInput"
		                		onChange={this._onSearch}
				               	placeholder="Search Item.." 
				               	className="no-boarder page-search-input" />
						</div>
					</div>
				</div>
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
		      elementHeight={400}
			  justifyOnMobile={false} // pass true to switch to a list instead of a grid on mobile.
			  elementMobileWidth={400} // element width to use for mobile view when `justifyOnMobile === false`
			  elementMobileHeight={400}
		      margin={10}
		      align="left"
		      childComponent={React.createFactory(ProductItem)}
		      />
		);
	}
});

var ProductItem = React.createClass({
	render: function() {
		var imageURL = this.props.image ? this.props.image.split(',')[0] : '';
		return (
			<div className="grid simple">
				<div className="grid-title text-center">
					<h3 className="text-ellipsis">{this.props.name}</h3>
				</div>
				<div className="grid-body">
					<div className="text-center">
	                    <div className="product-image m-b-10" style={{ height:'215px' }}>
	                    	<img src={ imageURL } className="center img-responsive img-fit-height"
	                    		alt="gambar produk"/>
	                    </div>
	                </div>
	                <hr className="m-b-10"/>
	                <Link to='affiliate-detail' 
	                	params={{productId: this.props.id}} 
	                	query={{searchMode:true}}
						className="btn btn-small btn-primary">
						<span className="fa fa-info-circle">&nbsp;lihat detail</span>
					</Link>
		    	</div>
		    </div>
    	);
	}
});

module.exports = ProductAffiliateSearchPage;