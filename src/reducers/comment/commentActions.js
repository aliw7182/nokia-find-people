export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST'
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS'
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE'

export const fetchCommentsRequest = () => {
  return {
    type: FETCH_COMMENTS_REQUEST
  }
}

export const fetchCommentsSuccess = data => {
  return {
    type: FETCH_COMMENTS_SUCCESS,
    payload: data
  }
}

export const fetchCommentsFailure = error => {
  return {
    type: FETCH_COMMENTS_FAILURE,
    payload: error
  }
}
