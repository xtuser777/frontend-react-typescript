import * as types from './types';

interface ClientState {
  success: boolean;
}

const initialState: ClientState = {
  success: false,
};

export default function clientReducer(
  state: ClientState = initialState,
  action: types.ClientAction,
): ClientState {
  switch (action.type) {
    case types.CLIENT_SAVE_SUCCESS: {
      const newState = { ...state };
      newState.success = true;
      return newState;
    }

    case types.CLIENT_SAVE_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.CLIENT_SAVE_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }

    case types.CLIENT_UPDATE_SUCCESS: {
      const newState = { ...state };
      newState.success = true;
      return newState;
    }

    case types.CLIENT_UPDATE_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.CLIENT_UPDATE_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }

    case types.CLIENT_DELETE_SUCCESS: {
      const newState = { ...state };
      newState.success = true;
      return newState;
    }

    case types.CLIENT_DELETE_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.CLIENT_DELETE_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }

    default: {
      return state;
    }
  }
}
