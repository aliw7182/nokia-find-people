export const FETCH_ALERTS_REQUEST = "FETCH_ALERTS_REQUEST";
export const FETCH_ALERTS_SUCCESS = "FETCH_ALERTS_SUCCESS";
export const FETCH_ALERTS_FAILURE = "FETCH_ALERTS_FAILURE";

export const fetchAlertsRequest = () => {
  return {
    type: FETCH_ALERTS_REQUEST,
  };
};

export const fetchAlertsSuccess = (data) => {
  return {
    type: FETCH_ALERTS_SUCCESS,
    payload: data,
  };
};

export const fetchAlertsFailure = (error) => {
  return {
    type: FETCH_ALERTS_FAILURE,
    payload: error,
  };
};
