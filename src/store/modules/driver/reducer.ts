import * as types from './types';

interface DriverState {
  success: boolean;
}

const initialState: DriverState = {
  success: false,
};

export default function driverReducer(
  state: DriverState = initialState,
  action: types.DriverAction,
): DriverState {
  switch (action.type) {
    case types.DRIVER_SAVE_SUCCESS: {
      const newState = { ...state };
      newState.success = true;
      return newState;
    }

    case types.DRIVER_SAVE_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.DRIVER_SAVE_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }

    case types.DRIVER_UPDATE_SUCCESS: {
      const newState = { ...state };
      newState.success = true;
      return newState;
    }

    case types.DRIVER_UPDATE_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.DRIVER_UPDATE_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }

    case types.DRIVER_DELETE_SUCCESS: {
      const newState = { ...state };
      newState.success = true;
      return newState;
    }

    case types.DRIVER_DELETE_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.DRIVER_DELETE_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }

    default: {
      return state;
    }
  }
}
