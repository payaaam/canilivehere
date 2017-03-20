import GoogleService from '../utils/GoogleService';
const googleService = new GoogleService();

export const REQUEST_GEOLOCATION = 'REQUEST_GEOLOCATION'
export const RECEIVE_GEOLOCATION = 'RECEIVE_GEOLOCATION'
export const REQUEST_USER_LOCATION = 'RECEIVE_USER_LOCATION'
export const RECEIVE_USER_LOCATION = 'RECEIVE_USER_LOCATION'

export function requestGeolocation() {
  return {
    type: REQUEST_GEOLOCATION
  }
}

export function receiveGeolocation(coordinates) {
  return {
    type: RECEIVE_GEOLOCATION,
    coordinates
  }
}

// This makes a request to the geoli
export function fetchGeolocation() {
  return (dispatch) => {
    dispatch(requestGeolocation())
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Successful geolocation lookup
        let coords = position.coords
        dispatch(receiveGeolocation(coords));
      },
      (error) => {
        // Failed geolocation lookup
        /*
        let defaultCoordinates = {
          latitude: 40.748,
          longitude: -73.985
        }
        dispatch(receiveGeolocation(defaultCoordinates));
        */
      }
    );
  }
}

export function requestUserLocation() {
  return {
    type: REQUEST_USER_LOCATION
  }
}

export function receiveUserLocation(coordinates) {
  return {
    type: RECEIVE_USER_LOCATION,
    coordinates
  }
}

export function fetchUserLocation(addressText) {
  return (dispatch) => {
    dispatch(requestUserLocation())
    return googleService.getCoordinatesFromAddress(addressText)
      .then((response) => {
        let coordinates = {
          latitude: response[0].geometry.location.lat(),
          longitude: response[0].geometry.location.lng() 
        }
        return dispatch(receiveGeolocation(coordinates))
      })
      .catch((err)  => {

      })
  }
}