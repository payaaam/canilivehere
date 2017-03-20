import GoogleService from '../utils/GoogleService';
const googleService = new GoogleService();
const browserGeolocation = navigator.geolocation

export const REQUEST_LOCATION = 'REQUEST_LOCATION'
export const RECEIVE_LOCATION = 'RECEIVE_LOCATION'
export const RECEIVE_LOCATION_ERROR = 'RECEIVE_LOCATION_ERROR'

export function requestLocation() {
  return {
    type: REQUEST_LOCATION
  }
}

export function receiveLocation(coordinates) {
  return {
    type: RECEIVE_LOCATION,
    coordinates
  }
}

export function receiveLocationError(err) {
  return {
    type: RECEIVE_LOCATION,
    err: err
  }
}

/**
 * Uses browser to find current coordinates (lat, lng)
 */
export function fetchGeolocation() {
  return (dispatch) => {
    dispatch(requestLocation())

    // Check localStorage
    let cachedLocation = localStorage.getItem('canilivehere-geolocation')
    if (cachedLocation) {
      cachedLocation = JSON.parse(cachedLocation);
      return dispatch(receiveLocation(cachedLocation));
    }
    
    browserGeolocation.getCurrentPosition(
      (position) => {
        let coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }

        localStorage.setItem('canilivehere-geolocation', JSON.stringify(coords));
        dispatch(receiveLocation(coords));
      },
      (err) => {
        dispatch(receiveLocationError(err))
      }
    );
  }
}

/**
 * This function takes address string and gets its coordinates (lat, lng)
 * from Google. 
 * 
 * @param  {String} addressText The string to search for coordinates
 */
export function fetchUserLocation(addressText) {
  return (dispatch) => {
    dispatch(requestLocation())
    return googleService.getCoordinatesFromAddress(addressText)
      .then((response) => {
        let coordinates = {
          latitude: response[0].geometry.location.lat(),
          longitude: response[0].geometry.location.lng() 
        }
        return dispatch(receiveLocation(coordinates))
      })
      .catch((err)  => {
        dispatch(receiveLocationError(err))
      })
  }
}