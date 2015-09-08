var React = require('react');
var NumberFormatter = require('../../utils/StringUtils.js').numberFormatter();
var ReportStore = require('../../stores/ReportStore.react.jsx');
var ReportActionCreators = require('../../actions/ReportActionCreators.react.jsx');


var SalesOverviewWidget = React.createClass({
	getInitialState: function() {
		return {
			salesOverview: ReportStore.getSalesOverview(),
			timeout: null,
			minute: 5
		}
	},

	componentDidMount: function() {
		console.log('SalesOverviewWidget.react: componentDidMount');
		ReportStore.addChangeListener(this._onChange);
		ReportActionCreators.loadSalesOverview();
		setInterval(this._onTimeout, (this.state.minute * 60 * 1000));
	},

	componentWillUnmount: function() {
		console.log('SalesOverviewWidget.react: componentWillUnmount');
		ReportStore.removeChangeListener(this._onChange);
	},

	_onTimeout: function() {
		console.log('SalesOverviewWidget.react: componentDidMount');
		ReportActionCreators.loadSalesOverview();
	},

	_onChange: function() {
		console.log('SalesOverviewWidget.react: _onChange');
		this.setState({
			salesOverview: ReportStore.getSalesOverview()
		})
	},

    render: function() {
        return(
        	<div className="tiles green m-b-10">
                <div className="tiles-body">
                  <div className="tiles-title text-black">
                  	<h3>Transaksi Affiliate</h3>
                  </div>
                  <div className="widget-stats">
                    <div className="wrapper transparent">
                    	<span className="item-title">Jumlah Transaksi</span>
                    	<span className="item-count animate-number semi-bold">
                    		{this.state.salesOverview.count}
                    	</span>
                    </div>
                  </div>
                  <div className="widget-stats m-b-15">
                    <div className="wrapper last">
                    	<span className="item-title">Total Pendapatan</span>
                    	<span className="item-count animate-number semi-bold">
                    		{NumberFormatter.formatMoney(this.state.salesOverview.amount)}
                    	</span>
                    </div>
                  </div>
                  <div className="description">
                  	<span className="text-white mini-description">
                  		<span className="blend">data diperbaharui otomatis setiap</span> {this.state.minute} menit
                  	</span>
                  </div>
                </div>
            </div>
        );
    }
});

module.exports = SalesOverviewWidget;