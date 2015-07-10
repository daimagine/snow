var React = require('react');
var Router = require('react-router');
var State = Router.State;
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var ProductStore = require('../../stores/ProductStore.react.jsx')
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var ProductActionCreators = require('../../actions/ProductActionCreators.react.jsx');
var AuthenticatedMixin = require('../../components/common/AuthenticatedMixin.react.jsx');
var ReactScriptLoader = require('react-script-loader');

var Breadcrumb = require('../../components/common/Breadcrumb.react.jsx');


var ProductsEditPage = React.createClass({

  	mixins: [State, AuthenticatedMixin],

	propTypes: {
		user: ReactPropTypes.object
	},

	getInitialState: function() {
    	console.log('ProductsEditPage.react: getInitialState')
		return {
		}
	},

	componentDidMount: function() {
    	console.log('ProductsEditPage.react: componentDidMount')
	},

	componentWillUnmount: function() {
    	console.log('ProductsEditPage.react: componentWillUnmount')
	},

	_getPaths: function() {
		return [
			{ 'key' : 'home', 'title' : 'Dashboard', 'link' : 'home' },
			{ 'key' : 'products', 'title' : 'Daftar Produk', 'link' : 'products' },
			{ 'key' : 'edit', 'title' : 'Edit Produk', 'link' : null }
		]
	},

	render: function() {
		return (
			<div className="content">
				<Breadcrumb paths={this._getPaths()} />
				<ProductForm productId={this.getParams().productId}/>
			</div>
		);
	}

});


var ProductForm = React.createClass({

	mixins: [ReactScriptLoader.ReactScriptLoaderMixin],

	getInitialState: function() {
    	console.log('ProductForm.react: getInitialState')
		return {
			product: {},
			errors: [],
			scriptLoading: true,
			scriptLoadError: false, 
			formProcessing: false 
		}
	},

	componentDidMount: function() {
    	console.log('ProductForm.react: componentDidMount')
		ProductStore.addChangeListener(this._onChange);
		ProductActionCreators.loadProduct(this.props.productId);
	},

	componentWillUnmount: function() {
    	console.log('ProductForm.react: componentWillUnmount')
		ProductStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    	console.log('ProductForm.react: _onChange')
		this.setState({
			product: ProductStore.getProduct(),
			errors: ProductStore.getErrors()
		});
	},

	getScriptURL: function() {
		return '/assets/scripts/init-product-form.min.js';
	},

	// ReactScriptLoaderMixin calls this function when the script has loaded
	// successfully.
	onScriptLoaded: function() {
		console.log('ProductForm: onScriptLoaded');
	  	this.setState({scriptLoading: false});
	},

	// ReactScriptLoaderMixin calls this function when the script has failed to load.
	onScriptError: function() {
		console.log('ProductForm: onScriptLoaded');
		this.setState({scriptLoading: false, scriptLoadError: true});
	},

	onScriptTagCreated: function() {
		console.log('ProductForm: onScriptTagCreated');
	},

	_onSubmit: function(e) {
		e.preventDefault();
	    this.setState({ 
	      errors: [], 
	      formProcessing: true 
	    });
	},

	render: function() {
		var form = (
			<div>
			  <div className="form-wizard-steps">
			    <ul className="wizard-steps">
			      <li data-target="#step1">
			        <a data-toggle="tab" href="#tab1">
			          <span className="step">
			            1
			          </span>
			          <span className="title">
			            Product Detail
			          </span>
			        </a>
			      </li>
			      <li data-target="#step2">
			        <a data-toggle="tab" href="#tab2">
			          <span className="step">
			            2
			          </span>
			          <span className="title">
			            Photo &amp; Tag
			          </span>
			        </a>
			      </li>
			      <li data-target="#step3">
			        <a data-toggle="tab" href="#tab3">
			          <span className="step">
			            3
			          </span>
			          <span className="title">
			            Account Settings
			          </span>
			        </a>
			      </li>
			      <li data-target="#step4">
			        <a data-toggle="tab" href="#tab4">
			          <span className="step">
			            4
			          </span>
			          <span className="title">
			            Content
			          </span>
			        </a>
			      </li>
			    </ul>
			    <div className="clearfix">
			    </div>
			  </div>
			  <div className="tab-content transparent">
			    <div id="tab1" className="tab-pane">
			      <br/>
			      <h4 className="semi-bold">
			        Step 1 - 
			        <span className="light">
			          Product Detail
			        </span>
			      </h4>
			      <br/>
			      <div className="row form-row">
			        <div className="col-sm-6">
			          <div className="form-group">
			            <label htmlFor="productType">
			              Product Type :
			              <select id="productType" name="productType" className="select2 form-control">
			                <option value="">
			                  Select Type
			                </option>
			                <option value="digital">
			                  Digital
			                </option>
			                <option value="retail">
			                  Retail
			                </option>
			              </select>
			            </label>
			          </div>
			          <div className="form-group">
			            <label htmlFor="productName" className="form-label">
			              Product Name :
			            </label>
			            <input id="productName" type="text" name="productName" 
			            	placeholder="Your product name.." className="form-control" 
			            	value={this.state.product.name}/>
			          </div>
			          <div className="form-group">
			            <label htmlFor="productDesc" className="form-label">
			              Product Description :
			            </label>
			            <textarea id="productDesc" rows="5" name="productDesc" placeholder="Your product description.." className="form-control">
			            	{this.state.product.description}
			            </textarea>
			          </div>
			          <div style={{ display:'none' }} className="form-group digitalNeeds">
			            <label htmlFor="productFile" className="form-label">
			              Product File :
			            </label>
			            <div id="product-file-uploader" className="dropzone no-margin validation-file-uploader">
			              <div className="fallback">
			                <input id="productFile" name="productFile" type="file" />
			              </div>
			            </div>
			          </div>
			          <div style={{ display:'none' }} className="form-group digitalNeeds">
			            <label htmlFor="productPreviewLink" className="form-label">
			              Preview Link :
			            </label>
			            <input id="productPreviewLink" type="text" name="productPreviewLink" placeholder="http://your.preview.link" className="form-control" />
			          </div>
			        </div>
			        <div className="col-sm-6">
			          <div className="form-group">
			            <label htmlFor="productStock" className="form-label">
			              Product Stock :
			            </label>
			            <input id="productStock" type="number" name="productStock" 
			            	placeholder="Your stock.." className="form-control" />
			          </div>
			          <div className="form-group">
			            <label htmlFor="productPrice" className="form-label">
			              Product Price :
			            </label>
			            <input id="productPrice" type="number" name="productPrice" 
			            	className="form-control" 
			            	value={this.state.product.price}/>
			          </div>
			          <div className="form-group">
			            <label htmlFor="productLocation" className="form-label">
			              Product Location :
			            </label>
			            <input id="productLocation" type="text" name="productLocation" 
			            	placeholder="Your product location.." className="form-control" />
			          </div>
			          <hr />
			          <div className="form-group">
			            <label className="form-label">
			              Affiliate Settings
			            </label>
			          </div>
			          <div className="form-group">
			            <div className="checkbox check-default">
		                    <input id="affiliateReady" name="affiliateReady" type="checkbox" 
		                    	value={this.state.product.is_affiliate_ready} />
		                    <label htmlFor="affiliateReady" className="form-label">
				              Affiliate ready
				            </label>
		                  </div>
			          </div>
				      <div className="form-group">
			            <label htmlFor="affiliateFee" className="form-label">
			              Affiliate Fee :
			            </label>
			            <input id="affiliateFee" type="number" name="affiliateFee" 
			            	className="form-control" 
			            	value={this.state.product.affiliate_fee}/>
			          </div>
			        </div>
			      </div>
			    </div>
			    <div id="tab2" className="tab-pane">
			      <br/>
			      <h4 className="semi-bold">
			        Step 2 - 
			        <span className="light">
			          Photo &amp; Tag
			        </span>
			      </h4>
			      <br/>
			      <div className="row form-row">
			        <div className="col-sm-12">
			          <div className="form-group">
			            <label htmlFor="productPhoto" className="form-label">
			              Product Photo :
			            </label>
			            <div action="javascript:;" className="dropzone no-margin dz-uploader-unlimited">
			              <div className="fallback">
			                <input id="productPhoto" name="file" type="file" className="dz-uploader-unlimited" />
			              </div>
			            </div>
			          </div>
			        </div>
			        <div className="col-sm-12">
			          <div className="form-group">
			            <label htmlFor="productEmbed" className="form-label">
			              Embed Link :
			            </label>
			            <span className="help">
			              Youtube/Vimeo/Soundcloud link
			            </span>
			            <input id="productEmbed" type="text" className="form-control" />
			          </div>
			        </div>
			        <div className="col-sm-12">
			          <div className="form-group">
			            <label htmlFor="productTag" className="form-label">
			              Product Tag :
			            </label>
			            <input id="productTag" data-role="tagsinput" type="text" value="hello" className="form-control tagsinput" />
			          </div>
			        </div>
			      </div>
			    </div>
			    <div id="tab3" className="tab-pane">
			      <br/>
			      <h4 className="semi-bold">
			        Step 3 - 
			        <span className="light">
			          Account Settings
			        </span>
			      </h4>
			      <div className="row form-row">
			        <div className="col-sm-12">
			          <table className="table">
			            <thead>
			              <tr>
			                <th style={{ width:'1%' }}>
			                  <div className="checkbox check-default">
			                    <input id="checkbox1" type="checkbox" value="1" className="checkall" />
			                    <label htmlFor="checkbox1">
			                    </label>
			                  </div>
			                </th>
			                <th>
			                  Account Name
			                </th>
			              </tr>
			            </thead>
			            <tbody>
			              <tr>
			                <td className="v-align-middle">
			                  <div className="checkbox check-success">
			                    <input id="activeSM01" type="checkbox" value="1" />
			                    <label htmlFor="activeSM01">
			                    </label>
			                  </div>
			                </td>
			                <td className="v-align-middle">
			                  <a href="javascript:;" className="btn btn-block btn-twitter btn-small">
			                    <span className="pull-left">
			                      <i className="fa fa-twitter">
			                      </i>
			                    </span>
			                    <span className="bold">
			                      @bravocado
			                    </span>
			                  </a>
			                </td>
			              </tr>
			              <tr>
			                <td className="v-align-middle">
			                  <div className="checkbox check-success">
			                    <input id="activeSM02" type="checkbox" value="1" />
			                    <label htmlFor="activeSM02">
			                    </label>
			                  </div>
			                </td>
			                <td className="v-align-middle">
			                  <a href="javascript:;" className="btn btn-block btn-facebook btn-small">
			                    <span className="pull-left">
			                      <i className="fa fa-facebook">
			                      </i>
			                    </span>
			                    <span className="bold">
			                      visual_bravocado
			                    </span>
			                  </a>
			                </td>
			              </tr>
			              <tr>
			                <td className="v-align-middle">
			                  <div className="checkbox check-success">
			                    <input id="activeSM03" type="checkbox" value="1" />
			                    <label htmlFor="activeSM03">
			                    </label>
			                  </div>
			                </td>
			                <td className="v-align-middle">
			                  <a href="javascript:;" className="btn btn-block btn-instagram btn-small">
			                    <span className="pull-left">
			                      <i className="fa fa-instagram">
			                      </i>
			                    </span>
			                    <span className="bold">
			                      @bravocado_
			                    </span>
			                  </a>
			                </td>
			              </tr>
			            </tbody>
			            <tfoot>
			              <tr>
			                <td colSpan="3">
			                  <small>
			                    checked box means active.
			                  </small>
			                </td>
			              </tr>
			            </tfoot>
			          </table>
			        </div>
			      </div>
			    </div>
			    <div id="tab4" className="tab-pane">
			      <br/>
			      <h4 className="semi-bold">
			        Step 4 - 
			        <span className="light">
			          Content
			        </span>
			      </h4>
			      <div className="row form-row">
			        <div className="col-sm-6">
			          <div className="form-group">
			            <label className="form-label">
			              Product Content :
			            </label>
			            <textarea id="productContent" rows="10" placeholder="Your content.." className="form-control">
			            </textarea>
			          </div>
			        </div>
			        <div className="col-sm-6">
			          <div className="form-group">
			            <label className="form-label">
			              Preview :
			            </label>
			            <div className="livePreview">
			              <p>
			                <span>
			                </span>
			                <a href="javascript:;">
			                  &nbsp;jual.io/asd90a
			                </a>
			              </p>
			              <img src="images/others/haleakala.jpg" className="img-responsive" />
			            </div>
			          </div>
			        </div>
			      </div>
			    </div>
			    <ul className="wizard wizard-actions">
			      <li className="previous">
			        <a href="javascript:;" className="btn">
			          Previous
			        </a>
			      </li>
			      <li className="next">
			        <a href="javascript:;" className="btn btn-primary">
			          Next
			        </a>
			      </li>
			      <li className="next finish" style={{ display:'none' }}>
			      	<button type="submit" className="btn btn-primary"
		                ref="submitButton"
		                onClick={!this.state.formProcessing ? this._onSubmit : null}
		                disabled={this.state.formProcessing}>
		                  {this.state.formProcessing ? 'Loading...' : 'Finish'}
		            </button>
			      </li>
			    </ul>
			  </div>
			</div>
		);
		
		var errors = this.state.errors.length > 0 ? (
			<div className="col-xs-12"><ErrorNotice errors={this.state.errors}/></div>
		) : (
			<div></div>
		);
		
		console.log('ProductForm: render');

		return (
			<div className="row">
				{ errors }
				<div className="col-xs-12">
	              <div className="grid simple">
	                <div className="grid-title">
	                  <h3>Edit <span className="semi-bold">Product</span></h3>
	                </div>
	                <div className="grid-body clearfix">
	                  <form id="addProduct" action="javascript:;">
	                    <div id="addProductWizard" className="col-md-12">
	                  		{ !this.state.scriptLoading && this.state.product ? (
								<div>
									{ form }
								</div>
							) : (
								<div className="col-md-12">
									<div className="alert alert-info" role="alert">
						              Form produk sedang disiapkan...
						            </div>
								</div>
							)}    
	                    </div>
	                  </form>
	                </div>
	              </div>
	            </div>
			</div>
		);
	}
});

module.exports = ProductsEditPage;