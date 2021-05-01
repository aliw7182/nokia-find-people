import { fetchActionItemsFailure, fetchActionItemsRequest, fetchActionItemsSuccess, FETCH_ACTION_ITEMS_FAILURE, FETCH_ACTION_ITEMS_REQUEST, FETCH_ACTION_ITEMS_SUCCESS } from './actionItemActions'
import { actionItemReducer, initialState } from './actionItemReducer'

describe('actions', () => {
  it('should create an action for pending', () => {
    const expectedAction = {
      type: FETCH_ACTION_ITEMS_REQUEST
    }
    expect(fetchActionItemsRequest()).toEqual(expectedAction)
  })

  it('should create an action to fetch action items', () => {
    const sampleData = [1, 2, 3]
    const expectedAction = {
      type: FETCH_ACTION_ITEMS_SUCCESS,
      payload: sampleData
    }
    expect(fetchActionItemsSuccess(sampleData)).toEqual(expectedAction)
  })

  it('should create an action to catch an error', () => {
    const errorMessage = 'Sample error message'
    const expectedAction = {
      type: FETCH_ACTION_ITEMS_FAILURE,
      payload: errorMessage
    }
    expect(fetchActionItemsFailure(errorMessage)).toEqual(expectedAction)
  })
})

describe('reducers', () => {
  it('FETCH_ACTION_ITEMS_REQUEST', () => {
    const action = {
      type: FETCH_ACTION_ITEMS_REQUEST
    }

    expect(actionItemReducer(initialState, action)).toEqual({
      loading: true,
      error: '',
      actionItems: []
    })
  })

  it('FETCH_ACTION_ITEMS_SUCCESS', () => {
    const action = {
      type: FETCH_ACTION_ITEMS_SUCCESS,
      payload: [1, 2, 3]
    }

    expect(actionItemReducer(initialState, action)).toEqual({
      loading: false,
      error: '',
      actionItems: action.payload
    })
  })

  it('FETCH_ACTION_ITEMS_FAILURE', () => {
    const action = {
      type: FETCH_ACTION_ITEMS_FAILURE,
      payload: 'Error message'
    }

    expect(actionItemReducer(initialState, action)).toEqual({
      loading: false,
      error: action.payload,
      actionItems: []
    })
  })
})