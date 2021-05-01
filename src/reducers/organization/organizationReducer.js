import { FETCH_ORGANIZATIONS_REQUEST, FETCH_ORGANIZATIONS_SUCCESS, FETCH_ORGANIZATIONS_FAILURE } from "./organizationActions"

export const initialState = {
  loading: true,
  error: '',
  organizations: [],
}

export const organizationReducer = (state, action) => {
  switch(action.type){
    case FETCH_ORGANIZATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: ''
      }
    case FETCH_ORGANIZATIONS_SUCCESS:
      return {
        organizations: action.payload,
        loading: false,
        error: ''
      }
    case FETCH_ORGANIZATIONS_FAILURE:
      return {
        organizations: [],
        loading: false,
        error: action.payload
      }
    default: return state
  }
}
