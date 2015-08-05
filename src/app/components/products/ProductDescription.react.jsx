var React = require('react');
var ReactPropTypes = React.PropTypes;
var ProductStore = require('../../stores/ProductStore.react.jsx')
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var ProductActionCreators = require('../../actions/ProductActionCreators.react.jsx');
var StringUtils = require('../../utils/StringUtils.js');


var ProductDescription = React.createClass({

	propTypes: {
		product: ReactPropTypes.object
	},

	getInitialState: function() {
    	console.log('ProductDescription.react: getInitialState')
		return {
		}
	},

	componentDidMount: function() {
    	console.log('ProductDescription.react: componentDidMount')
	},

	componentWillUnmount: function() {
    	console.log('ProductDescription.react: componentWillUnmount')
	},

	_onChange: function() {
    	console.log('ProductDescription.react: _onChange')
		this.state({
		});
	},

	render: function() {
		var names = StringUtils.split2(this.props.product.name);
		var firstName = names[0];
		var secondName = names[1];
		return (
			<div ref="product-description" id="product-description">
	            <ul id="tab-01" className="nav nav-tabs">
	              <li className="active"><a href="#product-tab-00" aria-controls="product-tab-00" role="tab" data-toggle="tab">Deskripsi</a></li>
	            </ul>
	            <div className="tab-content">
	              <div id="product-tab-00" className="tab-pane active">
	                <div className="row">
	                  <div className="col-md-12">
	                    <h4>{firstName}&nbsp;<span className="semi-bold">{secondName}</span></h4>
	                    <hr />
	                    <p>{ this.props.product.description }</p>
	                  </div>
	                </div>
	              </div>
	            </div>
			</div>
		);
	}

});

module.exports = ProductDescription;