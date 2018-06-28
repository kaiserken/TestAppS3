import * as Types from './types';
import authentication from '../functions/authentication';
import axios from 'axios';


export function logOut(){
  return {
    type: Types.USER_LOGOUT,
    payload: null
  };

}

export function setUserEmail(email){
  return {
    type: Types.EMAIL,
    payload: email
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
    type: Types.REFRESH_TOKEN,
    payload: refreshToken
  };

}

export function logUserIn (email, password) {
  return function (dispatch) {
    return authentication.signIn(email, password)
    .then( result => {
      let session = result.signInUserSession;
      dispatch(setIdToken(session.idToken.jwtToken));
      dispatch(setAccessToken(session.accessToken.jwtToken));
      dispatch(setRefreshToken(session.refreshToken.token));
      dispatch(setUserEmail(session.idToken.payload.email));
      return result;
    })
    .catch( err => {
      dispatch(setIdToken(""));
      dispatch(setAccessToken(""));
      dispatch(setRefreshToken(""));
      dispatch(setUserEmail(""));
      throw(err);
    });
  };
}

export function signUserUp (email, password) {
  return function (dispatch) {
    return authentication.signUp(email, password)
    .then( result => {
      return result;
    })
    .catch( err => {
      throw(err);
    });
  };
}

export function confirmSignUp (email, code) {
  return function (dispatch) {
    return authentication.confirmSignUp(email, code)
    .then( user => {
      alert("You have succesfully signed Up - You can now sign in and use this app");
      return user;
    })
    .catch( err => {
      console.log('err in Confirm', err);
      throw(err);
    });
  };
}

export function signOut () {
  return function (dispatch) {
    return authentication.signOut()
    .then( result => {
      dispatch(setIdToken(""));
      dispatch(setAccessToken(""));
      dispatch(setRefreshToken(""));
      dispatch(setUserEmail(""));
      return result;
    })
    .catch( err => {
      console.log('err in Signout', err);
      dispatch(setIdToken(""));
      dispatch(setAccessToken(""));
      dispatch(setRefreshToken(""));
      dispatch(setUserEmail(""));
      throw err;
    });
  };
}

export function setUser() {
  return function (dispatch) {
    return authentication.currentSession()
    .then( user => {
      console.log(user);
      dispatch(setIdToken(user.idToken.jwtToken));
      dispatch(setAccessToken(user.accessToken.jwtToken));
      dispatch(setRefreshToken(user.refreshToken.token));
      dispatch(setUserEmail(user.idToken.payload.email));
      return user;
    })
    .catch( err => {
      console.log('no current user', err);
      dispatch(setIdToken(""));
      dispatch(setAccessToken(""));
      dispatch(setRefreshToken(""));
      dispatch(setUserEmail(""));

    });
  };
}
