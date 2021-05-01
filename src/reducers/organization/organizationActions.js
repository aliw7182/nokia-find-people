export const FETCH_ORGANIZATIONS_REQUEST = 'FETCH_ORGANIZATIONS_REQUEST'
export const FETCH_ORGANIZATIONS_SUCCESS = 'FETCH_ORGANIZATIONS_SUCCESS'
export const FETCH_ORGANIZATIONS_FAILURE = 'FETCH_ORGANIZATIONS_FAILURE'


export const fetchOrganizationsRequest = () => {
  return {
    type: FETCH_ORGANIZATIONS_REQUEST
  }
}

export const fetchOrganizationsSuccess = data => {
  return {
    type: FETCH_ORGANIZATIONS_SUCCESS,
    payload: data
  }
}

export const fetchOrganizationsFailure = error => {
  return {
    type: FETCH_ORGANIZATIONS_FAILURE,
    payload: error
  }
}
