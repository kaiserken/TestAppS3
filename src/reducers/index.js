import { combineReducers } from 'redux';
import user from './user_reducer';
import action from '../actions/user_actions';


const appReducer = combineReducers({
  // put reducers here!
  user:   user,

});

// this allows all the data in the store to be wiped out when user logouts
const rootReducer = (state, action) => {
  // if (action.type === 'USER_LOGOUT') {
  //   state = undefined;
  // }

  return appReducer(state, action);
};
export default rootReducer;
