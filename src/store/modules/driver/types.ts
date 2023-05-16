export const DRIVER_SAVE_REQUEST = 'DRIVER_SAVE_REQUEST';
export interface DriverSaveRequestAction {
  type: typeof DRIVER_SAVE_REQUEST;
  payload: DriverSaveRequestPayload;
}

export const DRIVER_SAVE_SUCCESS = 'DRIVER_SAVE_SUCCESS';
export interface DriverSaveSuccessAction {
  type: typeof DRIVER_SAVE_SUCCESS;
  payload: string;
}

export const DRIVER_SAVE_FAILURE = 'DRIVER_SAVE_FAILURE';
export interface DriverSaveFailureAction {
  type: typeof DRIVER_SAVE_FAILURE;
}

export interface DriverSaveRequestPayload {
  address: {
    street: string;
    number: string;
    neighborhood: string;
    complement: string;
    code: string;
    city: number;
  };
  contact: {
    phone: string;
    cellphone: string;
    email: string;
  };
  person: {
    name: string;
    rg: string;
    cpf: string;
    birthDate: string;
  };
  bank: {
    bank: string;
    agency: string;
    account: string;
    type: number;
  };
  driver: {
    register: string;
    cnh: string;
  };
}

export const DRIVER_UPDATE_REQUEST = 'DRIVER_UPDATE_REQUEST';
export interface DriverUpdateRequestAction {
  type: typeof DRIVER_UPDATE_REQUEST;
  payload: DriverUpdateRequestPayload;
}
export const DRIVER_UPDATE_SUCCESS = 'DRIVER_UPDATE_SUCCESS';
export interface DriverUpdateSuccessAction {
  type: typeof DRIVER_UPDATE_SUCCESS;
  payload: string;
}
export const DRIVER_UPDATE_FAILURE = 'DRIVER_UPDATE_FAILURE';
export interface DriverUpdateFailureAction {
  type: typeof DRIVER_UPDATE_FAILURE;
}
export interface DriverUpdateRequestPayload {
  address: {
    street: string;
    number: string;
    neighborhood: string;
    complement: string;
    code: string;
    city: number;
  };
  contact: {
    phone: string;
    cellphone: string;
    email: string;
  };
  person: {
    name: string;
    rg: string;
    cpf: string;
    birthDate: string;
  };
  bank: {
    bank: string;
    agency: string;
    account: string;
    type: number;
  };
  driver: {
    id: number;
    register: string;
    cnh: string;
  };
}

export const DRIVER_DELETE_REQUEST = 'DRIVER_DELETE_REQUEST';
export interface DriverDeleteRequestAction {
  type: typeof DRIVER_DELETE_REQUEST;
  payload: DriverDeleteRequestPayload;
}
export const DRIVER_DELETE_SUCCESS = 'DRIVER_DELETE_SUCCESS';
export interface DriverDeleteSuccessAction {
  type: typeof DRIVER_DELETE_SUCCESS;
  payload: string;
}
export const DRIVER_DELETE_FAILURE = 'DRIVER_DELETE_FAILURE';
export interface DriverDeleteFailureAction {
  type: typeof DRIVER_DELETE_FAILURE;
}
export interface DriverDeleteRequestPayload {
  id: number;
}

export type DriverAction =
  | DriverSaveRequestAction
  | DriverSaveSuccessAction
  | DriverSaveFailureAction
  | DriverUpdateRequestAction
  | DriverUpdateSuccessAction
  | DriverUpdateFailureAction
  | DriverDeleteRequestAction
  | DriverDeleteSuccessAction
  | DriverDeleteFailureAction;
