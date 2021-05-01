import { FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from "./userActions"

export const initialState = {
  loading: true,
  error: '',
  users: [],
}

export const userReducer = (state = initialState, action) => {
  switch(action.type){
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: ''
      }
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        error: '',
        users: action.payload
      }
    case FETCH_USERS_FAILURE:
      return {
        users: [],
        loading: false,
        error: action.payload
      }
    default: return state
  }
}
