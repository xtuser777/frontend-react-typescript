import { call, put, all, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from './types';
import { toast } from 'react-toastify';
import { AxiosRequestConfig, isAxiosError } from 'axios';
import axios from '../../../services/axios';

function* truckTypeSaveRequest({ payload }: types.TruckTypeSaveRequestAction) {
  try {
    const response: AxiosRequestConfig = yield call(axios.post, '/type', payload);
    if (response.data.length == 0) {
      toast.success('Tipo de caminhão cadastrado com sucesso!');
      yield put(actions.truckTypeSaveSuccess(response.data));
    } else {
      toast.error(`Erro: ${response.data}`);
      yield put(actions.truckTypeSaveFailure());
    }
  } catch (e) {
    if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
    yield put(actions.truckTypeSaveFailure());
  }
}

function* truckTypeUpdateRequest({ payload }: types.TruckTypeUpdateRequestAction) {
  try {
    const response: AxiosRequestConfig = yield call(
      axios.put,
      `/type/${payload.type.id}`,
      payload,
    );
    if (response.data == '') {
      toast.success('Tipo de caminhão atualizado com sucesso!');
      yield put(actions.truckTypeUpdateSuccess(response.data));
    } else {
      toast.error(`Erro: ${response.data}`);
      yield put(actions.truckTypeUpdateFailure());
    }
  } catch (e) {
    if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
    yield put(actions.truckTypeUpdateFailure());
  }
}

function* truckTypeDeleteRequest({ payload }: types.TruckTypeDeleteRequestAction) {
  try {
    const response: AxiosRequestConfig = yield call(axios.delete, `/type/${payload.id}`);
    if (response.data.length == 0) {
      toast.success('Tipo de caminhão excluído com sucesso!');
      yield put(actions.truckTypeDeleteSuccess(response.data));
    } else {
      toast.error(`Erro: ${response.data}`);
      yield put(actions.truckTypeDeleteFailure());
    }
  } catch (e) {
    if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
    yield put(actions.truckTypeDeleteFailure());
  }
}

export default all([
  takeLatest(types.TRUCK_TYPE_SAVE_REQUEST, truckTypeSaveRequest),
  takeLatest(types.TRUCK_TYPE_UPDATE_REQUEST, truckTypeUpdateRequest),
  takeLatest(types.TRUCK_TYPE_DELETE_REQUEST, truckTypeDeleteRequest),
]);
