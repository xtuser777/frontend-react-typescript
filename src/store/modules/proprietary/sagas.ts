import { call, put, all, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from './types';
import { toast } from 'react-toastify';
import { AxiosRequestConfig, isAxiosError } from 'axios';
import axios from '../../../services/axios';

function* proprietarySaveRequest({ payload }: types.ProprietarySaveRequestAction) {
  try {
    const response: AxiosRequestConfig = yield call(axios.post, '/proprietary', payload);
    if (response.data.length == 0) {
      toast.success('Proprietário cadastrado com sucesso!');
      yield put(actions.proprietarySaveSuccess(response.data));
    } else {
      toast.error(`Erro: ${response.data}`);
      yield put(actions.proprietarySaveFailure());
    }
  } catch (e) {
    if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
    yield put(actions.proprietarySaveFailure());
  }
}

function* proprietaryUpdateRequest({ payload }: types.ProprietaryUpdateRequestAction) {
  try {
    const response: AxiosRequestConfig = yield call(
      axios.put,
      `/proprietary/${payload.prop.id}`,
      payload,
    );
    if (response.data.length == 0) {
      toast.success('Proprietário atualizado com sucesso!');
      yield put(actions.proprietaryUpdateSuccess(response.data));
    } else {
      toast.error(`Erro: ${response.data}`);
      yield put(actions.proprietaryUpdateFailure());
    }
  } catch (e) {
    if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
    yield put(actions.proprietaryUpdateFailure());
  }
}

function* proprietaryDeleteRequest({ payload }: types.ProprietaryDeleteRequestAction) {
  try {
    const response: AxiosRequestConfig = yield call(
      axios.delete,
      `/proprietary/${payload.id}`,
    );
    if (response.data.length == 0) {
      toast.success('Proprietário excluído com sucesso!');
      yield put(actions.proprietaryDeleteSuccess(response.data));
    } else {
      toast.error(`Erro: ${response.data}`);
      yield put(actions.proprietaryDeleteFailure());
    }
  } catch (e) {
    if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
    yield put(actions.proprietaryDeleteFailure());
  }
}

export default all([
  takeLatest(types.PROPRIETARY_SAVE_REQUEST, proprietarySaveRequest),
  takeLatest(types.PROPRIETARY_UPDATE_REQUEST, proprietaryUpdateRequest),
  takeLatest(types.PROPRIETARY_DELETE_REQUEST, proprietaryDeleteRequest),
]);
