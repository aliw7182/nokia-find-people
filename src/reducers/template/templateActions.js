export const FETCH_TEMPLATES_REQUEST = 'FETCH_TEMPLATES_REQUEST'
export const FETCH_TEMPLATES_SUCCESS = 'FETCH_TEMPLATES_SUCCESS'
export const FETCH_TEMPLATES_FAILURE = 'FETCH_TEMPLATES_FAILURE'

export const fetchTemplatesRequest = () => {
  return {
    type: FETCH_TEMPLATES_REQUEST
  }
}

export const fetchTemplatesSuccess = data => {
  return {
    type: FETCH_TEMPLATES_SUCCESS,
    payload: data
  }
}

export const fetchTemplatesFailure = error => {
  return {
    type: FETCH_TEMPLATES_FAILURE,
    payload: error
  }
}
