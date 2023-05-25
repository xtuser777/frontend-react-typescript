import * as types from './types';

interface ProprietaryState {
  success: boolean;
}

const initialState: ProprietaryState = {
  success: false,
};

export default function clientReducer(
  state: ProprietaryState = initialState,
  action: types.ProprietaryAction,
): ProprietaryState {
  switch (action.type) {
    case types.PROPRIETARY_SAVE_SUCCESS: {
      const newState = { ...state };
      newState.success = true;
      return newState;
    }

    case types.PROPRIETARY_SAVE_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.PROPRIETARY_SAVE_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }

    case types.PROPRIETARY_UPDATE_SUCCESS: {
      const newState = { ...state };
      newState.success = true;
      return newState;
    }

    case types.PROPRIETARY_UPDATE_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.PROPRIETARY_UPDATE_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }

    case types.PROPRIETARY_DELETE_SUCCESS: {
      const newState = { ...state };
      newState.success = true;
      return newState;
    }

    case types.PROPRIETARY_DELETE_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.PROPRIETARY_DELETE_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }

    default: {
      return state;
    }
  }
}
