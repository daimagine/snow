var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var SessionActionCreators = require('../../actions/SessionActionCreators.react.jsx');
var ReactScriptLoader = require('react-script-loader');

var Header = React.createClass({

  mixins: [ReactScriptLoader.ReactScriptLoaderMixin],

  propTypes: {
    isLoggedIn: ReactPropTypes.bool,
    user: ReactPropTypes.object
  },
  
  logout: function(e) {
    e.preventDefault();
    SessionActionCreators.logout();
  },

  getScriptURL: function() {
    return '/assets/scripts/init-dashboard.min.js';
  },

  // ReactScriptLoaderMixin calls this function when the script has loaded
  // successfully.
  onScriptLoaded: function(url) {
    console.log('Header: onScriptLoaded ' + url);
      this.setState({scriptLoading: false});
  },

  // ReactScriptLoaderMixin calls this function when the script has failed to load.
  onScriptError: function() {
    console.log('Header: onScriptLoaded');
    this.setState({scriptLoading: false, scriptLoadError: true});
  },

  onScriptTagCreated: function() {
    console.log('Header: onScriptTagCreated');
  },

  render: function() {
    var headerContainer = this.props.isLoggedIn ? (
      <div className="header navbar navbar-inverse">
        <div className="navbar-inner">
          <div className="header-seperation">
            <ul id="main-menu-toggle-wrapper" style={{display:'none'}} 
              className="nav pull-left notifcation-center">
              <li className="dropdown">
                <a id="main-menu-toggle" href="javascript:;" data-toggle="offcanvas" 
                  data-target="#main-menu" data-canvas=".page-container">
                  <div className="iconset top-menu-toggle-white"></div>
                </a>
              </li>
            </ul>
            <Link to="home">
              <img src="/assets/images/logo.png" alt="" data-src="/assets/images/logo.png" 
                width="86" height="38" className="logo" />
            </Link>
          </div>
          <div className="header-quick-nav">
            <div className="pull-left">
              <ul className="nav quick-section">
                <li className="quicklinks">
                  <a id="layout-condensed-toggle" href="javascript:;">
                    <div className="iconset top-menu-toggle-dark"></div>
                  </a>
                </li>
              </ul>
              <ul className="nav quick-section">
                <li className="m-r-10 input-prepend inside search-form no-boarder">
                  <span className="add-on"><span className="iconset top-search"></span></span>
                  <input type="text" name="" placeholder="Search Item.." 
                    style={{width:'250px'}} className="no-boarder" />
                </li>
              </ul>
            </div>
            <div className="pull-right">
              <div className="chat-toggler">
                <a id="my-task-list" href="javascript:;" data-placement="bottom" 
                  data-content="" data-toggle="dropdown" data-original-title="Notifications" 
                  className="dropdown-toggle">
                    <div className="user-details">
                      <div className="username">
                        &nbsp;{ this.props.user.email }<span className="bold">&nbsp;</span>
                      </div>
                    </div>
                    <div className="iconset top-down-arrow"></div>
                </a>
                <div id="notification-list" style={{display:'none', position: 'absolute', top: '50px'}}>
                  <div style={{width:'300px'}}>
                    <div className="notification-messages info">
                      <div className="user-profile">
                        <img src="/assets/images/profiles/d.jpg" alt="" 
                          data-src="/assets/images/profiles/d.jpg" 
                          data-src-retina="/assets/images/profiles/d2x.jpg" 
                          width="35" height="35" />
                      </div>
                      <div className="message-wrapper">
                        <div className="heading">Title of Notification</div>
                        <div className="description">Description...</div>
                        <div className="date pull-left">A min ago</div>
                      </div>
                      <div className="clearfix"></div>
                    </div>
                  </div>
                </div>
                <div className="profile-pic">
                  <img src="/assets/images/profiles/avatar_small.jpg" alt="" 
                    data-src="/assets/images/profiles/avatar_small.jpg" 
                    data-src-retina="/assets/images/profiles/avatar_small2x.jpg" 
                    width="35" height="35" />
                </div>
              </div>
              <ul className="nav quick-section">
                <li className="quicklinks">
                  <a id="user-options" data-toggle="dropdown" href="javascript:;" 
                    className="dropdown-toggle pull-right">
                    <div className="iconset top-settings-dark"></div>
                  </a>
                  <ul role="menu" aria-labelledby="user-options" className="dropdown-menu pull-right">
                    <li>
                      <a href="profile.html">My Account</a>
                    </li>
                    <li className="divider"></li>
                    <li><a href="javascript:;" onClick={this.logout}>
                      <i className="fa fa-power-off"></i>&nbsp;Logout</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div></div>
    );

    return (
      <div>
        { headerContainer }
      </div>
    );
  }
});

module.exports = Header;

