import {combineReducers} from 'redux';
import auth from './auth';
import contact from './contact';

const AppReducer = combineReducers({
  auth,
  contact
});

export default AppReducer;
