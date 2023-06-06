import { combineReducers } from 'redux';

import auth from './auth/reducer';
import employee from './employee/reducer';
import client from './client/reducer';
import driver from './driver/reducer';
import parameterization from './parameterization/reducer';
import proprietary from './proprietary/reducer';
import truckType from './truck-type/reducer';
import truck from './truck/reducer';
import representation from './representation/reducer';

export default combineReducers({
  auth,
  employee,
  client,
  driver,
  parameterization,
  proprietary,
  truckType,
  truck,
  representation,
});
