var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var ProductStore = require('../../stores/ProductStore.react.jsx')
var ProductActionCreators = require('../../actions/ProductActionCreators.react.jsx');
var AuthenticatedMixin = require('../../components/common/AuthenticatedMixin.react.jsx');

var Breadcrumb = require('../../components/common/Breadcrumb.react.jsx');
var ProductList = require('./ProductList.react.jsx');


var ProductAffiliateSearchPage = React.createClass({

  	mixins: [AuthenticatedMixin],

	propTypes: {
		user: ReactPropTypes.object
	},

	getInitialState: function() {
    	console.log('ProductAffiliateSearchPage.react: getInitialState')
		return {
			products: [], // get form product store
			searching: false,
			timeout: null,
			advance_search: {
				advance: false,
				sort: {'fee' : 1}, // 0: ascending, 1: descending
				name: null,
				price: {
					min: null,
					max: null
				},
				seller: null,
				fee: {
					min: null,
					max: null
				},
			}
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
			searching: false
		});
	},

	showAdvanceSearch: function(e) {
		e.preventDefault();
		var advance_search = this.state.advance_search;
		advance_search.advance = !advance_search.advance;
		this.setState({ advance_search: advance_search });
	},

	_onAdvanceSearchChange: function(e) {
		console.log('ProductAffiliateSearchPage.react: _onAdvanceSearchChange');
		var val = e.target.value;
		var attr = e.target.attributes.getNamedItem('data-attribute').value;
		console.log('ProductAffiliateSearchPage.react: criteria selection', attr, val);
		var advance_search = this.state.advance_search;
		switch (attr) {
			case 'name':
				advance_search.name = val;
				break;
			case 'price':
				advance_search.price = val;
				break;
			case 'seller':
				advance_search.seller = val;
				break;
			case 'fee.min':
				advance_search.fee.min = val;
				break;
			case 'fee.max':
				advance_search.fee.max = val;
				break;
			case 'price.min':
				advance_search.fee.min = val;
				break;
			case 'price.max':
				advance_search.fee.max = val;
				break;
		}
		console.log('ProductAffiliateSearchPage.react: advance_search state', advance_search);
		if (this.state.timeout !== null) {
	        clearTimeout(this.state.timeout);
	    }
	    var that = this;
	    this.setState({
	    	timeout: setTimeout(function () {
				        	that._searchAffiliateProduct(advance_search, true);
				    	}, 1000)
	    });
	},

	_onSearch: function(e) {
		console.log('ProductAffiliateSearchPage.react: _onSearch');
		var criteria = e.target.value;

	    if (this.state.timeout !== null) {
	        clearTimeout(this.state.timeout);
	    }
	    var that = this;
	    this.setState({
	    	timeout: setTimeout(function () {
				        	that._searchAffiliateProduct(criteria);
				    	}, 1000)
	    });
	},

	_searchAffiliateProduct: function(criteria, advance) {
		this.setState({ searching: true });
		var advance_search = this.state.advance_search;
		if (advance) {
			advance_search = criteria;
		} else {
			advance_search.name = criteria;
		}
		this.setState({ advance_search: advance_search });
		ProductActionCreators.searchAffiliateProducts(advance_search);
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
					<div className="col-xs-12" style={{ display: this.state.advance_search.advance ? 'none' : 'block' }}>
						<div className="m-r-10 input-prepend inside search-form no-boarder" style={{width:'100%'}}>
							<span className="add-on">
								{this.state.searching ? (
									<span className="fa fa-spinner fa-pulse"></span>
								) : (
									<span className="iconset top-search"></span>
								)}
							</span>
		                	<input type="text"
		                		ref="searchInput"
		                		onChange={this._onSearch}
				               	placeholder="Cari Produk" 
				               	className="no-boarder page-search-input" />
						</div>
					</div>
					<div className="col-xs-12" style={{ display: this.state.advance_search.advance ? 'block' : 'none' }}>
						<h3>Cari berdasarkan kriteria lebih lanjut</h3>
						<p>
							Nama Produk:
							<input value={this.state.advance_search.name} 
								data-attribute='name'
								onChange={this._onAdvanceSearchChange} />
						</p>
						<p>
							Nama Penjual:
							<input value={this.state.advance_search.seller} 
								data-attribute='seller'
								onChange={this._onAdvanceSearchChange} />
						</p>
						<p>
							Harga Minimal:
							<input value={this.state.advance_search.price.min} 
								data-attribute='price.min'
								onChange={this._onAdvanceSearchChange} />

							Harga Maksimal:
							<input value={this.state.advance_search.price.max} 
								data-attribute='price.max'
								onChange={this._onAdvanceSearchChange} />
						</p>
						<p>
							Komisi Minimal:
							<input value={this.state.advance_search.fee.min} 
								data-attribute='fee.min'
								onChange={this._onAdvanceSearchChange} />

							Komisi Maksimal:
							<input value={this.state.advance_search.fee.max} 
								data-attribute='fee.max'
								onChange={this._onAdvanceSearchChange} />
						</p>
					</div>
					<div className="col-xs-6 col-xs-offset-6 text-right">
						<a href="#" className="btn btn-link" onClick={this.showAdvanceSearch}>
							{this.state.advance_search.advance ? 'Pencarian Sederhana' : 'Pencarian Lanjut'}
						</a>
					</div>
				</div>
				{
					this.state.products.length > 0 ? (
						<ProductList user={this.props.user} products={this.state.products} affiliate_mode={true}/>
					) : (
						<div className="row">
							<div className="col-xs-12">
								<div className="alert alert-info" role="alert">
					              Masukkan nama produk yang dicari di textbox di atas.
					            </div>
							</div>
						</div>
					)
				}
			</div>
		);
	}
});

module.exports = ProductAffiliateSearchPage;