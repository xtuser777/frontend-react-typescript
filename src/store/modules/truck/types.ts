export const TRUCK_SAVE_REQUEST = 'TRUCK_SAVE_REQUEST';
export interface TruckSaveRequestAction {
  type: typeof TRUCK_SAVE_REQUEST;
  payload: TruckSaveRequestPayload;
}

export const TRUCK_SAVE_SUCCESS = 'TRUCK_SAVE_SUCCESS';
export interface TruckSaveSuccessAction {
  type: typeof TRUCK_SAVE_SUCCESS;
  payload: string;
}

export const TRUCK_SAVE_FAILURE = 'TRUCK_SAVE_FAILURE';
export interface TruckSaveFailureAction {
  type: typeof TRUCK_SAVE_FAILURE;
}

export interface TruckSaveRequestPayload {
  type: {
    description: string;
    axes: number;
    capacity: number;
  };
}

export const TRUCK_UPDATE_REQUEST = 'TRUCK_UPDATE_REQUEST';
export interface TruckUpdateRequestAction {
  type: typeof TRUCK_UPDATE_REQUEST;
  payload: TruckUpdateRequestPayload;
}
export const TRUCK_UPDATE_SUCCESS = 'TRUCK_UPDATE_SUCCESS';
export interface TruckUpdateSuccessAction {
  type: typeof TRUCK_UPDATE_SUCCESS;
  payload: string;
}
export const TRUCK_UPDATE_FAILURE = 'TRUCK_UPDATE_FAILURE';
export interface TruckUpdateFailureAction {
  type: typeof TRUCK_UPDATE_FAILURE;
}
export interface TruckUpdateRequestPayload {
  type: {
    id: number;
    description: string;
    axes: number;
    capacity: number;
  };
}

export const TRUCK_DELETE_REQUEST = 'TRUCK_DELETE_REQUEST';
export interface TruckDeleteRequestAction {
  type: typeof TRUCK_DELETE_REQUEST;
  payload: TruckDeleteRequestPayload;
}
export const TRUCK_DELETE_SUCCESS = 'TRUCK_DELETE_SUCCESS';
export interface TruckDeleteSuccessAction {
  type: typeof TRUCK_DELETE_SUCCESS;
  payload: string;
}
export const TRUCK_DELETE_FAILURE = 'TRUCK_DELETE_FAILURE';
export interface TruckDeleteFailureAction {
  type: typeof TRUCK_DELETE_FAILURE;
}
export interface TruckDeleteRequestPayload {
  id: number;
}

export type TruckAction =
  | TruckSaveRequestAction
  | TruckSaveSuccessAction
  | TruckSaveFailureAction
  | TruckUpdateRequestAction
  | TruckUpdateSuccessAction
  | TruckUpdateFailureAction
  | TruckDeleteRequestAction
  | TruckDeleteSuccessAction
  | TruckDeleteFailureAction;
