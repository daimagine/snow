var React = require('react');
var ReactInfinity = require('react-infinity');
var ProductItem = require('./ProductItem.react.jsx').ProductItem;

var ProductList = React.createClass({
	render: function() {
		console.log('ProductList: render');
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

module.exports = ProductList;