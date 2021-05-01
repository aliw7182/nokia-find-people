export const FETCH_ATTACHMENTS_REQUEST = 'FETCH_ATTACHMENTS_REQUEST'
export const FETCH_ATTACHMENTS_SUCCESS = 'FETCH_ATTACHMENTS_SUCCESS'
export const FETCH_ATTACHMENTS_FAILURE = 'FETCH_ATTACHMENTS_FAILURE'

export const fetchAttachmentsRequest = () => {
  return {
    type: FETCH_ATTACHMENTS_REQUEST
  }
}

export const fetchAttachmentsSuccess = data => {
  return {
    type: FETCH_ATTACHMENTS_SUCCESS,
    payload: data
  }
}

export const fetchAttachmentsFailure = error => {
  return {
    type: FETCH_ATTACHMENTS_FAILURE,
    payload: error
  }
}
