import * as types from './types';

export function representationSaveRequest(
  payload: types.RepresentationSaveRequestPayload,
): types.RepresentationSaveRequestAction {
  return {
    type: types.REPRESENTATION_SAVE_REQUEST,
    payload,
  };
}
export function representationSaveSuccess(
  payload: string,
): types.RepresentationSaveSuccessAction {
  return {
    type: types.REPRESENTATION_SAVE_SUCCESS,
    payload,
  };
}
export function representationSaveFailure(): types.RepresentationSaveFailureAction {
  return {
    type: types.REPRESENTATION_SAVE_FAILURE,
  };
}

export function representationUpdateRequest(
  payload: types.RepresentationUpdateRequestPayload,
): types.RepresentationUpdateRequestAction {
  return {
    type: types.REPRESENTATION_UPDATE_REQUEST,
    payload,
  };
}
export function representationUpdateSuccess(
  payload: string,
): types.RepresentationUpdateSuccessAction {
  return {
    type: types.REPRESENTATION_UPDATE_SUCCESS,
    payload,
  };
}
export function representationUpdateFailure(): types.RepresentationUpdateFailureAction {
  return {
    type: types.REPRESENTATION_UPDATE_FAILURE,
  };
}

export function representationDeleteRequest(
  payload: types.RepresentationDeleteRequestPayload,
): types.RepresentationDeleteRequestAction {
  return {
    type: types.REPRESENTATION_DELETE_REQUEST,
    payload,
  };
}
export function representationDeleteSuccess(
  payload: string,
): types.RepresentationDeleteSuccessAction {
  return {
    type: types.REPRESENTATION_DELETE_SUCCESS,
    payload,
  };
}
export function representationDeleteFailure(): types.RepresentationDeleteFailureAction {
  return {
    type: types.REPRESENTATION_DELETE_FAILURE,
  };
}
