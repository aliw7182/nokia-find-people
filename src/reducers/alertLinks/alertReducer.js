import {
  FETCH_ALERTS_REQUEST,
  FETCH_ALERTS_SUCCESS,
  FETCH_ALERTS_FAILURE,
} from "./alertActions";

export const initialState = {
  loading: true,
  alerts: [],
  error: "",
};

export const alertReducer = (state, action) => {
  switch (action.type) {
    case FETCH_ALERTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case FETCH_ALERTS_SUCCESS:
      return {
        loading: false,
        alerts: action.payload,
        error: "",
      };
    case FETCH_ALERTS_FAILURE:
      return {
        loading: false,
        alerts: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
