import * as types from './types';

export function proprietarySaveRequest(
  payload: types.ProprietarySaveRequestPayload,
): types.ProprietarySaveRequestAction {
  return {
    type: types.PROPRIETARY_SAVE_REQUEST,
    payload,
  };
}
export function proprietarySaveSuccess(
  payload: string,
): types.ProprietarySaveSuccessAction {
  return {
    type: types.PROPRIETARY_SAVE_SUCCESS,
    payload,
  };
}
export function proprietarySaveFailure(): types.ProprietarySaveFailureAction {
  return {
    type: types.PROPRIETARY_SAVE_FAILURE,
  };
}

export function proprietaryUpdateRequest(
  payload: types.ProprietaryUpdateRequestPayload,
): types.ProprietaryUpdateRequestAction {
  return {
    type: types.PROPRIETARY_UPDATE_REQUEST,
    payload,
  };
}
export function proprietaryUpdateSuccess(
  payload: string,
): types.ProprietaryUpdateSuccessAction {
  return {
    type: types.PROPRIETARY_UPDATE_SUCCESS,
    payload,
  };
}
export function proprietaryUpdateFailure(): types.ProprietaryUpdateFailureAction {
  return {
    type: types.PROPRIETARY_UPDATE_FAILURE,
  };
}

export function proprietaryDeleteRequest(
  payload: types.ProprietaryDeleteRequestPayload,
): types.ProprietaryDeleteRequestAction {
  return {
    type: types.PROPRIETARY_DELETE_REQUEST,
    payload,
  };
}
export function proprietaryDeleteSuccess(
  payload: string,
): types.ProprietaryDeleteSuccessAction {
  return {
    type: types.PROPRIETARY_DELETE_SUCCESS,
    payload,
  };
}
export function proprietaryDeleteFailure(): types.ProprietaryDeleteFailureAction {
  return {
    type: types.PROPRIETARY_DELETE_FAILURE,
  };
}
