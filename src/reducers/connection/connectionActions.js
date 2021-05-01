export const FETCH_CONNECTIONS_REQUEST = 'FETCH_CONNECTIONS_REQUEST'
export const FETCH_CONNECTIONS_SUCCESS = 'FETCH_CONNECTIONS_SUCCESS'
export const FETCH_CONNECTIONS_FAILURE = 'FETCH_CONNECTIONS_FAILURE'

export const fetchConnectionsRequest = () => {
  return {
    type: FETCH_CONNECTIONS_REQUEST
  }
}

export const fetchConnectionsSuccess = data => {
  return {
    type: FETCH_CONNECTIONS_SUCCESS,
    payload: data
  }
}

export const fetchConnectionsFailure = error => {
  return {
    type: FETCH_CONNECTIONS_FAILURE,
    payload: error
  }
}
