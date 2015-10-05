var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var ReportStore = require('../../stores/ReportStore.react.jsx');
var ReportActionCreators = require('../../actions/ReportActionCreators.react.jsx');
var AuthenticatedMixin = require('../../components/common/AuthenticatedMixin.react.jsx');
var AppConstants = require('../../constants/AppConstants.js');

var Breadcrumb = require('../../components/common/Breadcrumb.react.jsx');
var AffiliateTransactionList = require('./AffiliateTransactionList.react.jsx');
var AffiliateTransactionSummary = require('./AffiliateTransactionSummary.react.jsx');


var AffiliateTransactionPage = React.createClass({
  mixins: [AuthenticatedMixin],

  propTypes: {
    user: ReactPropTypes.object
  },

  getInitialState: function() {
    return {
      salesOverview: ReportStore.getSalesOverview(),
      timeout: null,
      minute: 5
    }
  },

  componentDidMount: function() {
    console.log('AffiliateTransactionPage.react: componentDidMount');
    ReportStore.addChangeListener(this._onChange);
    ReportActionCreators.loadSalesOverview();
    setInterval(this._onTimeout, (this.state.minute * 60 * 1000));
  },

  componentWillUnmount: function() {
    console.log('AffiliateTransactionPage.react: componentWillUnmount');
    ReportStore.removeChangeListener(this._onChange);
  },

  _onTimeout: function() {
    console.log('AffiliateTransactionPage.react: componentDidMount');
    ReportActionCreators.loadSalesOverview();
  },

  _onChange: function() {
    console.log('AffiliateTransactionPage.react: _onChange');
    this.setState({
      salesOverview: ReportStore.getSalesOverview()
    })
  },

  _getPaths: function() {
    return [
      { 'key' : 'home', 'title' : 'Dashboard', 'link' : 'home' },
      { 'key' : 'affiliate-reports', 'title' : 'Affiliate Transaction', 'link' : null }
    ]
  },

  render: function() {
    return (
      <div className="content">
        <Breadcrumb paths={this._getPaths()} />
        <AffiliateTransactionSummary user={this.props.user} salesOverview={this.state.salesOverview} />
        <AffiliateTransactionList user={this.props.user} transactions={this.state.salesOverview.transactions} />
      </div>
    );
  }

});

module.exports = AffiliateTransactionPage;