import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { CombinedState, Reducer } from 'redux';
import { LoginAction } from './auth/types';

export default (reducers: Reducer<CombinedState<any>, LoginAction>) => {
  const persistReducers = persistReducer(
    {
      key: 'SCR-FRONTEND',
      storage,
      whitelist: ['auth', 'employee', 'client'],
    },
    reducers,
  );

  return persistReducers;
};
