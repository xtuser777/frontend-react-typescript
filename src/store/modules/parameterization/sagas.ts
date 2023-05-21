import { call, put, all, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from './types';
import { toast } from 'react-toastify';
import { AxiosRequestConfig, isAxiosError } from 'axios';
import axios from '../../../services/axios';

function* parameterizationSaveRequest({
  payload,
}: types.ParameterizationSaveRequestAction) {
  try {
    const response: AxiosRequestConfig = yield call(
      axios.post,
      '/parameterization',
      payload,
    );
    if (response.data.length == 0) {
      toast.success('Parametrização cadastrada com sucesso!');
      yield put(actions.parameterizationSaveSuccess(response.data));
    } else {
      toast.error(`Erro: ${response.data}`);
      yield put(actions.parameterizationSaveFailure());
    }
  } catch (e) {
    if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
    yield put(actions.parameterizationSaveFailure());
  }
}

function* parameterizationUpdateRequest({
  payload,
}: types.ParameterizationUpdateRequestAction) {
  try {
    const response: AxiosRequestConfig = yield call(
      axios.put,
      `/parameterization/`,
      payload,
    );
    if (response.data.length == 0) {
      toast.success('Parametrização atualizada com sucesso!');
      yield put(actions.parameterizationUpdateSuccess(response.data));
    } else {
      toast.error(`Erro: ${response.data}`);
      yield put(actions.parameterizationUpdateFailure());
    }
  } catch (e) {
    if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
    yield put(actions.parameterizationUpdateFailure());
  }
}

export default all([
  takeLatest(types.PARAMETERIZATION_SAVE_REQUEST, parameterizationSaveRequest),
  takeLatest(types.PARAMETERIZATION_UPDATE_REQUEST, parameterizationUpdateRequest),
]);
