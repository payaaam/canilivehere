export const REQUEST_GEOLOCATION = 'REQUEST_GEOLOCATION'
export const RECEIVE_GEOLOCATION = 'RECEIVE_GEOLOCATION'

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