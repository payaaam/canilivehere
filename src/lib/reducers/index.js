import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { REQUEST_GEOLOCATION, RECEIVE_GEOLOCATION } from '../actions/LocationActions'

const defaultReducer = (state={}, action) => {
  return state
}

const defaultLocation = {
  isFetching: true,
  center: {
    lat: 40.748,
    lng: -73.985
  }
}

const location = (state=defaultLocation, action) => {
  switch (action.type) {
    case REQUEST_GEOLOCATION:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_GEOLOCATION:
      return {
        ...state,
        center: {
          lat: action.coordinates.latitude,
          lng: action.coordinates.longitude
        },
        isFetching: false
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  defaultReducer,
  routing,
  location
})

export default rootReducer