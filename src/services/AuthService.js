import axios from 'axios';
import when from 'when';
import { LOGIN_URL, SIGNUP_URL } from '../constants/AppConstants';
import LoginActions from '../actions/LoginActions';
import jwt from 'jsonwebtoken';

class AuthService {

  login(username, password, captcha) {
    return when(
      axios({
        method: 'POST',
        url: LOGIN_URL,
        responseType: 'json',
        data: {
          email: username,
          password: password,
          captcha: captcha
        }
      })
    )
    .then(function(response) {
        console.log('response', response);
        var jwt = response.data.payload;
        LoginActions.loginUser(jwt);
        return true;
    });
  }

}

export default new AuthService()
