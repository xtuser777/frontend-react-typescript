import * as types from './types';

interface EmployeeState {
  success: boolean;
}

const initialState: EmployeeState = {
  success: false,
};

export default function employeeReducer(
  state: EmployeeState = initialState,
  action: types.EmployeeAction,
): EmployeeState {
  switch (action.type) {
    case types.EMPLOYEE_SAVE_SUCCESS: {
      const newState = { ...state };
      newState.success = true;
      return newState;
    }

    case types.EMPLOYEE_SAVE_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.EMPLOYEE_SAVE_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }

    case types.EMPLOYEE_UPDATE_SUCCESS: {
      const newState = { ...state };
      newState.success = true;
      return newState;
    }

    case types.EMPLOYEE_UPDATE_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.EMPLOYEE_UPDATE_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }

    case types.EMPLOYEE_DELETE_SUCCESS: {
      const newState = { ...state };
      newState.success = true;
      return newState;
    }

    case types.EMPLOYEE_DELETE_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.EMPLOYEE_DELETE_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }

    default: {
      return state;
    }
  }
}
