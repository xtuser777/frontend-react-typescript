import { AllEffect, ForkEffect, all } from 'redux-saga/effects';

import auth from './auth/sagas';
import employee from './employee/sagas';
import client from './client/sagas';
import driver from './driver/sagas';
import parameterization from './parameterization/sagas';
import proprietary from './proprietary/sagas';
import truckType from './truck-type/sagas';
import truck from './truck/sagas';

export default function* rootSaga(): Generator<
  AllEffect<AllEffect<ForkEffect<never>>>,
  any,
  unknown
> {
  return yield all([
    auth,
    employee,
    client,
    driver,
    parameterization,
    proprietary,
    truckType,
    truck,
  ]);
}
