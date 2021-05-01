import { FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAILURE } from "./commentActions"

export const initialState = {
  loading: true,
  comments: [],
  error: ""
}

export const commentReducer = (state, action) => {
  switch(action.type){
    case FETCH_COMMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: ""
      }
      case FETCH_COMMENTS_SUCCESS:
        return {
          loading: false,
          comments: action.payload,
          error: ""
        }
      case FETCH_COMMENTS_FAILURE:
        return {
          loading: false,
          comments: [],
          error: action.payload
        }
    default: return state
  }
}