import * as Types from '../actions/types';


export default function (state = {}, action) {

  switch(action.type){
    case Types.ID_TOKEN:              return {...state, idToken: action.payload}
    case Types.ACCESS_TOKEN:          return {...state, accessToken: action.payload}
    case Types.REFRESH_TOKEN:         return {...state, refreshToken: action.payload}
    case Types.EMAIL:                 return {...state, email: action.payload}
    }
  return state;
}
