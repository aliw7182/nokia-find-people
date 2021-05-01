import {
  FETCH_SEARCH_RESULTS_REQUEST,
  FETCH_SEARCH_RESULTS_SUCCESS,
  FETCH_SEARCH_RESULTS_FAILURE,
} from "./searchResultActions";

export const initialState = {
  loading: true,
  error: "",
  searchResults: [],
};

export const searchResultReducer = (state, action) => {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case FETCH_SEARCH_RESULTS_SUCCESS:
      return {
        searchResults: action.payload,
        loading: false,
        error: "",
      };
    case FETCH_SEARCH_RESULTS_FAILURE:
      return {
        searchResults: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
