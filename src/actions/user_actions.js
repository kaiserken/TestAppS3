import * as Types from './types';
import authentication from '../functions/authentication';
import axios from 'axios';


export function logOut(){
  return {
    type: Types.USER_LOGOUT,
    payload: null
  };

}

export function setIdToken(idToken){
  return {
    type: Types.ID_TOKEN,
    payload: idToken
  };

}

export function setAccessToken(accessToken){
  return {
    type: Types.ACCESS_TOKEN,
    payload: accessToken
  };

}

export function setRefreshToken(refreshToken){
  return {
    type: Types.ACCESS_TOKEN,
    payload: refreshToken
  };

}

export function logUserIn (email, password) {
  return function (dispatch) {
    return authentication.signIn(email, password).then( result => {
      console.log("result signIn", result);
      // dispatch(setIdToken(idToken));
      // dispatch(setAccessToken(accessToken));
      return result;
    })
    .catch( err => {
      console.log('err in logUserIn', err);
      dispatch(setIdToken(""));
      dispatch(setAccessToken(""));
      alert(`${err.message} Please double check your email and password. If the problem persists contact engineering`);
    });
  };
}

export function signUserUp (email, password) {
  return function (dispatch) {
    return authentication.signUp(email, password).then( result => {
      console.log("result signIn", result);
      // dispatch(setIdToken(idToken));
      // dispatch(setAccessToken(accessToken));
      return result;
    })
    .catch( err => {
      console.log('err in logUserIn', err);
      dispatch(setIdToken(""));
      dispatch(setAccessToken(""));
      alert(`${err.message} Please double check your email and password. If the problem persists contact engineering`);
    });
  };
}

export function confirmSignUp (email, code) {
  return function (dispatch) {
    return authentication.confirmSignUp(email, code).then( result => {
      console.log("result confirm", result);
      // dispatch(setIdToken(idToken));
      // dispatch(setAccessToken(accessToken));
      return result;
    })
    .catch( err => {
      console.log('err in Confirm', err);
      dispatch(setIdToken(""));
      dispatch(setAccessToken(""));
      alert(`${err.message} Please double check your email and password. If the problem persists contact engineering`);
    });
  };
}
