var React = require('react');
var ReactPropTypes = React.PropTypes;
var ReactInfinity = require('react-infinity');
var assign = require('object-assign');
var ProductItemBase = require('./ProductItem.react.jsx');


var ProductList = React.createClass({
	propTypes: {
		user: ReactPropTypes.object
	},

	render: function() {
		console.log('ProductList: render');
		var defaultProps = { user: this.props.user }

		var ItemComponent = ProductItemBase.ProductItem;
		if (this.props.affiliate_mode) {
			console.log('ProductList: affiliate_mode', this.props.affiliate_mode);
			ItemComponent = ProductItemBase.ProductAffiliateItem;
		}
		console.log('ProductList: product item component', ItemComponent);
		var ProductItemFactory = React.createFactory(ItemComponent);

		function ProductItemWithProps(commonProps){
		  return function(props, children){
		    return ProductItemFactory(assign({}, commonProps, props), children)
		  }
		}
		
		return (
			<ReactInfinity
		      data={this.props.products}
		      elementWidth={320}
		      elementHeight={400}
			  justifyOnMobile={false} // pass true to switch to a list instead of a grid on mobile.
			  elementMobileWidth={400} // element width to use for mobile view when `justifyOnMobile === false`
			  elementMobileHeight={400}
		      margin={10}
		      align="left"
		      childComponent={ProductItemWithProps(defaultProps)}
		      />
		);
	}
});


module.exports = ProductList;