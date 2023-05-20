import * as types from './types';

interface ParameterizationState {
  success: boolean;
}

const initialState: ParameterizationState = {
  success: false,
};

export default function clientReducer(
  state: ParameterizationState = initialState,
  action: types.ParameterizationAction,
): ParameterizationState {
  switch (action.type) {
    case types.PARAMETERIZATION_SAVE_SUCCESS: {
      const newState = { ...state };
      newState.success = true;
      return newState;
    }

    case types.PARAMETERIZATION_SAVE_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.PARAMETERIZATION_SAVE_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }

    case types.PARAMETERIZATION_UPDATE_SUCCESS: {
      const newState = { ...state };
      newState.success = true;
      return newState;
    }

    case types.PARAMETERIZATION_UPDATE_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.PARAMETERIZATION_UPDATE_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }

    default: {
      return state;
    }
  }
}
