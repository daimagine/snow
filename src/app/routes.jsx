var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./components/App.react.jsx');
var HomePage = require('./components/dashboard/HomePage.react.jsx');
var LoginPage = require('./components/session/LoginPage.react.jsx');
var StoriesPage = require('./components/stories/StoriesPage.react.jsx');
var StoryPage = require('./components/stories/StoryPage.react.jsx');
var StoryNew = require('./components/stories/StoryNew.react.jsx');
var SignupPage = require('./components/session/SignupPage.react.jsx');
var ProductsPage = require('./components/products/ProductsPage.react.jsx');
var ProductDetailPage = require('./components/products/ProductDetailPage.react.jsx');
var ProductsNewPage = require('./components/products/ProductsNewPage.react.jsx');
var ProductsEditPage = require('./components/products/ProductsEditPage.react.jsx');
var ProductsAffiliatePage = require('./components/products/ProductsAffiliatePage.react.jsx');
var ProductDetailAffiliatePage = require('./components/products/ProductDetailAffiliatePage.react.jsx');
var ProductAffiliateSearchPage = require('./components/products/ProductAffiliateSearchPage.react.jsx');


module.exports = (
  <Route name="app" handler={App}>
    <DefaultRoute handler={HomePage}/>
    
    <Route name="home" path="/" handler={HomePage}/>
    <Route name="login" path="/login" handler={LoginPage}/>
    <Route name="signup" path="/signup" handler={SignupPage}/>

    <Route name="stories" path="/stories" handler={StoriesPage}/>
    <Route name="story" path="/stories/:storyId" handler={StoryPage}/>
    <Route name="new-story" path="/story/new" handler={StoryNew}/>

    <Route name="products" path="/products" handler={ProductsPage}/>
    <Route name="new-product" path="/products/new" handler={ProductsNewPage}/>
    <Route name="product" path="/products/:productId" handler={ProductDetailPage}/>
    <Route name="edit-product" path="/products/:productId/edit" handler={ProductsEditPage}/>

    <Route name="affiliate-products" path="/affiliates" handler={ProductsAffiliatePage}/>
    <Route name="affiliate-search" path="/affiliates/search" handler={ProductAffiliateSearchPage}/>
    <Route name="affiliate-detail" path="/affiliates/:productId" handler={ProductDetailAffiliatePage}/>
  </Route>
);

