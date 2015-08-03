var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var SessionActionCreators = require('../../actions/SessionActionCreators.react.jsx');


var Sidebar = React.createClass({

  propTypes: {
    isLoggedIn: ReactPropTypes.bool,
    user: ReactPropTypes.object
  },
  
  logout: function(e) {
    e.preventDefault();
    SessionActionCreators.logout();
  },

	render: function() {
		return (
			<div id="main-menu" className="page-sidebar offcanvas">
        <div id="main-menu-wrapper" className="page-sidebar-wrapper scrollbar-dynamic">
          <div className="pt-20"></div>
          <ul>
            <li className="start active">
              <Link to="home">
                <i className="icon-custom-home"></i>
                <span className="title">Dashboard</span>
                <span className="selected"></span>
              </Link>
            </li>
            <li>
              <li>
                <Link to="profile">
                  <i  className="fa fa-user"></i>
                  <span className="title">Akun Anda</span>
                </Link>
              </li>
            </li>
            <li>
              <a href="javascript:;">
                <i className="fa fa-edit"></i>
                <span className="title">Produk</span>
                <span className="arrow"></span>
              </a>
              <ul className="sub-menu">
                <li><Link to="products">Produk Anda</Link></li>
                <li><Link to="affiliate-products">Produk Affiliate</Link></li>
                <li><Link to="affiliate-search">Cari Produk Affiliate</Link></li>
              </ul>
            </li>
            <li>
              <a href="javascript:;" onClick={this.logout}>
                <i className="fa fa-sign-out"></i>
                <span className="title">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
		);
	}

});

module.exports = Sidebar;