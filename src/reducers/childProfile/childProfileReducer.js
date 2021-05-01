import {
  FETCH_CHILD_FAILURE,
  FETCH_CHILD_REQUEST,
  FETCH_CHILD_SUCCESS,
  FETCH_CHILD_USERS_FAILURE,
  FETCH_CHILD_USERS_SUCCESS,
  POST_POTENTIAL_MATCH,
} from "./childProfileActions";

export const initialState = {
  loading: true,
  error: "",
  child: {},
  child_users: [],
  not_child_users: [],
  hasAccess: true,
};

export const childProfileReducer = (state, action) => {
  switch (action.type) {
    case FETCH_CHILD_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
        hasAccess: false,
      };
    case FETCH_CHILD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        child: action.payload,
        hasAccess: action.payload.id !== null,
      };
    case FETCH_CHILD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        child: {},
        hasAccess: false,
      };
    case FETCH_CHILD_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        child_users: action.payload.child_users,
        not_child_users: action.payload.not_child_users,
      };
    case FETCH_CHILD_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        child_users: [],
        not_child_users: [],
      };
    case POST_POTENTIAL_MATCH:
      state.child.contacts[action.payload].potential_match = !state.child
        .contacts[action.payload].potential_match;
      return {
        ...state,
        loading: false,
        error: action.payload,
        child: state.child,
      };
    default:
      return state;
  }
};
