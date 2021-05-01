export const FETCH_SEARCH_VECTORS_REQUEST = "FETCH_SEARCH_VECTORS_REQUEST";
export const FETCH_SEARCH_VECTORS_SUCCESS = "FETCH_SEARCH_VECTORS_SUCCESS";
export const FETCH_SEARCH_VECTORS_FAILURE = "FETCH_SEARCH_VECTORS_FAILURE";

export const fetchSearchVectorsRequest = () => {
  return {
    type: FETCH_SEARCH_VECTORS_REQUEST,
  };
};

export const fetchSearchVectorsSuccess = (data) => {
  return {
    type: FETCH_SEARCH_VECTORS_SUCCESS,
    payload: data,
  };
};

export const fetchSearchVectorsFailure = (error) => {
  return {
    type: FETCH_SEARCH_VECTORS_FAILURE,
    payload: error,
  };
};
