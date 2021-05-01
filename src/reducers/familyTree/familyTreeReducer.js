import { FETCH_FAMILY_TREE_REQUEST, FETCH_FAMILY_TREE_SUCCESS, FETCH_FAMILY_TREE_FAILURE } from "./familyTreeActions"

export const initialState = {
  loading: true,
  error: "",
  family_tree: [],
  constructed_tree: []
}

export const familyTreeReducer = (state, action) => {
  switch(action.type){
    case FETCH_FAMILY_TREE_REQUEST:
      return {
        ...state,
        loading: true,
        error: ""
      }
    case FETCH_FAMILY_TREE_SUCCESS:
      return {
        family_tree: action.payload.family_tree,
        constructed_tree: action.payload.constructed_tree,
        loading: false,
        error: ""
      }
    case FETCH_FAMILY_TREE_FAILURE:
      return {
        family_tree: [],
        constructed_tree: [],
        loading: false,
        error: action.payload
      }
    default: return state
  }
}