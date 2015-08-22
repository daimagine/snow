var NumberFormatter = require('../../utils/StringUtils.js').numberFormatter();


var ProductSocmed = React.createClass({

	propTypes: {
		handler: ReactPropTypes.object
	},

	componentWillMount: function() {
		if (this.props.handler === undefined) {
			throw new Error("ProductSocmed: Parent component class must give handler props.")
		}
	},

	render: function() {
		return(
			<div className="col-xs-12 col-sm-6">
				<div className="grid simple">
					<div className="grid-title">
						<h4>Social <span className="semi-bold">Media</span></h4>
					</div>
					<div className="grid-body">
						<div className="entitites">
							<div className="icon"><span className="fa fa-tag"></span></div>
							<div className="entity-content">
								<p>{NumberFormatter.formatMoney(this.props.product.price)}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = ProductSocmed;