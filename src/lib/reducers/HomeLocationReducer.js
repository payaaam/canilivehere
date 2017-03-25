import { REQUEST_HOME_LOCATION, RECEIVE_HOME_LOCATION } from '../actions/LocationActions'

const defaultLocation = {
  center: {
    lat: 40.748,
    lng: -73.985
  },
  marker: {}
}

const homeLocation = (state=defaultLocation, action) => {
  switch (action.type) {
    case REQUEST_HOME_LOCATION:
      return {
        ...state
      }
    case RECEIVE_HOME_LOCATION:
      return {
        ...state,
        center: {
          lat: action.coordinates.latitude,
          lng: action.coordinates.longitude
        }
      }
    default:
      return state
  }
}

export default homeLocation