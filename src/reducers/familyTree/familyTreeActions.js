export const FETCH_FAMILY_TREE_REQUEST = 'FETCH_FAMILY_TREE_REQUEST'
export const FETCH_FAMILY_TREE_SUCCESS = 'FETCH_FAMILY_TREE_SUCCESS'
export const FETCH_FAMILY_TREE_FAILURE = 'FETCH_FAMILY_TREE_FAILURE'

export const fetchFamilyTreeRequest = () => {
  return {
    type: FETCH_FAMILY_TREE_REQUEST
  }
}

export const fetchFamilyTreeSuccess = data => {
  return {
    type: FETCH_FAMILY_TREE_SUCCESS,
    payload: data
  }
}

export const fetchFamilyTreeFailure = error => {
  return {
    type: FETCH_FAMILY_TREE_FAILURE,
    payload: error
  }
}