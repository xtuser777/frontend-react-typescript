export const PROPRIETARY_SAVE_REQUEST = 'PROPRIETARY_SAVE_REQUEST';
export interface ProprietarySaveRequestAction {
  type: typeof PROPRIETARY_SAVE_REQUEST;
  payload: ProprietarySaveRequestPayload;
}

export const PROPRIETARY_SAVE_SUCCESS = 'PROPRIETARY_SAVE_SUCCESS';
export interface ProprietarySaveSuccessAction {
  type: typeof PROPRIETARY_SAVE_SUCCESS;
  payload: string;
}

export const PROPRIETARY_SAVE_FAILURE = 'PROPRIETARY_SAVE_FAILURE';
export interface ProprietarySaveFailureAction {
  type: typeof PROPRIETARY_SAVE_FAILURE;
}

export interface ProprietarySaveRequestPayload {
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
    cpf: string;
    birth: string;
    corporateName: string;
    fantasyName: string;
    cnpj: string;
    type: number;
  };
  prop: {
    register: string;
    driver?: number;
  };
}

export const PROPRIETARY_UPDATE_REQUEST = 'PROPRIETARY_UPDATE_REQUEST';
export interface ProprietaryUpdateRequestAction {
  type: typeof PROPRIETARY_UPDATE_REQUEST;
  payload: ProprietaryUpdateRequestPayload;
}
export const PROPRIETARY_UPDATE_SUCCESS = 'PROPRIETARY_UPDATE_SUCCESS';
export interface ProprietaryUpdateSuccessAction {
  type: typeof PROPRIETARY_UPDATE_SUCCESS;
  payload: string;
}
export const PROPRIETARY_UPDATE_FAILURE = 'PROPRIETARY_UPDATE_FAILURE';
export interface ProprietaryUpdateFailureAction {
  type: typeof PROPRIETARY_UPDATE_FAILURE;
}
export interface ProprietaryUpdateRequestPayload {
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
    cpf: string;
    birth: string;
    corporateName: string;
    fantasyName: string;
    cnpj: string;
    type: number;
  };
  prop: {
    id: number;
    driver?: number;
  };
}

export const PROPRIETARY_DELETE_REQUEST = 'PROPRIETARY_DELETE_REQUEST';
export interface ProprietaryDeleteRequestAction {
  type: typeof PROPRIETARY_DELETE_REQUEST;
  payload: ProprietaryDeleteRequestPayload;
}
export const PROPRIETARY_DELETE_SUCCESS = 'PROPRIETARY_DELETE_SUCCESS';
export interface ProprietaryDeleteSuccessAction {
  type: typeof PROPRIETARY_DELETE_SUCCESS;
  payload: string;
}
export const PROPRIETARY_DELETE_FAILURE = 'PROPRIETARY_DELETE_FAILURE';
export interface ProprietaryDeleteFailureAction {
  type: typeof PROPRIETARY_DELETE_FAILURE;
}
export interface ProprietaryDeleteRequestPayload {
  id: number;
}

export type ProprietaryAction =
  | ProprietarySaveRequestAction
  | ProprietarySaveSuccessAction
  | ProprietarySaveFailureAction
  | ProprietaryUpdateRequestAction
  | ProprietaryUpdateSuccessAction
  | ProprietaryUpdateFailureAction
  | ProprietaryDeleteRequestAction
  | ProprietaryDeleteSuccessAction
  | ProprietaryDeleteFailureAction;
