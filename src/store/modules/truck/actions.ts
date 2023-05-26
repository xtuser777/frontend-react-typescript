import * as types from './types';

export function truckSaveRequest(
  payload: types.TruckSaveRequestPayload,
): types.TruckSaveRequestAction {
  return {
    type: types.TRUCK_SAVE_REQUEST,
    payload,
  };
}
export function truckSaveSuccess(payload: string): types.TruckSaveSuccessAction {
  return {
    type: types.TRUCK_SAVE_SUCCESS,
    payload,
  };
}
export function truckSaveFailure(): types.TruckSaveFailureAction {
  return {
    type: types.TRUCK_SAVE_FAILURE,
  };
}

export function truckUpdateRequest(
  payload: types.TruckUpdateRequestPayload,
): types.TruckUpdateRequestAction {
  return {
    type: types.TRUCK_UPDATE_REQUEST,
    payload,
  };
}
export function truckUpdateSuccess(payload: string): types.TruckUpdateSuccessAction {
  return {
    type: types.TRUCK_UPDATE_SUCCESS,
    payload,
  };
}
export function truckUpdateFailure(): types.TruckUpdateFailureAction {
  return {
    type: types.TRUCK_UPDATE_FAILURE,
  };
}

export function truckDeleteRequest(
  payload: types.TruckDeleteRequestPayload,
): types.TruckDeleteRequestAction {
  return {
    type: types.TRUCK_DELETE_REQUEST,
    payload,
  };
}
export function truckDeleteSuccess(payload: string): types.TruckDeleteSuccessAction {
  return {
    type: types.TRUCK_DELETE_SUCCESS,
    payload,
  };
}
export function truckDeleteFailure(): types.TruckDeleteFailureAction {
  return {
    type: types.TRUCK_DELETE_FAILURE,
  };
}
