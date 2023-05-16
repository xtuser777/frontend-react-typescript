import * as types from './types';

export function driverSaveRequest(
  payload: types.DriverSaveRequestPayload,
): types.DriverSaveRequestAction {
  return {
    type: types.DRIVER_SAVE_REQUEST,
    payload,
  };
}
export function driverSaveSuccess(payload: string): types.DriverSaveSuccessAction {
  return {
    type: types.DRIVER_SAVE_SUCCESS,
    payload,
  };
}
export function driverSaveFailure(): types.DriverSaveFailureAction {
  return {
    type: types.DRIVER_SAVE_FAILURE,
  };
}

export function driverUpdateRequest(
  payload: types.DriverUpdateRequestPayload,
): types.DriverUpdateRequestAction {
  return {
    type: types.DRIVER_UPDATE_REQUEST,
    payload,
  };
}
export function driverUpdateSuccess(payload: string): types.DriverUpdateSuccessAction {
  return {
    type: types.DRIVER_UPDATE_SUCCESS,
    payload,
  };
}
export function driverUpdateFailure(): types.DriverUpdateFailureAction {
  return {
    type: types.DRIVER_UPDATE_FAILURE,
  };
}

export function driverDeleteRequest(
  payload: types.DriverDeleteRequestPayload,
): types.DriverDeleteRequestAction {
  return {
    type: types.DRIVER_DELETE_REQUEST,
    payload,
  };
}
export function driverDeleteSuccess(payload: string): types.DriverDeleteSuccessAction {
  return {
    type: types.DRIVER_DELETE_SUCCESS,
    payload,
  };
}
export function driverDeleteFailure(): types.DriverDeleteFailureAction {
  return {
    type: types.DRIVER_DELETE_FAILURE,
  };
}
