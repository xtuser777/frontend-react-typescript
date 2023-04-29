import { call, put, all, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';
import { sendPost } from './requests';

function* authRequest({ payload }: types.LoginRequestAction) {
  try {
    const response: types.LoginRequestResult = yield call(sendPost, '/tokens', payload);
    yield put(actions.loginSuccess(response));
    alert('Você fez login.');

    axios.defaults.headers.Authorization = `Bearer ${response.token}`;

    history.push(payload.prevPath);
  } catch (e) {
    alert('Usuário ou senha inválidos.');

    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }: types.LoginSuccessAction) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest(types.LOGIN_REQUEST, authRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
]);
