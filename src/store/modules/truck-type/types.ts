export const TRUCK_TYPE_SAVE_REQUEST = 'TRUCK_TYPE_SAVE_REQUEST';
export interface TruckTypeSaveRequestAction {
  type: typeof TRUCK_TYPE_SAVE_REQUEST;
  payload: TruckTypeSaveRequestPayload;
}

export const TRUCK_TYPE_SAVE_SUCCESS = 'TRUCK_TYPE_SAVE_SUCCESS';
export interface TruckTypeSaveSuccessAction {
  type: typeof TRUCK_TYPE_SAVE_SUCCESS;
  payload: string;
}

export const TRUCK_TYPE_SAVE_FAILURE = 'TRUCK_TYPE_SAVE_FAILURE';
export interface TruckTypeSaveFailureAction {
  type: typeof TRUCK_TYPE_SAVE_FAILURE;
}

export interface TruckTypeSaveRequestPayload {
  type: {
    description: string;
    axes: number;
    capacity: number;
  };
}

export const TRUCK_TYPE_UPDATE_REQUEST = 'TRUCK_TYPE_UPDATE_REQUEST';
export interface TruckTypeUpdateRequestAction {
  type: typeof TRUCK_TYPE_UPDATE_REQUEST;
  payload: TruckTypeUpdateRequestPayload;
}
export const TRUCK_TYPE_UPDATE_SUCCESS = 'TRUCK_TYPE_UPDATE_SUCCESS';
export interface TruckTypeUpdateSuccessAction {
  type: typeof TRUCK_TYPE_UPDATE_SUCCESS;
  payload: string;
}
export const TRUCK_TYPE_UPDATE_FAILURE = 'TRUCK_TYPE_UPDATE_FAILURE';
export interface TruckTypeUpdateFailureAction {
  type: typeof TRUCK_TYPE_UPDATE_FAILURE;
}
export interface TruckTypeUpdateRequestPayload {
  type: {
    id: number;
    description: string;
    axes: number;
    capacity: number;
  };
}

export const TRUCK_TYPE_DELETE_REQUEST = 'TRUCK_TYPE_DELETE_REQUEST';
export interface TruckTypeDeleteRequestAction {
  type: typeof TRUCK_TYPE_DELETE_REQUEST;
  payload: TruckTypeDeleteRequestPayload;
}
export const TRUCK_TYPE_DELETE_SUCCESS = 'TRUCK_TYPE_DELETE_SUCCESS';
export interface TruckTypeDeleteSuccessAction {
  type: typeof TRUCK_TYPE_DELETE_SUCCESS;
  payload: string;
}
export const TRUCK_TYPE_DELETE_FAILURE = 'TRUCK_TYPE_DELETE_FAILURE';
export interface TruckTypeDeleteFailureAction {
  type: typeof TRUCK_TYPE_DELETE_FAILURE;
}
export interface TruckTypeDeleteRequestPayload {
  id: number;
}

export type TruckTypeAction =
  | TruckTypeSaveRequestAction
  | TruckTypeSaveSuccessAction
  | TruckTypeSaveFailureAction
  | TruckTypeUpdateRequestAction
  | TruckTypeUpdateSuccessAction
  | TruckTypeUpdateFailureAction
  | TruckTypeDeleteRequestAction
  | TruckTypeDeleteSuccessAction
  | TruckTypeDeleteFailureAction;
