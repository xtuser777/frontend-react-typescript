import * as types from './types';

interface RepresentationState {
  success: boolean;
}

const initialState: RepresentationState = {
  success: false,
};

export default function representationReducer(
  state: RepresentationState = initialState,
  action: types.RepresentationAction,
): RepresentationState {
  switch (action.type) {
    case types.REPRESENTATION_SAVE_SUCCESS: {
      const newState = { ...state };
      newState.success = true;
      return newState;
    }

    case types.REPRESENTATION_SAVE_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.REPRESENTATION_SAVE_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }

    case types.REPRESENTATION_UPDATE_SUCCESS: {
      const newState = { ...state };
      newState.success = true;
      return newState;
    }

    case types.REPRESENTATION_UPDATE_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.REPRESENTATION_UPDATE_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }

    case types.REPRESENTATION_DELETE_SUCCESS: {
      const newState = { ...state };
      newState.success = true;
      return newState;
    }

    case types.REPRESENTATION_DELETE_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.REPRESENTATION_DELETE_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }

    default: {
      return state;
    }
  }
}
