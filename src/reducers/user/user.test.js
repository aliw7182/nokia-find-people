import { fetchUsersFailure, fetchUsersRequest, fetchUsersSuccess, FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from "./userActions"
import { initialState, userReducer } from "./userReducer"

describe('actions', () => {
  it('should create an action for pending', () => {
    const expectedAction = {
      type: FETCH_USERS_REQUEST
    }
    expect(fetchUsersRequest()).toEqual(expectedAction)
  })

  it('should create an action to fetch a users', () => {
    const sampleData = [1, 2, 3]
    const expectedAction = {
      type: FETCH_USERS_SUCCESS,
      payload: sampleData
    }
    expect(fetchUsersSuccess(sampleData)).toEqual(expectedAction)
  })

  it('should create an action to catch an error', () => {
    const errorMessage = "Sample error message"
    const expectedAction = {
      type: FETCH_USERS_FAILURE,
      payload: errorMessage
    }
    expect(fetchUsersFailure(errorMessage)).toEqual(expectedAction)
  })
})

describe('reducers', () => {
  it('FETCH_USERS_REQUEST', () => {
    const action = {
      type: FETCH_USERS_REQUEST,
    }

    expect(userReducer(initialState, action)).toEqual({
      loading: true,
      error: '',
      users: [],
    })
  })

  it('FETCH_USERS_SUCCESS', () => {
    const action = {
      type: FETCH_USERS_SUCCESS,
      payload: [1, 2, 3]
    }

    expect(userReducer(initialState, action)).toEqual({
      loading: false,
      error: '',
      users: action.payload,
    })
  })
  
  it('FETCH_USERS_FAILURE', () => {
    const action = {
      type: FETCH_USERS_FAILURE,
      payload: "Error message"
    }

    expect(userReducer(initialState, action)).toEqual({
      loading: false,
      error: action.payload,
      users: [],
    })
  })
})
