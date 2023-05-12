export const CLIENT_SAVE_REQUEST = 'CLIENT_SAVE_REQUEST';
export interface ClientSaveRequestAction {
  type: typeof CLIENT_SAVE_REQUEST;
  payload: ClientSaveRequestPayload;
}

export const CLIENT_SAVE_SUCCESS = 'CLIENT_SAVE_SUCCESS';
export interface ClientSaveSuccessAction {
  type: typeof CLIENT_SAVE_SUCCESS;
  payload: string;
}

export const CLIENT_SAVE_FAILURE = 'CLIENT_SAVE_FAILURE';
export interface ClientSaveFailureAction {
  type: typeof CLIENT_SAVE_FAILURE;
}

export interface ClientSaveRequestPayload {
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
    corporateName: string;
    fantasyName: string;
    cnpj: string;
  };
  client: {
    type: number;
    register: string;
  };
}

export const CLIENT_UPDATE_REQUEST = 'CLIENT_UPDATE_REQUEST';
export interface ClientUpdateRequestAction {
  type: typeof CLIENT_UPDATE_REQUEST;
  payload: ClientUpdateRequestPayload;
}
export const CLIENT_UPDATE_SUCCESS = 'CLIENT_UPDATE_SUCCESS';
export interface ClientUpdateSuccessAction {
  type: typeof CLIENT_UPDATE_SUCCESS;
  payload: string;
}
export const CLIENT_UPDATE_FAILURE = 'CLIENT_UPDATE_FAILURE';
export interface ClientUpdateFailureAction {
  type: typeof CLIENT_UPDATE_FAILURE;
}
export interface ClientUpdateRequestPayload {
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
    corporateName: string;
    fantasyName: string;
    cnpj: string;
  };
  client: {
    id: number;
  };
}

export const CLIENT_DELETE_REQUEST = 'CLIENT_DELETE_REQUEST';
export interface ClientDeleteRequestAction {
  type: typeof CLIENT_DELETE_REQUEST;
  payload: ClientDeleteRequestPayload;
}
export const CLIENT_DELETE_SUCCESS = 'CLIENT_DELETE_SUCCESS';
export interface ClientDeleteSuccessAction {
  type: typeof CLIENT_DELETE_SUCCESS;
  payload: string;
}
export const CLIENT_DELETE_FAILURE = 'CLIENT_DELETE_FAILURE';
export interface ClientDeleteFailureAction {
  type: typeof CLIENT_DELETE_FAILURE;
}
export interface ClientDeleteRequestPayload {
  id: number;
}

export type ClientAction =
  | ClientSaveRequestAction
  | ClientSaveSuccessAction
  | ClientSaveFailureAction
  | ClientUpdateRequestAction
  | ClientUpdateSuccessAction
  | ClientUpdateFailureAction
  | ClientDeleteRequestAction
  | ClientDeleteSuccessAction
  | ClientDeleteFailureAction;
