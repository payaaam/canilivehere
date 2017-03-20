import { REQUEST_LOCATION, RECEIVE_LOCATION } from '../actions/LocationActions'

const defaultLocation = {
  center: {
    lat: 40.748,
    lng: -73.985
  }
}

const location = (state=defaultLocation, action) => {
  switch (action.type) {
    case REQUEST_LOCATION:
      return {
        ...state
      }
    case RECEIVE_LOCATION:
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

export default location