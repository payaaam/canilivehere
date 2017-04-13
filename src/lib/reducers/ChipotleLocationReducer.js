import { 
  REQUEST_CHIPOTLE_LOCATIONS,
  RECEIVE_CHIPOTLE_LOCATIONS,
  REQUEST_CHIPOTLE_DISTANCES,
  RECEIVE_CHIPOTLE_DISTANCES
} from '../actions/ChipotleLocationActions'

const defaultLocation = {
  isFetching: false,
  locations: []
}

const chipotleLocations = (state=defaultLocation, action) => {
  switch (action.type) {
    case REQUEST_CHIPOTLE_LOCATIONS:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_CHIPOTLE_LOCATIONS:
      return {
        ...state,
        locations: action.locations
      }
    case REQUEST_CHIPOTLE_DISTANCES:
      return {
        ...state
      }
    case RECEIVE_CHIPOTLE_DISTANCES:
      let { distances, travelMode } = action.response;
      let newLocations = state.locations.map((location) => {
        return {
          ...location,
          distance: {
            ...location.distance,
            [travelMode]: {
              distance: distances[location.placeId].distance,
              travelDuration: distances[location.placeId].duration,
              directions: distances[location.placeId].directions

            }
          }
        }
      });

      return {
        ...state,
        isFetching: false,
        locations: newLocations
      }
    default:
      return state
  }
}

export default chipotleLocations