export const REPRESENTATION_SAVE_REQUEST = 'REPRESENTATION_SAVE_REQUEST';
export interface RepresentationSaveRequestAction {
  type: typeof REPRESENTATION_SAVE_REQUEST;
  payload: RepresentationSaveRequestPayload;
}

export const REPRESENTATION_SAVE_SUCCESS = 'REPRESENTATION_SAVE_SUCCESS';
export interface RepresentationSaveSuccessAction {
  type: typeof REPRESENTATION_SAVE_SUCCESS;
  payload: string;
}

export const REPRESENTATION_SAVE_FAILURE = 'REPRESENTATION_SAVE_FAILURE';
export interface RepresentationSaveFailureAction {
  type: typeof REPRESENTATION_SAVE_FAILURE;
}

export interface RepresentationSaveRequestPayload {
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
    corporateName: string;
    fantasyName: string;
    cnpj: string;
    type: number;
  };
  representation: {
    register: string;
    unity: string;
  };
}

export const REPRESENTATION_UPDATE_REQUEST = 'REPRESENTATION_UPDATE_REQUEST';
export interface RepresentationUpdateRequestAction {
  type: typeof REPRESENTATION_UPDATE_REQUEST;
  payload: RepresentationUpdateRequestPayload;
}
export const REPRESENTATION_UPDATE_SUCCESS = 'REPRESENTATION_UPDATE_SUCCESS';
export interface RepresentationUpdateSuccessAction {
  type: typeof REPRESENTATION_UPDATE_SUCCESS;
  payload: string;
}
export const REPRESENTATION_UPDATE_FAILURE = 'REPRESENTATION_UPDATE_FAILURE';
export interface RepresentationUpdateFailureAction {
  type: typeof REPRESENTATION_UPDATE_FAILURE;
}
export interface RepresentationUpdateRequestPayload {
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
    corporateName: string;
    fantasyName: string;
    cnpj: string;
    type: number;
  };
  representation: {
    id: number;
    unity: string;
  };
}

export const REPRESENTATION_DELETE_REQUEST = 'REPRESENTATION_DELETE_REQUEST';
export interface RepresentationDeleteRequestAction {
  type: typeof REPRESENTATION_DELETE_REQUEST;
  payload: RepresentationDeleteRequestPayload;
}
export const REPRESENTATION_DELETE_SUCCESS = 'REPRESENTATION_DELETE_SUCCESS';
export interface RepresentationDeleteSuccessAction {
  type: typeof REPRESENTATION_DELETE_SUCCESS;
  payload: string;
}
export const REPRESENTATION_DELETE_FAILURE = 'REPRESENTATION_DELETE_FAILURE';
export interface RepresentationDeleteFailureAction {
  type: typeof REPRESENTATION_DELETE_FAILURE;
}
export interface RepresentationDeleteRequestPayload {
  id: number;
}

export type RepresentationAction =
  | RepresentationSaveRequestAction
  | RepresentationSaveSuccessAction
  | RepresentationSaveFailureAction
  | RepresentationUpdateRequestAction
  | RepresentationUpdateSuccessAction
  | RepresentationUpdateFailureAction
  | RepresentationDeleteRequestAction
  | RepresentationDeleteSuccessAction
  | RepresentationDeleteFailureAction;
