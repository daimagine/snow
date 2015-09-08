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
      <div className="grid simple">
        <div className="grid-title">
          <h3>Selamat datang di <span className="semi-bold">Jualio Affiliate!</span></h3>
        </div>
        <div className="grid-body">
          <div className="row">
            <div className="col-xs-12">
              <h4><span className="semi-bold">Baru!</span>&nbsp;Jualio Affiliate</h4>
              <p>
                Sekarang kamu bisa berjualan berbagai macam produk yang ada di Jualio dengan komisi yang menguntungkan.
                <br/>
                Ikuti langkah berikut:
                <ol>
                  <li><Link to="affiliate-search">Cari Produk Affiliate</Link> yang menarik untuk kamu jual</li>
                  <li>Klik <span className="semi-bold">Join Affiliate</span> di deskripsi produk</li>
                  <li>Post ke akun sosial media kamu</li>
                  <li>Setiap produk yang dibeli, kamu akan mendapatkan komisi flat ataupun persentase harga produk</li>
                </ol>
              </p>
              <p className="m-b-20">
                <Link to="affiliate-search" className="btn btn-primary btn-medium">
                  <span className="fa fa-search">&nbsp;&nbsp;</span>
                  Cari Produk Affiliate
                </Link>
              </p>
              <hr />
              <p>
                Kamu juga bisa mengaktifkan fitur affiliate di produk kamu.
                Makin banyak affiliator makin besar jangkauan pemasaran produk kamu.
                <br/>
                Caranya sangat mudah, hanya dengan beberapa langkah:
                <ol>
                  <li>Lihat <Link to="products">Daftar Produk</Link> yang sudah kamu punya</li>
                  <li>Klik <span className="semi-bold">Aktifkan Affiliate</span> di aksi produk</li>
                  <li>Pilih tipe komisi affiliate dan simpan</li>
                  <li>Produk kamu akan otomatis terlihat di hasil pencarian affiliator</li>
                </ol>
              </p>
              <hr />
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = GettingStartedWidget;