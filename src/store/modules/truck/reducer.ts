import * as types from './types';

interface TruckState {
  success: boolean;
}

const initialState: TruckState = {
  success: false,
};

export default function driverReducer(
  state: TruckState = initialState,
  action: types.TruckAction,
): TruckState {
  switch (action.type) {
    case types.TRUCK_SAVE_SUCCESS: {
      const newState = { ...state };
      newState.success = true;
      return newState;
    }

    case types.TRUCK_SAVE_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.TRUCK_SAVE_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }

    case types.TRUCK_UPDATE_SUCCESS: {
      const newState = { ...state };
      newState.success = true;
      return newState;
    }

    case types.TRUCK_UPDATE_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.TRUCK_UPDATE_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }

    case types.TRUCK_DELETE_SUCCESS: {
      const newState = { ...state };
      newState.success = true;
      return newState;
    }

    case types.TRUCK_DELETE_REQUEST: {
      const newState = { ...state };
      return newState;
    }

    case types.TRUCK_DELETE_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }

    default: {
      return state;
    }
  }
}
