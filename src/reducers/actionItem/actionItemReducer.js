import { FETCH_ACTION_ITEMS_REQUEST, FETCH_ACTION_ITEMS_SUCCESS, FETCH_ACTION_ITEMS_FAILURE } from "./actionItemActions"

export const initialState = {
  loading: true,
  error: '',
  actionItems: []
}

export const actionItemReducer = (state, action) => {
  switch(action.type){
    case FETCH_ACTION_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: ''
      }
    case FETCH_ACTION_ITEMS_SUCCESS:
      return {
        actionItems: action.payload,
        loading: false,
        error: ''
      }
    case FETCH_ACTION_ITEMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default: return state
  }
}
