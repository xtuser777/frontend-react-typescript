import * as types from './types';

interface TruckTypeState {
  success: boolean;
}

const initialState: TruckTypeState = {
  success: false,
};

export default function driverReducer(
  state: TruckTypeState = initialState,
  action: types.TruckTypeAction,
): TruckTypeState {
  switch (action.type) {
    case types.TRUCK_TYPE_SAVE_SUCCESS: {
      const newState = { ...state };
      newState.success = true;
      return newState;
    }

    case types.TRUCK_TYPE_SAVE_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.TRUCK_TYPE_SAVE_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }

    case types.TRUCK_TYPE_UPDATE_SUCCESS: {
      const newState = { ...state };
      newState.success = true;
      return newState;
    }

    case types.TRUCK_TYPE_UPDATE_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.TRUCK_TYPE_UPDATE_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }

    case types.TRUCK_TYPE_DELETE_SUCCESS: {
      const newState = { ...state };
      newState.success = true;
      return newState;
    }

    case types.TRUCK_TYPE_DELETE_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.TRUCK_TYPE_DELETE_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }

    default: {
      return state;
    }
  }
}
