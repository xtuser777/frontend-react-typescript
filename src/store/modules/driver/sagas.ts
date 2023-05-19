import { call, put, all, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from './types';
import { toast } from 'react-toastify';
import { AxiosRequestConfig, isAxiosError } from 'axios';
import axios from '../../../services/axios';

function* driverSaveRequest({ payload }: types.DriverSaveRequestAction) {
  try {
    const response: AxiosRequestConfig = yield call(axios.post, '/driver', payload);
    if (response.data.length == 0) {
      toast.success('Motorista cadastrado com sucesso!');
      yield put(actions.driverSaveSuccess(response.data));
    } else {
      toast.error(`Erro: ${response.data}`);
      yield put(actions.driverSaveFailure());
    }
  } catch (e) {
    if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
    yield put(actions.driverSaveFailure());
  }
}

function* driverUpdateRequest({ payload }: types.DriverUpdateRequestAction) {
  try {
    const response: AxiosRequestConfig = yield call(
      axios.put,
      `/driver/${payload.driver.id}`,
      payload,
    );
    if (response.data == '') {
      toast.success('Motorista atualizado com sucesso!');
      yield put(actions.driverUpdateSuccess(response.data));
    } else {
      toast.error(`Erro: ${response.data}`);
      yield put(actions.driverUpdateFailure());
    }
  } catch (e) {
    if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
    yield put(actions.driverUpdateFailure());
  }
}

function* driverDeleteRequest({ payload }: types.DriverDeleteRequestAction) {
  try {
    const response: string = yield call(axios.delete, `/driver/${payload.id}`);
    if (response.length == 0) {
      toast.success('Motorista excluído com sucesso!');
      yield put(actions.driverDeleteSuccess(response));
    } else {
      toast.error(`Erro: ${response}`);
      yield put(actions.driverDeleteFailure());
    }
  } catch (e) {
    if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
    yield put(actions.driverDeleteFailure());
  }
}

export default all([
  takeLatest(types.DRIVER_SAVE_REQUEST, driverSaveRequest),
  takeLatest(types.DRIVER_UPDATE_REQUEST, driverUpdateRequest),
  takeLatest(types.DRIVER_DELETE_REQUEST, driverDeleteRequest),
]);
