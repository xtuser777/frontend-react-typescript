import * as types from './types';

export function employeeSaveRequest(
  payload: types.EmployeeSaveRequestPayload,
): types.EmployeeSaveRequestAction {
  return {
    type: types.EMPLOYEE_SAVE_REQUEST,
    payload,
  };
}
export function employeeSaveSuccess(payload: string): types.EmployeeSaveSuccessAction {
  return {
    type: types.EMPLOYEE_SAVE_SUCCESS,
    payload,
  };
}
export function employeeSaveFailure(): types.EmployeeSaveFailureAction {
  return {
    type: types.EMPLOYEE_SAVE_FAILURE,
  };
}

export function employeeUpdateRequest(
  payload: types.EmployeeUpdateRequestPayload,
): types.EmployeeUpdateRequestAction {
  return {
    type: types.EMPLOYEE_UPDATE_REQUEST,
    payload,
  };
}
export function employeeUpdateSuccess(
  payload: string,
): types.EmployeeUpdateSuccessAction {
  return {
    type: types.EMPLOYEE_UPDATE_SUCCESS,
    payload,
  };
}
export function employeeUpdateFailure(): types.EmployeeUpdateFailureAction {
  return {
    type: types.EMPLOYEE_UPDATE_FAILURE,
  };
}

export function employeeDeleteRequest(
  payload: types.EmployeeDeleteRequestPayload,
): types.EmployeeDeleteRequestAction {
  return {
    type: types.EMPLOYEE_DELETE_REQUEST,
    payload,
  };
}
export function employeeDeleteSuccess(
  payload: string,
): types.EmployeeDeleteSuccessAction {
  return {
    type: types.EMPLOYEE_DELETE_SUCCESS,
    payload,
  };
}
export function employeeDeleteFailure(): types.EmployeeDeleteFailureAction {
  return {
    type: types.EMPLOYEE_DELETE_FAILURE,
  };
}
