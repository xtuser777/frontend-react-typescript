import { call, put, all, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from './types';
import { toast } from 'react-toastify';
import { AxiosRequestConfig, isAxiosError } from 'axios';
import axios from '../../../services/axios';

function* truckSaveRequest({ payload }: types.TruckSaveRequestAction) {
  try {
    const response: AxiosRequestConfig = yield call(axios.post, '/truck', payload);
    if (response.data.length == 0) {
      toast.success('Caminhão cadastrado com sucesso!');
      yield put(actions.truckSaveSuccess(response.data));
    } else {
      toast.error(`Erro: ${response.data}`);
      yield put(actions.truckSaveFailure());
    }
  } catch (e) {
    if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
    yield put(actions.truckSaveFailure());
  }
}

function* truckUpdateRequest({ payload }: types.TruckUpdateRequestAction) {
  try {
    const response: AxiosRequestConfig = yield call(
      axios.put,
      `/truck/${payload.truck.id}`,
      payload,
    );
    if (response.data == '') {
      toast.success('Caminhão atualizado com sucesso!');
      yield put(actions.truckUpdateSuccess(response.data));
    } else {
      toast.error(`Erro: ${response.data}`);
      yield put(actions.truckUpdateFailure());
    }
  } catch (e) {
    if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
    yield put(actions.truckUpdateFailure());
  }
}

function* truckDeleteRequest({ payload }: types.TruckDeleteRequestAction) {
  try {
    const response: AxiosRequestConfig = yield call(axios.delete, `/truck/${payload.id}`);
    if (response.data.length == 0) {
      toast.success('Caminhão excluído com sucesso!');
      yield put(actions.truckDeleteSuccess(response.data));
    } else {
      toast.error(`Erro: ${response.data}`);
      yield put(actions.truckDeleteFailure());
    }
  } catch (e) {
    if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
    yield put(actions.truckDeleteFailure());
  }
}

export default all([
  takeLatest(types.TRUCK_SAVE_REQUEST, truckSaveRequest),
  takeLatest(types.TRUCK_UPDATE_REQUEST, truckUpdateRequest),
  takeLatest(types.TRUCK_DELETE_REQUEST, truckDeleteRequest),
]);
