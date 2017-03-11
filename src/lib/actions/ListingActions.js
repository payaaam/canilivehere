import constants from '../store/constants'

export const SELECT_LISTING = 'SELECT_LISTING'
export const RECEIVE_LISTINGS = 'RECEIVE_LISTINGS'
export const REQUEST_LISTINGS = 'REQUEST_LISTINGS'

export function selectListing(listingId) {
  return {
    type: SELECT_LISTING,
    listingId
  }
}

export function requestListings() {
  return {
    type: REQUEST_LISTINGS
  }
}

export function receiveListings(json) {
  console.log('receiveListings', json)
  return {
    type: RECEIVE_LISTINGS,
    listings: json,
    receivedAt: Date.now()
  }
}


export function fetchListings() {
  return function(dispatch) {
    dispatch(requestListings())
    return fetch('http://localhost:9000/api/listings')
      .then(response => response.json())
      .then(json => dispatch(receiveListings(json)))
  }
}

export function shouldFetchListings(state) {
  let { listings } = state
  if (listings.length > 0) {
    return false
  }
  return true
}

export function fetchListingsIfNeeded() {
  console.log('in fetchListingsIfNeeded')
  return function(dispatch, getState) {
    console.log('in fetchListingsIfNeeded 1')
    if (shouldFetchListings(getState())) {
      return dispatch(fetchListings())
    }
  }
}