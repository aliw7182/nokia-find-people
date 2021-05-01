import { FETCH_CHILDREN_FAILURE, FETCH_CHILDREN_REQUEST, FETCH_CHILDREN_SUCCESS } from "./childActions"

export const initialState = {
  loading: true,
  error: '',
  children: []
}

export const childReducer = (state, action) => {
  switch(action.type){
    case FETCH_CHILDREN_REQUEST:
      return {
        ...state,
        loading: true,
        error: ''
      }
    case FETCH_CHILDREN_SUCCESS:
      return {
        children: action.payload,
        loading: false,
        error: ''
      }
    case FETCH_CHILDREN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default: return state
  }
}
