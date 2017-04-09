import { 
  REQUEST_CHIPOTLE_LOCATIONS,
  RECEIVE_CHIPOTLE_LOCATIONS,
  REQUEST_CHIPOTLE_DISTANCES,
  RECEIVE_CHIPOTLE_DISTANCES
} from '../actions/ChipotleLocationActions'

const defaultLocation = {
  locations: []
}

const chipotleLocations = (state=defaultLocation, action) => {
  switch (action.type) {
    case REQUEST_CHIPOTLE_LOCATIONS:
      return {
        ...state
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
      debugger;
      let newLocations = state.locations.map((location) => {
        return {
          ...location,
          distance: {
            ...location.distance,
            [travelMode]: {
              distance: distances[location.address].distance,
              travelDuration: distances[location.address].duration
            }
          }
        }
      });

      return {
        ...state,
        locations: newLocations
      }
    default:
      return state
  }
}

export default chipotleLocations