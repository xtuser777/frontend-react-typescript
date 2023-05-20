import { combineReducers } from 'redux';

import auth from './auth/reducer';
import employee from './employee/reducer';
import client from './client/reducer';
import driver from './driver/reducer';
import parameterization from './parameterization/reducer';

export default combineReducers({
  auth,
  employee,
  client,
  driver,
  parameterization,
});
