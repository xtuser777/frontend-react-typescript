import * as types from './types';

export function truckTypeSaveRequest(
  payload: types.TruckTypeSaveRequestPayload,
): types.TruckTypeSaveRequestAction {
  return {
    type: types.TRUCK_TYPE_SAVE_REQUEST,
    payload,
  };
}
export function truckTypeSaveSuccess(payload: string): types.TruckTypeSaveSuccessAction {
  return {
    type: types.TRUCK_TYPE_SAVE_SUCCESS,
    payload,
  };
}
export function truckTypeSaveFailure(): types.TruckTypeSaveFailureAction {
  return {
    type: types.TRUCK_TYPE_SAVE_FAILURE,
  };
}

export function truckTypeUpdateRequest(
  payload: types.TruckTypeUpdateRequestPayload,
): types.TruckTypeUpdateRequestAction {
  return {
    type: types.TRUCK_TYPE_UPDATE_REQUEST,
    payload,
  };
}
export function truckTypeUpdateSuccess(
  payload: string,
): types.TruckTypeUpdateSuccessAction {
  return {
    type: types.TRUCK_TYPE_UPDATE_SUCCESS,
    payload,
  };
}
export function truckTypeUpdateFailure(): types.TruckTypeUpdateFailureAction {
  return {
    type: types.TRUCK_TYPE_UPDATE_FAILURE,
  };
}

export function truckTypeDeleteRequest(
  payload: types.TruckTypeDeleteRequestPayload,
): types.TruckTypeDeleteRequestAction {
  return {
    type: types.TRUCK_TYPE_DELETE_REQUEST,
    payload,
  };
}
export function truckTypeDeleteSuccess(
  payload: string,
): types.TruckTypeDeleteSuccessAction {
  return {
    type: types.TRUCK_TYPE_DELETE_SUCCESS,
    payload,
  };
}
export function truckTypeDeleteFailure(): types.TruckTypeDeleteFailureAction {
  return {
    type: types.TRUCK_TYPE_DELETE_FAILURE,
  };
}
