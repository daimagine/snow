var keyMirror = require('keymirror');

var AppRoot = "http://127.0.0.1:3333/";
var APIRoot = "http://localhost:3000/api/v1";

module.exports = {

  APIEndpoints: {
    AUTHENTICATE_TOKEN:         APIRoot + "/sessions/auth_token",
    LOGIN:                      APIRoot + "/sessions/create",
    REGISTRATION:               APIRoot + "/users",
    STORIES:                    APIRoot + "/stories",
    PRODUCTS:                   APIRoot + "/products",
    SEARCH_AFFILIATES:          APIRoot + "/affiliates/search",
    AFFILIATES:                 APIRoot + "/affiliates",
    CUSTOMER_SOCMEDS:           APIRoot + "/socmed_accounts",
    SOCMEDS_POSTING:            APIRoot + "/socmed_posts",
    GET_TWITTER_REDIRECT_URL:   APIRoot + "/socmeds/twitter/actions/redirect_url",
    VERIFY_TWITTER_ACCOUNT:     APIRoot + "/socmeds/twitter/actions/verify",
    USERS:                      APIRoot + "/users",
  },

  SocmedConstant: {
    TWITTER: {
        REQUEST_TOKEN_KEY: 'TWITTER_TOKEN_KEY',
        CALLBACK_URL: AppRoot + "/socmeds/callback_url/twitter"
    }
  },

  ProductCategory: {
    Digital: 1,
    Retail: 2,
    Ticket: 3
  },

  SocmedType: {
    Twitter: 1,
    Facebook: 2,
    FacebookPage: 3,
    Instagram: 4
  },

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ActionTypes: keyMirror({
    // Session
    LOGIN_REQUEST: null,
    LOGIN_RESPONSE: null,
    LOGOUT: null,

    // User
    UPDATE_USER: null,
    RECEIVE_UPDATED_USER: null,

    // Routes
    REDIRECT: null,

    LOAD_STORIES: null,
    RECEIVE_STORIES: null,
    LOAD_STORY: null,
    RECEIVE_STORY: null,
    CREATE_STORY: null,
    RECEIVE_CREATED_STORY: null,

    // Products
    LOAD_PRODUCTS: null,
    RECEIVE_PRODUCTS: null,
    LOAD_PRODUCT: null,
    RECEIVE_PRODUCT: null,
    UPDATE_PRODUCT: null,
    RECEIVE_UPDATED_PRODUCT: null,

    // Socmeds
    LOAD_SOCMED_ACCOUNTS: null,
    RECEIVE_SOCMED_ACCOUNTS: null,
    POST_TO_SOCMEDS: null,
    RECEIVE_SOCMED_POSTING_RESPONSE: null,

    // Affiliate
    LOAD_AFFILIATE: null,
    RECEIVE_AFFILIATE: null,
    LOAD_AFFILIATE_PRODUCTS: null,
    JOIN_AFFILIATE_PRODUCT: null,
    REMOVE_AFFILIATE_PRODUCT: null,

    // Twitter
    ADD_TWITTER_ACCOUNT: null,
    RECEIVE_TWITTER_REDIRECT_URL: null,
    VERIFY_TWITTER_ACCOUNT: null,
    RECEIVE_TWITTER_VERIFY_RESULT: null

  })

};
