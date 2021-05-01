export const FETCH_SEARCH_RESULTS_REQUEST = "FETCH_SEARCH_RESULTS_REQUEST";
export const FETCH_SEARCH_RESULTS_SUCCESS = "FETCH_SEARCH_RESULTS_SUCCESS";
export const FETCH_SEARCH_RESULTS_FAILURE = "FETCH_SEARCH_RESULTS_FAILURE";

export const fetchSearchResultsRequest = () => {
  return {
    type: FETCH_SEARCH_RESULTS_REQUEST,
  };
};

export const fetchSearchResultsSuccess = (data) => {
  console.log("DATA: ", data);
  return {
    type: FETCH_SEARCH_RESULTS_SUCCESS,
    payload: data,
  };
};

export const fetchSearchResultsFailure = (error) => {
  return {
    type: FETCH_SEARCH_RESULTS_FAILURE,
    payload: error,
  };
};
