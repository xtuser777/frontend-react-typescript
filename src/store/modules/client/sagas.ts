import { call, put, all, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from './types';
import { sendDelete, sendPost, sendPut } from './requests';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';

function* clientSaveRequest({ payload }: types.ClientSaveRequestAction) {
  try {
    const response: string = yield call(sendPost, '/client', payload);
    if (response.length == 0) {
      toast.success('Cliente cadastrado com sucesso!');
      yield put(actions.clientSaveSuccess(response));
    } else {
      toast.error(`Erro: ${response}`);
      yield put(actions.clientSaveFailure());
    }
  } catch (e) {
    if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
    yield put(actions.clientSaveFailure());
  }
}

function* clientUpdateRequest({ payload }: types.ClientUpdateRequestAction) {
  try {
    const response: string = yield call(sendPut, `/client/${payload.client.id}`, payload);
    if (response.length == 0) {
      toast.success('Cliente atualizado com sucesso!');
      yield put(actions.clientUpdateSuccess(response));
    } else {
      toast.error(`Erro: ${response}`);
      yield put(actions.clientUpdateFailure());
    }
  } catch (e) {
    if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
    yield put(actions.clientUpdateFailure());
  }
}

function* clientDeleteRequest({ payload }: types.ClientDeleteRequestAction) {
  try {
    const response: string = yield call(sendDelete, `/client/${payload.id}`);
    if (response.length == 0) {
      toast.success('Cliente excluído com sucesso!');
      yield put(actions.clientDeleteSuccess(response));
    } else {
      toast.error(`Erro: ${response}`);
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
