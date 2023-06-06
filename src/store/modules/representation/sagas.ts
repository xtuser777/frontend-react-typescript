import { call, put, all, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from './types';
import { toast } from 'react-toastify';
import { AxiosRequestConfig, isAxiosError } from 'axios';
import axios from '../../../services/axios';

function* representationSaveRequest({ payload }: types.RepresentationSaveRequestAction) {
  try {
    const response: AxiosRequestConfig = yield call(
      axios.post,
      '/representation',
      payload,
    );
    if (response.data.length == 0) {
      toast.success('Representação cadastrada com sucesso!');
      yield put(actions.representationSaveSuccess(response.data));
    } else {
      toast.error(`Erro: ${response.data}`);
      yield put(actions.representationSaveFailure());
    }
  } catch (e) {
    if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
    yield put(actions.representationSaveFailure());
  }
}

function* representationUpdateRequest({
  payload,
}: types.RepresentationUpdateRequestAction) {
  try {
    const response: AxiosRequestConfig = yield call(
      axios.put,
      `/representation/${payload.representation.id}`,
      payload,
    );
    if (response.data.length == 0) {
      toast.success('Representação atualizada com sucesso!');
      yield put(actions.representationUpdateSuccess(response.data));
    } else {
      toast.error(`Erro: ${response.data}`);
      yield put(actions.representationUpdateFailure());
    }
  } catch (e) {
    if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
    yield put(actions.representationUpdateFailure());
  }
}

function* representationDeleteRequest({
  payload,
}: types.RepresentationDeleteRequestAction) {
  try {
    const response: AxiosRequestConfig = yield call(
      axios.delete,
      `/representation/${payload.id}`,
    );
    if (response.data.length == 0) {
      toast.success('Representação excluída com sucesso!');
      yield put(actions.representationDeleteSuccess(response.data));
    } else {
      toast.error(`Erro: ${response.data}`);
      yield put(actions.representationDeleteFailure());
    }
  } catch (e) {
    if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
    yield put(actions.representationDeleteFailure());
  }
}

export default all([
  takeLatest(types.REPRESENTATION_SAVE_REQUEST, representationSaveRequest),
  takeLatest(types.REPRESENTATION_UPDATE_REQUEST, representationUpdateRequest),
  takeLatest(types.REPRESENTATION_DELETE_REQUEST, representationDeleteRequest),
]);
