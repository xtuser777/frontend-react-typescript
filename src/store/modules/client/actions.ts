import * as types from './types';

export function clientSaveRequest(
  payload: types.ClientSaveRequestPayload,
): types.ClientSaveRequestAction {
  return {
    type: types.CLIENT_SAVE_REQUEST,
    payload,
  };
}
export function clientSaveSuccess(payload: string): types.ClientSaveSuccessAction {
  return {
    type: types.CLIENT_SAVE_SUCCESS,
    payload,
  };
}
export function clientSaveFailure(): types.ClientSaveFailureAction {
  return {
    type: types.CLIENT_SAVE_FAILURE,
  };
}

export function clientUpdateRequest(
  payload: types.ClientUpdateRequestPayload,
): types.ClientUpdateRequestAction {
  return {
    type: types.CLIENT_UPDATE_REQUEST,
    payload,
  };
}
export function clientUpdateSuccess(payload: string): types.ClientUpdateSuccessAction {
  return {
    type: types.CLIENT_UPDATE_SUCCESS,
    payload,
  };
}
export function clientUpdateFailure(): types.ClientUpdateFailureAction {
  return {
    type: types.CLIENT_UPDATE_FAILURE,
  };
}

export function clientDeleteRequest(
  payload: types.ClientDeleteRequestPayload,
): types.ClientDeleteRequestAction {
  return {
    type: types.CLIENT_DELETE_REQUEST,
    payload,
  };
}
export function clientDeleteSuccess(payload: string): types.ClientDeleteSuccessAction {
  return {
    type: types.CLIENT_DELETE_SUCCESS,
    payload,
  };
}
export function clientDeleteFailure(): types.ClientDeleteFailureAction {
  return {
    type: types.CLIENT_DELETE_FAILURE,
  };
}
