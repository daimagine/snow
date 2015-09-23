var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var ProductStore = require('../../stores/ProductStore.react.jsx')
var ProductActionCreators = require('../../actions/ProductActionCreators.react.jsx');
var GrowlActionCreators = require('../../actions/GrowlActionCreators.react.jsx');
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
				order_by: 'affiliate_fee',
				order_method : 1, // 0: ascending, 1: descending
				name: null,
				price_min: null,
				price_max: null,
				seller: null,
				fee_min: null,
				fee_max: null
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
			case 'seller':
				advance_search.seller = val;
				break;
			case 'fee_min':
				advance_search.fee_min = val;
				break;
			case 'fee_max':
				advance_search.fee_max = val;
				break;
			case 'price_min':
				advance_search.price_min = val;
				break;
			case 'price_max':
				advance_search.price_max = val;
				break;
		}
		console.log('ProductAffiliateSearchPage.react: advance_search state', advance_search)

		if (this.state.timeout !== null) {
	        clearTimeout(this.state.timeout);
	    }
	    var that = this;
	    this.setState({
	    	timeout: setTimeout(function () {
	    					// uncoment for reactive search
				        	// that._searchAffiliateProduct(advance_search, true);
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
	    					// uncoment for reactive search
				        	// that._searchAffiliateProduct(criteria, false);
				    	}, 1000)
	    });
	},

	refreshSearch: function(e) {
		e.preventDefault();
		console.log('ProductAffiliateSearchPage.react: refreshSearch');
		var is_advance = this.state.advance_search.advance;
		if (is_advance) {
			this._searchAffiliateProduct(this.state.advance_search, true);
		} else {
			this._searchAffiliateProduct(this.state.advance_search.name, false);
		}
	},

	_searchAffiliateProduct: function(criteria, advance) {
		this.setState({ searching: true });
		var advance_search = this.state.advance_search;
		if (advance) {
			advance_search = criteria;
			// validate
			var valid = true;
			var messages = [];
			if (advance_search.fee_max && advance_search.fee_max < advance_search.fee_min) {
				messages.push("Komisi Maksimal tidak boleh lebih kecil dari Komisi Minimal");
				valid = false;
			}
			if (advance_search.price_max && advance_search.price_max < advance_search.price_min) {
				messages.push("Harga Maksimal tidak boleh lebih kecil dari Harga Minimal");
				valid = false;
			}
			if (!valid) {
				console.log("ProductAffiliateSearchPage.react: _onAdvanceSearchChange validate", messages);
				GrowlActionCreators.notify(messages, 'error');
				this.setState({ searching: false });
				return;
			}

		} else {
			advance_search.name = criteria;
		}
		this.setState({ advance_search: advance_search });
		ProductActionCreators.searchAffiliateProducts(advance_search);
	},

	_onChangeOrderBy: function(e) {
		var val = e.target.value;
		console.log('ProductAffiliateSearchPage.react: _onChangeOrderBy', val);
		var advance_search = this.state.advance_search;
		advance_search.order_by = val;
		ProductActionCreators.sortAffiliateProducts(advance_search);
	},

	_onChangeOrderMethod: function(e) {
		var val = e.target.value;
		console.log('ProductAffiliateSearchPage.react: _onChangeOrderMethod', val);
		var advance_search = this.state.advance_search;
		advance_search.order_method = Number(val);
		ProductActionCreators.sortAffiliateProducts(advance_search);
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
						<div className="col-xs-6">
							<div className="form-group">
								<label className="form-label">Nama Produk:</label>
								<input value={this.state.advance_search.name} 
									data-attribute='name'
									onChange={this._onAdvanceSearchChange} 
									className="form-control" />
							</div>
						</div>
						<div className="col-xs-6">
							<div className="form-group">
								<label className="form-label">Nama Penjual:</label>
								<input value={this.state.advance_search.seller} 
									data-attribute='seller'
									onChange={this._onAdvanceSearchChange} 
									className="form-control" />
							</div>
						</div>
						<div className="col-xs-6">
							<div className="form-group">
								<label className="form-label">Harga Minimal:</label>
								<input value={this.state.advance_search.price_min} 
									data-attribute='price_min'
									onChange={this._onAdvanceSearchChange} 
									className="form-control" />
							</div>
						</div>
						<div className="col-xs-6">
							<div className="form-group">
								<label className="form-label">Harga Maksimal:</label>
								<input value={this.state.advance_search.price_max} 
									data-attribute='price_max'
									onChange={this._onAdvanceSearchChange}
									className="form-control" />
							</div>
						</div>
						<div className="col-xs-6">
							<div className="form-group">
								<label className="form-label">Komisi Minimal:</label>
								<input value={this.state.advance_search.fee_min} 
									data-attribute='fee_min'
									onChange={this._onAdvanceSearchChange}
									className="form-control" />
							</div>
						</div>
						<div className="col-xs-6">
							<div className="form-group">
								<label className="form-label">Komisi Maksimal:</label>
								<input value={this.state.advance_search.fee_max} 
									data-attribute='fee_max'
									onChange={this._onAdvanceSearchChange} 
									className="form-control" />
							</div>
						</div>

						<div className="col-xs-6">
							<div className="form-group">
								<label className="form-label">Urut berdasarkan:</label>
								<select value={this.state.advance_search.order_by}
									onChange={this._onChangeOrderBy}
									className="form-control">
										<option value='name'>Nama</option>
										<option value='affiliate_fee'>Komisi</option>
										<option value='price'>Harga</option>
										<option value='customer.name'>Penjual</option>
								</select>
								<select value={this.state.advance_search.order_method}
									onChange={this._onChangeOrderMethod}
									className="form-control">
										<option value='1'>Tertinggi ke terendah</option>
										<option value='0'>Terendah ke tertinggi</option>
								</select>
							</div>
						</div>
					</div>
					<div className="col-xs-6 col-xs-offset-6 text-right">
						<a href="#" className="btn btn-small btn-success" onClick={this.refreshSearch}
							style={{margin:'15px 0px', minWidth: '100px', fontSize: '1.1em'}}>
								Cari Produk
						</a>
						<a href="#" className="btn btn-small btn-default" onClick={this.showAdvanceSearch}
							style={{margin:'15px'}}>
								{this.state.advance_search.advance ? 'Pencarian Sederhana' : 'Aktifkan Pencarian Lanjut'}
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
					              Masukkan kriteria pencarian produk yang diinginkan pada panel diatas.
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