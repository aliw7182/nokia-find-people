import { organizationReducer, initialState } from "./organizationReducer"
import { fetchOrganizationsFailure, fetchOrganizationsRequest, fetchOrganizationsSuccess, FETCH_ORGANIZATIONS_FAILURE, FETCH_ORGANIZATIONS_REQUEST, FETCH_ORGANIZATIONS_SUCCESS } from "./organizationActions"

describe('actions', () => {
  it('should create an action for pending', () => {
    const expectedAction = {
      type: FETCH_ORGANIZATIONS_REQUEST
    }
    expect(fetchOrganizationsRequest()).toEqual(expectedAction)
  })

  it('should create an action to fetch an organizations', () => {
    const sampleData = [1, 2, 3]
    const expectedAction = {
      type: FETCH_ORGANIZATIONS_SUCCESS,
      payload: sampleData
    }
    expect(fetchOrganizationsSuccess(sampleData)).toEqual(expectedAction)
  })

  it('should create an action to catch an error', () => {
    const errorMessage = 'Sample error message'
    const expectedAction = {
      type: FETCH_ORGANIZATIONS_FAILURE,
      payload: errorMessage
    }
    expect(fetchOrganizationsFailure(errorMessage)).toEqual(expectedAction)
  })
})

describe('reducers', () => {
  it('FETCH_ORGANIZATIONS_REQUEST', () => {
    const action = {
      type: FETCH_ORGANIZATIONS_REQUEST
    }

    expect(organizationReducer(initialState, action)).toEqual({
      loading: true,
      error: '',
      organizations: []
    })
  })

  it('FETCH_ORGANIZATIONS_SUCCESS', () => {
    const action = {
      type: FETCH_ORGANIZATIONS_SUCCESS,
      payload: [1, 2, 3]
    }

    expect(organizationReducer(initialState, action)).toEqual({
      loading: false,
      error: '',
      organizations: [1, 2, 3]
    })
  })

  it('FETCH_ORGANIZATIONS_FAILURE', () => {
    const action = {
      type: FETCH_ORGANIZATIONS_FAILURE,
      payload: 'Error message'
    }

    expect(organizationReducer(initialState, action)).toEqual({
      loading: false,
      organizations: [],
      error: 'Error message'
    })
  })
})