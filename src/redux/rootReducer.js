// respesents all of the state of our application
import {combineReducers} from 'redux';
import userReducer from './user/userReducer';

export default combineReducers({
  user: userReducer,
});
