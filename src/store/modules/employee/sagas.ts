import { call, put, all, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from './types';
import { sendDelete, sendPost, sendPut } from './requests';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';

function* employeeSaveRequest({ payload }: types.EmployeeSaveRequestAction) {
  try {
    const response: string = yield call(sendPost, '/employee', payload);
    if (response.length == 0) {
      toast.success('Funcionário cadastrado com sucesso!');
      yield put(actions.employeeSaveSuccess(response));
    } else {
      toast.error(`Erro: ${response}`);
      yield put(actions.employeeSaveFailure());
    }
  } catch (e) {
    if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
    yield put(actions.employeeSaveFailure());
  }
}

function* employeeUpdateRequest({ payload }: types.EmployeeUpdateRequestAction) {
  try {
    const response: string = yield call(sendPut, `/employee/${payload.user.id}`, payload);
    if (response.length == 0) {
      toast.success(
        payload.user.active == undefined
          ? 'Funcionário atualizado com sucesso!'
          : payload.user.active
          ? 'Funcionário reativado com sucesso!'
          : 'Funcionário desativado com sucesso!',
      );
      yield put(actions.employeeUpdateSuccess(response));
    } else {
      toast.error(`Erro: ${response}`);
      yield put(actions.employeeUpdateFailure());
    }
  } catch (e) {
    if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
    yield put(actions.employeeUpdateFailure());
  }
}

function* employeeDeleteRequest({ payload }: types.EmployeeDeleteRequestAction) {
  try {
    const response: string = yield call(sendDelete, `/employee/${payload.id}`);
    if (response.length == 0) {
      toast.success('Funcionário excluído com sucesso!');
      yield put(actions.employeeDeleteSuccess(response));
    } else {
      toast.error(`Erro: ${response}`);
      yield put(actions.employeeDeleteFailure());
    }
  } catch (e) {
    if (isAxiosError(e)) toast.error('Erro de requisição: ' + e.response?.data);
    yield put(actions.employeeDeleteFailure());
  }
}

export default all([
  takeLatest(types.EMPLOYEE_SAVE_REQUEST, employeeSaveRequest),
  takeLatest(types.EMPLOYEE_UPDATE_REQUEST, employeeUpdateRequest),
  takeLatest(types.EMPLOYEE_DELETE_REQUEST, employeeDeleteRequest),
]);
