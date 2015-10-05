var React = require('react');
var Router = require('react-router');
var moment = require('moment');
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var NumberFormatter = require('../../utils/StringUtils.js').numberFormatter();
var AppConstants = require('../../constants/AppConstants.js');


var transHeaderStyle = {
  fontSize: '1.2em',
  textAlign: 'center',
  height: '30px'
}
var itemStyle = {
  padding:'20px',
  backgroundColor:'#fff',
  margin:'15px'
}
var itemHeaderRow = {
  padding: '10px 0px',
  fontWeight: 'bold',
  borderBottom: 'solid 1px #eee',
}
var nameStyle = {
  textAlign: 'left',
}
var timeStyle = {
  fontSize: '0.8em',
  textAlign: 'left',
}
var numberStyle = {
  textAlign: 'right',
}

var AffiliateTransactionList = React.createClass({
  propTypes: {
    user: ReactPropTypes.object,
    transactions: ReactPropTypes.array
  },
  render: function() {
    var transaction_list = (
      <div className="row">
        <div className="col-md-12">
          <div className="alert alert-info">Transaksi Affiliate Anda sedang disiapkan...</div>
        </div>
      </div>
    );
    if (this.props.transactions) {
      console.log('AffiliateTransactionList this.props.transactions', this.props.transactions);
      if (this.props.transactions.length) {
        transaction_list = (
          <div className="transaction-item" style={itemStyle}>
            <div className="row" style={itemHeaderRow}>
              <div className="transaction-header" style={transHeaderStyle}>
                <div className="col-xs-2">Tanggal</div>
                <div className="col-xs-4">Nama Produk</div>
                <div className="col-xs-3">Total Transaksi</div>
                <div className="col-xs-3">Komisi Affiliate</div>
              </div>
            </div>
            { this.props.transactions.map(function(transaction, index){
              return (
                <AffiliateTransactionItem key={"trx-"+index} index={index} transaction={transaction}/>
              );
            }) }
          </div>
        );
      } else {
        transaction_list = (
          <div className="row">
            <div className="col-md-12">
              <div className="alert alert-info">Transaksi Affiliate Anda kosong</div>
            </div>
          </div>
        );
      }
    }
    return (
      <div className="transactions-container">
        { transaction_list }
      </div>
    );
  }
});

var AffiliateTransactionItem = React.createClass({
  propTypes: {
    transaction: ReactPropTypes.object
  },
  render: function() {
    var itemRow = {
      padding: '10px 0px',
    }
    if (this.props.index % 2 == 0) {
      itemRow = {
        backgroundColor: '#eee',
        padding: '10px 0px',   
      }
    }
    return (
      <div className="row" style={itemRow}>
        <div className="transaction" style={transHeaderStyle}>
          <div className="col-xs-2" style={timeStyle}>
            { moment(this.props.transaction.trans_time).format('YYYY-MM-DD HH:m:s') }
          </div>
          <div className="col-xs-4" style={nameStyle}>
            { this.props.transaction.product.name }
          </div>
          <div className="col-xs-3" style={numberStyle}>
            { NumberFormatter.formatMoney(this.props.transaction.total_amount) }
          </div>
          <div className="col-xs-3" style={numberStyle}>
            { NumberFormatter.formatMoney(this.props.transaction.affiliator_received) }
          </div>
        </div>
      </div>
    );
  }
});

module.exports = AffiliateTransactionList;