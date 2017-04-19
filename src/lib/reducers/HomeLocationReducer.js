import { 
  REQUEST_HOME_LOCATION,
  RECEIVE_HOME_LOCATION,
  RECEIVE_HOME_LOCATION_ERROR
} from '../actions/LocationActions'


const defaultLocation = {
  center: {
    lat: 40.748,
    lng: -73.985
  },
  bounds: null,
  marker: {},
  zoom: 14
}

const homeLocation = (state=defaultLocation, action) => {
  switch (action.type) {
    case REQUEST_HOME_LOCATION:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_HOME_LOCATION:
      return {
        ...state,
        center: {
          lat: action.coordinates.latitude,
          lng: action.coordinates.longitude
        },
        isFetching: false
      }
    case RECEIVE_HOME_LOCATION_ERROR:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}

export default homeLocation