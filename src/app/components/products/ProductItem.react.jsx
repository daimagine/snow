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

var ProductStore = require('../../stores/ProductStore.react.jsx');
var ProductActionCreators = require('../../actions/ProductActionCreators.react.jsx');


var ProductItem = React.createClass({
	render: function() {
		var badge = (<div></div>);
		if (this.props.category.id == ProductCategory.Digital) {
			badge = (<DigitalOverlay />);
		} else if (this.props.category.id == ProductCategory.Retail) {
			badge = (<RetailOverlay />);
		} else if (this.props.category.id == ProductCategory.Ticket) {
			badge = (<TicketOverlay />);
		}
		var imageURL = this.props.image ? this.props.image.split(',')[0] : '';
		return (
			<div className="grid simple">
				<div className="grid-title text-center">
					<h3 className="text-ellipsis">{this.props.name}</h3>
				</div>
				<div className="grid-body">
					{this.props.is_affiliate_ready ? (
						<a href="javascript:;" className="btn-affiliate-badge">
							<span className="">affiliate aktif</span>
						</a>
					) : (
						<div></div>
					)}
					<div className="text-center">
	                    <div className="product-image m-b-10" style={{ height:'215px' }}>
	                    	<img src={ imageURL } className="center img-responsive img-fit-height"
	                    		alt="gambar produk"/>
	                    </div>
	                </div>
	                <hr className="m-b-10"/>
	                <Link to='product' params={{productId: this.props.id}} 
						className="btn btn-small btn-primary">
						<span className="fa fa-info-circle">&nbsp;lihat detail</span>
					</Link>
					{badge}
		    	</div>
		    </div>
    	);
	}
});

var ProductAffiliateItem = React.createClass({
	render: function() {
		console.log('ProductAffiliateItem: render');
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
					&nbsp;
					<AffiliatorButton user={this.props.user} product={this.props} />
					{badge}
		    	</div>
		    </div>
    	);
	}
});

var AffiliatorButton = React.createClass({
	getInitialState: function() {
		return {
			processing: false,
			is_affiliator: ProductStore.isProductAffiliator(this.props.user, this.props.product)
		}
	},

	componentDidMount: function() {
    	console.log('AffiliatorButton.react: componentDidMount')
		ProductStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
    	console.log('AffiliatorButton.react: componentWillUnmount')
		ProductStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    	console.log('AffiliatorButton.react: _onChange');
    	if (this.props.product.id == ProductStore.getProduct().id) {
			this.setState({
				is_affiliator: ProductStore.isProductAffiliator(this.props.user, ProductStore.getProduct()),
				processing: false
			});
    	}
	},

	onJoinAffiliate: function() {
		console.log('AffiliatorButton: onJoinAffiliate');
		// call product action creator to remove affiliate
		this.setState({processing: true});
		ProductActionCreators.joinAffiliate(this.props.user, this.props.product);
	},

	onRemoveAffiliate: function() {
		console.log('AffiliatorButton: onRemoveAffiliate');
		// call product action creator to join affiliate
		this.setState({processing: true});
		ProductActionCreators.removeAffiliate(this.props.user, this.props.product);
	},

	render: function() {
		var handler = this.onJoinAffiliate;
		var buttonClass = "btn-green";
		var iconClass = "fa-users";
		var buttonTitle = "join affiliate";
		if (this.state.is_affiliator) {
			handler = this.onRemoveAffiliate;
			buttonClass = "btn-danger";
			iconClass = "fa-minus-circle";
			buttonTitle = "stop affiliate";
		}
		return(
			<a className={"btn btn-small " + buttonClass} href="javascript:;" 
				onClick={!this.state.processing ? handler : null}
                disabled={this.state.processing}>
				<span className={"fa " + iconClass}>
					&nbsp;&nbsp;{this.state.processing ? 'loading...' : buttonTitle}
				</span>
			</a>
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
					<span className="fa fa-cubes"></span>
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
	ProductAffiliateItem: ProductAffiliateItem,
	DigitalOverlay: DigitalOverlay,
	RetailOverlay: RetailOverlay,
	TicketOverlay: TicketOverlay
}