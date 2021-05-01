export const FETCH_CHILDREN_REQUEST = 'FETCH_CHILDREN_REQUEST'
export const FETCH_CHILDREN_SUCCESS = 'FETCH_CHILDREN_SUCCESS'
export const FETCH_CHILDREN_FAILURE = 'FETCH_CHILDREN_FAILURE'

export const fetchChildrenRequest = () => {
  return {
    type: FETCH_CHILDREN_REQUEST
  }
}

export const fetchChildrenSuccess = data => {
  return {
    type: FETCH_CHILDREN_SUCCESS,
    payload: data
  }
}

export const fetchChildrenFailure = error => {
  return {
    type: FETCH_CHILDREN_FAILURE,
    payload: error
  }
}
