import { FETCH_TEMPLATES_FAILURE, FETCH_TEMPLATES_REQUEST, FETCH_TEMPLATES_SUCCESS } from "./templateActions"

export const templateInitialState = {
  loading: false,
  templates: [],
  error: ""
}

export const templateReducer = (state = templateInitialState, action) => {
  switch(action.type){
    case FETCH_TEMPLATES_REQUEST:
      return {
        ...state,
        loading: true,
        error: ""
      }
    case FETCH_TEMPLATES_SUCCESS:
      return {
        loading: false,
        templates: action.payload,
        error: ""
      }
    case FETCH_TEMPLATES_FAILURE:
      return {
        loading: false,
        templates: [],
        error: action.payload
      }
    default: return state
  }
}