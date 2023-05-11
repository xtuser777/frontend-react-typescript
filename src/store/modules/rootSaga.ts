import { AllEffect, ForkEffect, all } from 'redux-saga/effects';

import auth from './auth/sagas';
import employee from './employee/sagas';

export default function* rootSaga(): Generator<
  AllEffect<AllEffect<ForkEffect<never>>>,
  any,
  unknown
> {
  return yield all([auth, employee]);
}
