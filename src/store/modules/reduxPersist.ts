import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { CombinedState, Reducer } from 'redux';

export default (reducers: Reducer) => {
  const persistReducers = persistReducer(
    {
      key: 'SCR-FRONTEND',
      storage,
      whitelist: [
        'auth',
        'parameterization',
        'employee',
        'client',
        'driver',
        'proprietary',
      ],
    },
    reducers,
  );

  return persistReducers;
};
