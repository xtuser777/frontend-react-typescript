export const EMPLOYEE_SAVE_REQUEST = 'EMPLOYEE_SAVE_REQUEST';
export interface EmployeeSaveRequestAction {
  type: typeof EMPLOYEE_SAVE_REQUEST;
  payload: EmployeeSaveRequestPayload;
}

export const EMPLOYEE_SAVE_SUCCESS = 'EMPLOYEE_SAVE_SUCCESS';
export interface EmployeeSaveSuccessAction {
  type: typeof EMPLOYEE_SAVE_SUCCESS;
  payload: string;
}

export const EMPLOYEE_SAVE_FAILURE = 'EMPLOYEE_SAVE_FAILURE';
export interface EmployeeSaveFailureAction {
  type: typeof EMPLOYEE_SAVE_FAILURE;
}

export interface EmployeeSaveRequestPayload {
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
  };
  employee: {
    type: number;
    login: string;
    password?: string;
    admission: string;
    level: number;
  };
}

export const EMPLOYEE_UPDATE_REQUEST = 'EMPLOYEE_UPDATE_REQUEST';
export interface EmployeeUpdateRequestAction {
  type: typeof EMPLOYEE_UPDATE_REQUEST;
  payload: EmployeeUpdateRequestPayload;
}
export const EMPLOYEE_UPDATE_SUCCESS = 'EMPLOYEE_UPDATE_SUCCESS';
export interface EmployeeUpdateSuccessAction {
  type: typeof EMPLOYEE_UPDATE_SUCCESS;
  payload: string;
}
export const EMPLOYEE_UPDATE_FAILURE = 'EMPLOYEE_UPDATE_FAILURE';
export interface EmployeeUpdateFailureAction {
  type: typeof EMPLOYEE_UPDATE_FAILURE;
}
export interface EmployeeUpdateRequestPayload {
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
  };
  employee: {
    id: number;
    type: number;
    login: string;
    password?: string;
    admission: string;
    demission?: string;
    level: number;
  };
}

export const EMPLOYEE_DELETE_REQUEST = 'EMPLOYEE_DELETE_REQUEST';
export interface EmployeeDeleteRequestAction {
  type: typeof EMPLOYEE_DELETE_REQUEST;
  payload: EmployeeDeleteRequestPayload;
}
export const EMPLOYEE_DELETE_SUCCESS = 'EMPLOYEE_DELETE_SUCCESS';
export interface EmployeeDeleteSuccessAction {
  type: typeof EMPLOYEE_DELETE_SUCCESS;
  payload: string;
}
export const EMPLOYEE_DELETE_FAILURE = 'EMPLOYEE_DELETE_FAILURE';
export interface EmployeeDeleteFailureAction {
  type: typeof EMPLOYEE_DELETE_FAILURE;
}
export interface EmployeeDeleteRequestPayload {
  id: number;
}

export type EmployeeAction =
  | EmployeeSaveRequestAction
  | EmployeeSaveSuccessAction
  | EmployeeSaveFailureAction
  | EmployeeUpdateRequestAction
  | EmployeeUpdateSuccessAction
  | EmployeeUpdateFailureAction
  | EmployeeDeleteRequestAction
  | EmployeeDeleteSuccessAction
  | EmployeeDeleteFailureAction;
