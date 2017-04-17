import { 
  REQUEST_CHIPOTLE_LOCATIONS,
  RECEIVE_CHIPOTLE_LOCATIONS,
  REQUEST_CHIPOTLE_DISTANCES,
  RECEIVE_CHIPOTLE_DISTANCES,
  RECEIVE_CHIPOTLE_DISTANCES_ERROR,
  REQUEST_LIVING_DECISION,
  RECEIVE_LIVING_DECISION,
  RECEIVE_LIVING_DECISION_ERROR
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
        loadingMessage: 'Calculating your location...',
        isFetching: true
      }
    case RECEIVE_CHIPOTLE_LOCATIONS:
      return {
        ...state,
        locations: action.locations
      }
    case REQUEST_CHIPOTLE_DISTANCES:
      return {
        ...state,
        loadingMessage: 'Finding closest Chipotles...',
      }
    case RECEIVE_CHIPOTLE_DISTANCES:
      let { distances, travelMode } = action.response;
      let distancesNewLocations = state.locations.map((location) => {
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
        locations: distancesNewLocations
      }
    case RECEIVE_CHIPOTLE_DISTANCES_ERROR:
      return {
        ...state,
        isFetching: false,
        loadingMessage: ''
      }

    case REQUEST_LIVING_DECISION:
      return {
        ...state,
        loadingMessage: 'Determining habitability...'
      }
    case RECEIVE_LIVING_DECISION:
      let closestPlaceId = action.response.placeId;
      let livingDecisionNewLocations = state.locations.map((location) => {
        if (location.placeId === closestPlaceId) {
          return {
            ...location,
            show: true
          }
        }
        return location;
      });
      return {
        ...state,
        isFetching: false,
        locations: livingDecisionNewLocations,
        closestLocation: action.response,
        loadingMessage: ''
      }
    case RECEIVE_LIVING_DECISION_ERROR:
      return {
        ...state,
        isFetching: false,
        loadingMessage: ''
      }
    default:
      return state
  }
}

export default chipotleLocations