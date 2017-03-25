import { REQUEST_CHIPOTLE_LOCATION, RECEIVE_CHIPOTLE_LOCATION } from '../actions/ChipotleLocationActions'

const defaultLocation = {
  locations: []
}

const chipotleLocations = (state=defaultLocation, action) => {
  switch (action.type) {
    case REQUEST_CHIPOTLE_LOCATION:
      return {
        ...state
      }
    case RECEIVE_CHIPOTLE_LOCATION:
      return {
        ...state,
        locations: action.locations
      }
    default:
      return state
  }
}

export default chipotleLocations