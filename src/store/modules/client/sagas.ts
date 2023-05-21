import { call, put, all, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from './types';
import { toast } from 'react-toastify';
import { AxiosRequestConfig, isAxiosError } from 'axios';
import axios from '../../../services/axios';

function* clientSaveRequest({ payload }: types.ClientSaveRequestAction) {
  try {
    const response: AxiosRequestConfig = yield call(axios.post, '/client', payload);
    if (response.data.length == 0) {
      toast.success('Cliente cadastrado com sucesso!');
      yield put(actions.clientSaveSuccess(response.data));
    } else {
      toast.error(`Erro: ${response.data}`);
      yield put(actions.clientSaveFailure());
    }
  } catch (e) {
    if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
    yield put(actions.clientSaveFailure());
  }
}

function* clientUpdateRequest({ payload }: types.ClientUpdateRequestAction) {
  try {
    const response: AxiosRequestConfig = yield call(
      axios.put,
      `/client/${payload.client.id}`,
      payload,
    );
    if (response.data.length == 0) {
      toast.success('Cliente atualizado com sucesso!');
      yield put(actions.clientUpdateSuccess(response.data));
    } else {
      toast.error(`Erro: ${response.data}`);
      yield put(actions.clientUpdateFailure());
    }
  } catch (e) {
    if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
    yield put(actions.clientUpdateFailure());
  }
}

function* clientDeleteRequest({ payload }: types.ClientDeleteRequestAction) {
  try {
    const response: AxiosRequestConfig = yield call(
      axios.delete,
      `/client/${payload.id}`,
    );
    if (response.data.length == 0) {
      toast.success('Cliente excluído com sucesso!');
      yield put(actions.clientDeleteSuccess(response.data));
    } else {
      toast.error(`Erro: ${response.data}`);
      yield put(actions.clientDeleteFailure());
    }
  } catch (e) {
    if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
    yield put(actions.clientDeleteFailure());
  }
}

export default all([
  takeLatest(types.CLIENT_SAVE_REQUEST, clientSaveRequest),
  takeLatest(types.CLIENT_UPDATE_REQUEST, clientUpdateRequest),
  takeLatest(types.CLIENT_DELETE_REQUEST, clientDeleteRequest),
]);
