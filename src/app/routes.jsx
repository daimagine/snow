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
var ProductsCreatePage = require('./components/products/ProductsCreatePage.react.jsx');


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
    <Route name="new-product" path="/products/create" handler={ProductsCreatePage}/>
    <Route name="product" path="/products/:productId" handler={ProductDetailPage}/>
  </Route>
);

