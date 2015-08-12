var keyMirror = require('keymirror');
var Config = require('config');

module.exports = {

  APIEndpoints: {
    AUTHENTICATE_TOKEN:         Config.APIRoot + "/sessions/auth_token",
    LOGIN:                      Config.APIRoot + "/sessions/create",
    REGISTRATION:               Config.APIRoot + "/users",
    STORIES:                    Config.APIRoot + "/stories",
    PRODUCTS:                   Config.APIRoot + "/products",
    SEARCH_AFFILIATES:          Config.APIRoot + "/affiliates/search",
    AFFILIATES:                 Config.APIRoot + "/affiliates",
    CUSTOMER_SOCMEDS:           Config.APIRoot + "/socmed_accounts",
    SOCMEDS_POSTING:            Config.APIRoot + "/socmed_posts",
    GET_TWITTER_REDIRECT_URL:   Config.APIRoot + "/socmeds/twitter/actions/redirect_url",
    VERIFY_TWITTER_ACCOUNT:     Config.APIRoot + "/socmeds/twitter/actions/verify",
    USERS:                      Config.APIRoot + "/users",
  },

  SocmedConstant: {
    TWITTER: {
        REQUEST_TOKEN_KEY: 'TWITTER_TOKEN_KEY',
        CALLBACK_URL: Config.AppRoot + "/socmeds/callback_url/twitter"
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
