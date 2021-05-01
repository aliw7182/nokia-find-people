export const FETCH_ACTION_ITEMS_REQUEST = 'FETCH_ACTION_ITEMS_REQUEST'
export const FETCH_ACTION_ITEMS_SUCCESS = 'FETCH_ACTION_ITEMS_SUCCESS'
export const FETCH_ACTION_ITEMS_FAILURE = 'FETCH_ACTION_ITEMS_FAILURE'

export const fetchActionItemsRequest = () => {
  return {
    type: FETCH_ACTION_ITEMS_REQUEST
  }
}

export const fetchActionItemsSuccess = data => {
  return {
    type: FETCH_ACTION_ITEMS_SUCCESS,
    payload: data
  }
}

export const fetchActionItemsFailure = error => {
  return {
    type: FETCH_ACTION_ITEMS_FAILURE,
    payload: error
  }
}
