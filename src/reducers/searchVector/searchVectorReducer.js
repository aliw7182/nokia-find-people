import {
  FETCH_SEARCH_VECTORS_REQUEST,
  FETCH_SEARCH_VECTORS_SUCCESS,
  FETCH_SEARCH_VECTORS_FAILURE,
} from "./searchVectorActions";

export const initialState = {
  loading: true,
  error: "",
  searchVectors: [],
};

export const searchVectorReducer = (state, action) => {
  switch (action.type) {
    case FETCH_SEARCH_VECTORS_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case FETCH_SEARCH_VECTORS_SUCCESS:
      return {
        searchVectors: action.payload,
        loading: false,
        error: "",
      };
    case FETCH_SEARCH_VECTORS_FAILURE:
      return {
        searchVectors: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
