import { call, put, all, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from './types';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';
import axios from '../../../services/axios';

function* parameterizationSaveRequest({
  payload,
}: types.ParameterizationSaveRequestAction) {
  try {
    const response: string = yield call(axios.post, '/parameterization', payload);
    if (response.length == 0) {
      toast.success('Parametrização cadastrada com sucesso!');
      yield put(actions.parameterizationSaveSuccess(response));
    } else {
      toast.error(`Erro: ${response}`);
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
    const response: string = yield call(axios.put, `/parameterization/`, payload);
    if (response.length == 0) {
      toast.success('Parametrização atualizada com sucesso!');
      yield put(actions.parameterizationUpdateSuccess(response));
    } else {
      toast.error(`Erro: ${response}`);
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
