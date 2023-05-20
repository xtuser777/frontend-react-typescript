export const PARAMETERIZATION_SAVE_REQUEST = 'PARAMETERIZATION_SAVE_REQUEST';
export interface ParameterizationSaveRequestAction {
  type: typeof PARAMETERIZATION_SAVE_REQUEST;
  payload: ParameterizationSaveRequestPayload;
}

export const PARAMETERIZATION_SAVE_SUCCESS = 'PARAMETERIZATION_SAVE_SUCCESS';
export interface ParameterizationSaveSuccessAction {
  type: typeof PARAMETERIZATION_SAVE_SUCCESS;
  payload: string;
}

export const PARAMETERIZATION_SAVE_FAILURE = 'PARAMETERIZATION_SAVE_FAILURE';
export interface ParameterizationSaveFailureAction {
  type: typeof PARAMETERIZATION_SAVE_FAILURE;
}

export interface ParameterizationSaveRequestPayload {
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
  };
  parameterization: {
    id: number;
    logotype: string;
  };
}

export const PARAMETERIZATION_UPDATE_REQUEST = 'PARAMETERIZATION_UPDATE_REQUEST';
export interface ParameterizationUpdateRequestAction {
  type: typeof PARAMETERIZATION_UPDATE_REQUEST;
  payload: ParameterizationUpdateRequestPayload;
}
export const PARAMETERIZATION_UPDATE_SUCCESS = 'PARAMETERIZATION_UPDATE_SUCCESS';
export interface ParameterizationUpdateSuccessAction {
  type: typeof PARAMETERIZATION_UPDATE_SUCCESS;
  payload: string;
}
export const PARAMETERIZATION_UPDATE_FAILURE = 'PARAMETERIZATION_UPDATE_FAILURE';
export interface ParameterizationUpdateFailureAction {
  type: typeof PARAMETERIZATION_UPDATE_FAILURE;
}
export interface ParameterizationUpdateRequestPayload {
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
  };
  parameterization: {
    id: number;
    logotype: string;
  };
}

export type ParameterizationAction =
  | ParameterizationSaveRequestAction
  | ParameterizationSaveSuccessAction
  | ParameterizationSaveFailureAction
  | ParameterizationUpdateRequestAction
  | ParameterizationUpdateSuccessAction
  | ParameterizationUpdateFailureAction;
