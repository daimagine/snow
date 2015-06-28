import Dispatcher from '../commons/Dispatcher.js';
import {LOGIN_USER, LOGOUT_USER} from '../constants/ActionTypes';

export default {
  loginUser: (jwt) => {
    AppDispatcher.dispatch({
      actionType: LOGIN_USER,
      jwt: jwt
    });
  },
  
  logoutUser: () => {
    AppDispatcher.dispatch({
      actionType: LOGOUT_USER
    });
  }
}
