import { fetchChildrenFailure, fetchChildrenRequest, fetchChildrenSuccess, FETCH_CHILDREN_FAILURE, FETCH_CHILDREN_REQUEST, FETCH_CHILDREN_SUCCESS } from './childActions'
import { childReducer, initialState } from './childReducer'

describe('actions', () => {
  it('should create an action for pending', () => {
    const expectedAction = {
      type: FETCH_CHILDREN_REQUEST
    }
    expect(fetchChildrenRequest()).toEqual(expectedAction)
  })
  
  it('should create an action to fetch a children', () => {
    const sampleData = [1, 2, 3]
    const expectedAction = {
      type: FETCH_CHILDREN_SUCCESS,
      payload: sampleData
    }
    expect(fetchChildrenSuccess(sampleData)).toEqual(expectedAction)
  })

  it('should create an action to catch an error', () => {
    const errorMessage = 'Sample error message'
    const expectedAction = {
      type: FETCH_CHILDREN_FAILURE,
      payload: errorMessage
    }
    expect(fetchChildrenFailure(errorMessage)).toEqual(expectedAction)
  })
})

describe('reducers', () => {
  it('FETCH_CHILDREN_REQUEST', () => {
    const action = {
      type: FETCH_CHILDREN_REQUEST
    }

    expect(childReducer(initialState, action)).toEqual({
      loading: true,
      error: '',
      children: []
    })
  })

  it('FETCH_CHILDREN_SUCCESS', () => {
    const action = {
      type: FETCH_CHILDREN_SUCCESS,
      payload: [1, 2, 3]
    }

    expect(childReducer(initialState, action)).toEqual({
      loading: false,
      error: '',
      children: action.payload
    })
  })

  it('FETCH_CHILDREN_FAILURE', () => {
    const action = {
      type: FETCH_CHILDREN_FAILURE,
      payload: 'Error message'
    }

    expect(childReducer(initialState, action)).toEqual({
      loading: false,
      error: action.payload,
      children: []
    })
  })
})