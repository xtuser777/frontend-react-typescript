import { combineReducers } from 'redux';

import auth from './auth/reducer';
import employee from './employee/reducer';
import client from './client/reducer';

export default combineReducers({
  auth,
  employee,
  client,
});
