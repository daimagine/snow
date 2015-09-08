var React = require('react');
var ReactPropTypes = React.PropTypes;
var ProductStore = require('../../stores/ProductStore.react.jsx')
var ProductActionCreators = require('../../actions/ProductActionCreators.react.jsx');
var ReactScriptLoader = require('react-script-loader');


var ProductCarousel = React.createClass({

  	mixins: [ReactScriptLoader.ReactScriptLoaderMixin],

	propTypes: {
		product: ReactPropTypes.object
	},

	getInitialState: function() {
    	console.log('ProductCarousel.react: getInitialState')
		return {
			scriptLoading: true,
			scriptLoadError: false, 
		}
	},

	componentDidMount: function() {
    	console.log('ProductCarousel.react: componentDidMount')
	},

	componentWillUnmount: function() {
    	console.log('ProductCarousel.react: componentWillUnmount')
	},

	_onChange: function() {
    	console.log('ProductCarousel.react: _onChange')
		this.state({
		});
	},
 
	getScriptURL: function() {
		return '/assets/scripts/init-carousel.min.js';
	},

	// ReactScriptLoaderMixin calls this function when the script has loaded
	// successfully.
	onScriptLoaded: function() {
		console.log('ProductCarousel: onScriptLoaded');
	  	this.setState({scriptLoading: false});
	},

	// ReactScriptLoaderMixin calls this function when the script has failed to load.
	onScriptError: function() {
		console.log('ProductCarousel: onScriptLoaded');
		this.setState({scriptLoading: false, scriptLoadError: true});
	},

	onScriptTagCreated: function() {
		console.log('ProductCarousel: onScriptTagCreated');
	},

	render: function() {
		var images = this.props.product.product_images;
		return (
			<div ref="product-carousel" id="product-carousel" >
				{ images.map(function(image, index) {
					return <ProductImage imageURL={image.link} key={"img-"+index} />
				}) }
			</div>
		);
	}

});

var ProductImage = React.createClass({
	render: function() {
		return(
			<div className="item">
				<img src="/assets/images/ajax-loader.gif"
	          		data-lazy={ this.props.imageURL }
	          		className="img-responsive center lazy" />
	        </div>
		);
	}
});

module.exports = ProductCarousel;