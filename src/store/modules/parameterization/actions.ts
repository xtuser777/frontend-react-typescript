import * as types from './types';

export function parameterizationSaveRequest(
  payload: types.ParameterizationSaveRequestPayload,
): types.ParameterizationSaveRequestAction {
  return {
    type: types.PARAMETERIZATION_SAVE_REQUEST,
    payload,
  };
}
export function parameterizationSaveSuccess(
  payload: string,
): types.ParameterizationSaveSuccessAction {
  return {
    type: types.PARAMETERIZATION_SAVE_SUCCESS,
    payload,
  };
}
export function parameterizationSaveFailure(): types.ParameterizationSaveFailureAction {
  return {
    type: types.PARAMETERIZATION_SAVE_FAILURE,
  };
}

export function parameterizationUpdateRequest(
  payload: types.ParameterizationUpdateRequestPayload,
): types.ParameterizationUpdateRequestAction {
  return {
    type: types.PARAMETERIZATION_UPDATE_REQUEST,
    payload,
  };
}
export function parameterizationUpdateSuccess(
  payload: string,
): types.ParameterizationUpdateSuccessAction {
  return {
    type: types.PARAMETERIZATION_UPDATE_SUCCESS,
    payload,
  };
}
export function parameterizationUpdateFailure(): types.ParameterizationUpdateFailureAction {
  return {
    type: types.PARAMETERIZATION_UPDATE_FAILURE,
  };
}
