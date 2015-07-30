var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var AppConstants = require('../../constants/AppConstants.js')
	, ProductCategory = AppConstants.ProductCategory;
var ReactBootstrap = require('react-bootstrap')
	, Badge = ReactBootstrap.Badge
	, Tooltip = ReactBootstrap.Tooltip
	, OverlayTrigger = ReactBootstrap.OverlayTrigger;


var ProductItem = React.createClass({
	render: function() {
		console.log('ProductItem: render');
		var badge = (<div></div>);
		if (this.props.category.id == ProductCategory.Digital) {
			badge = (<DigitalOverlay />);
		} else if (this.props.category.id == ProductCategory.Retail) {
			badge = (<RetailOverlay />);
		} else if (this.props.category.id == ProductCategory.Ticket) {
			badge = (<TicketOverlay />);
		}
		var searchMode = false;
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
						className="btn btn-small btn-primary">
						<span className="fa fa-info-circle">&nbsp;lihat detail</span>
					</Link>
					{badge}
		    	</div>
		    </div>
    	);
	}
});

const digitalTooltip = (
	<Tooltip placement="top">produk <strong>digital</strong></Tooltip>
);

const retailTooltip = (
	<Tooltip placement="top">produk <strong>retail</strong></Tooltip>
);

const ticketTooltip = (
	<Tooltip placement="top"><strong>tiket atau voucher</strong></Tooltip>
);

var DigitalOverlay = React.createClass({
	render: function() {
		return(
			<OverlayTrigger placement='top' overlay={digitalTooltip}>
				<Badge pullRight={true} className="m-t-5 m-l-5" >
					<span className="fa fa-cloud-download"></span>
				</Badge>
		    </OverlayTrigger>
		);
	}
});

var RetailOverlay = React.createClass({
	render: function() {
		return(
			<OverlayTrigger placement='top' overlay={retailTooltip}>
				<Badge pullRight={true} className="m-t-5 m-l-5" >
					<span className="fa fa-truck"></span>
				</Badge>
		    </OverlayTrigger>
		);
	}
});

var TicketOverlay = React.createClass({
	render: function() {
		return(
			<OverlayTrigger placement='top' overlay={ticketTooltip}>
				<Badge pullRight={true} className="m-t-5 m-l-5" >
					<span className="fa fa-ticket"></span>
				</Badge>
		    </OverlayTrigger>
		);
	}
});

module.exports = {
	ProductItem: ProductItem,
	DigitalOverlay: DigitalOverlay,
	RetailOverlay: RetailOverlay,
	TicketOverlay: TicketOverlay
}