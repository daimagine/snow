var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;


var GettingStartedWidget = React.createClass({

  propTypes: {
    user: ReactPropTypes.object
  },

	render: function() {
		return (
			<div className="row">
        <div className="col-md-12">
          <div className="grid simple">
            <div className="grid-title">
              <h3>Selamat datang di <span className="semi-bold">Jualio!</span></h3>
            </div>
            <div className="grid-body">
              <p>
	              Cara Aman dan Mudah Jual Beli via Media Sosial. Hanya Dengan Tiga Langkah:
                <ol>
                  <li>Hubungkan akun Facebook, Twitter, dan Instagram kamu ke Jualio</li>
                  <li>Masukkan info produk yang ingin dijual</li>
                  <li>Hanya dengan satu klik saja, produkmu akan tampil secara otomatis di seluruh akun media sosialmu dan siap untuk dibeli</li>
                </ol>
              </p>
              <div className="row">
                <div className="col-xs-12 col-md-4">
                  <h4>Mulai Berjualan!</h4>
                  <hr />
                  <p className="m-b-20">
                    <Link to="new-product" className="btn btn-primary btn-large">
                      <span className="fa fa-plus-square">&nbsp;&nbsp;</span>
                      Tambah Produk
                    </Link>
                  </p>
                </div>
                <div className="col-xs-12 col-md-4">
                  <h4>Informasi Lebih Lengkap</h4>
                  <hr />
                  <ul>
                    <li><Link to="products">Daftar Produk</Link></li>
                    <li><Link to="affiliate-products">Daftar Produk Affiliate</Link></li>
                  </ul>
                </div>
                <div className="col-xs-12 col-md-4">
                  <h4>Fasilitas Lain</h4>
                  <hr />
                  <ul>
                    <li><a href="javascript:;">Report</a></li>
                    <li><a href="javascript:;">Bantuan</a></li>
                    <li><a href="javascript:;">Kontak Kami</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
		);
	}

});

module.exports = GettingStartedWidget;