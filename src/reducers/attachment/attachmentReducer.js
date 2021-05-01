import { FETCH_ATTACHMENTS_REQUEST, FETCH_ATTACHMENTS_SUCCESS, FETCH_ATTACHMENTS_FAILURE } from "./attachmentActions"

export const initialState = {
  loading: true,
  error: "",
  attachments: []
}

export const attachmentReducer = (state, action) => {
  switch(action.type){
    case FETCH_ATTACHMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: ""
      }
    case FETCH_ATTACHMENTS_SUCCESS:
      return {
        loading: false,
        attachments: action.payload,
        error: ""
      }
    case FETCH_ATTACHMENTS_FAILURE:
      return {
        loading: false,
        attachments: [],
        error: action.payload
      }
    default: return state
  }
}