var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var NumberFormatter = require('../../utils/StringUtils.js').numberFormatter();
var AppConstants = require('../../constants/AppConstants.js');


var AffiliateTransactionSummary = React.createClass({
  propTypes: {
    user: ReactPropTypes.object,
    salesOverview: ReactPropTypes.object
  },
  render: function() {
    var count = 0;
    var amount = 0;
    var total = 0;
    if (this.props.salesOverview) {
      count = this.props.salesOverview.count;
      amount = this.props.salesOverview.amount;
      total = this.props.salesOverview.total;
    }
    return (
      <div className="col-md-12">
        <div className="tiles green m-b-10">
          <div className="tiles-body" style={{textAlign:'right'}}>
            <div className="widget-stats">
              <div className="wrapper transparent">
                <span className="item-title">Jumlah Transaksi</span>
                <span className="item-count animate-number semi-bold">
                  { count }
                </span>
              </div>
            </div>
            <div className="widget-stats m-b-10">
              <div className="wrapper transparent">
                <span className="item-title">Total Penjualan</span>
                <span className="item-count animate-number semi-bold">
                  { NumberFormatter.formatMoney(total) }
                </span>
              </div>
            </div>
            <div className="widget-stats m-b-10">
              <div className="wrapper last">
                <span className="item-title">Total Pendapatan</span>
                <span className="item-count animate-number semi-bold">
                  { NumberFormatter.formatMoney(amount) }
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = AffiliateTransactionSummary;