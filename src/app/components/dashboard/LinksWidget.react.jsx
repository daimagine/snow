var React = require('react');
var Router = require('react-router'),
	Link = Router.Link;


var LinksWidget = React.createClass({
	render: function() {
		return(
		  <div className="grid simple">
	        <div className="grid-title">
	          <h3>Informasi Lebih Lengkap</h3>
	        </div>
	        <div className="grid-body">
	          <div className="row">
				<div className="col-xs-12">
	              <h4>Tentang Produk</h4>
	              <ul>
	                <li><Link to="products">Daftar Produk</Link></li>
	                <li><Link to="affiliate-products">Daftar Produk Affiliate</Link></li>
	                <li><Link to="affiliate-search">Cari Produk Affiliate</Link></li>
	              </ul>
	            </div>
	            <div className="col-xs-12">
	              <h4>Fasilitas Lain</h4>
	              <ul>
	                <li><a href="javascript:;">Report</a></li>
	                <li><a href="javascript:;">Bantuan</a></li>
	                <li><a href="javascript:;">Kontak Kami</a></li>
	              </ul>
	            </div>
	          </div>
	        </div>
	      </div>
		);
	}
});

module.exports = LinksWidget;