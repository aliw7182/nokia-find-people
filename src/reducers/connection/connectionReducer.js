import { FETCH_CONNECTIONS_REQUEST, FETCH_CONNECTIONS_SUCCESS, FETCH_CONNECTIONS_FAILURE } from "./connectionActions"

export const initialState = {
  loading: true,
  error: "",
  connections: []
}

export const connectionReducer = (state, action) => {
  switch(action.type){
    case FETCH_CONNECTIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: ""
      }
    case FETCH_CONNECTIONS_SUCCESS:
      return {
        loading: false,
        connections: action.payload,
        error: ""
      }
    case FETCH_CONNECTIONS_FAILURE:
      return {
        loading: false,
        connections: [],
        error: action.payload
      }
    default: return state
  }
}