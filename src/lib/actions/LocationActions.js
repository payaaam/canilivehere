import GoogleService from '../utils/GoogleService';
import DecisionService from '../utils/DecisionService';
import { fetchChipotleLocations } from './ChipotleLocationActions';
const googleService = new GoogleService();
const browserGeolocation = navigator.geolocation


export const REQUEST_HOME_LOCATION = 'REQUEST_HOME_LOCATION'
export const RECEIVE_HOME_LOCATION = 'RECEIVE_HOME_LOCATION'
export const RECEIVE_HOME_LOCATION_ERROR = 'RECEIVE_HOME_LOCATION_ERROR'

export function requestHomeLocation() {
  return {
    type: REQUEST_HOME_LOCATION
  }
}

export function receiveHomeLocation(coordinates) {
  return {
    type: RECEIVE_HOME_LOCATION,
    coordinates
  }
}

export function receiveHomeLocationError(err) {
  return {
    type: RECEIVE_HOME_LOCATION_ERROR,
    err: err
  }
}


/**
 * Uses browser to find current coordinates (lat, lng)
 */
export function fetchGeolocation() {
  return (dispatch) => {
    dispatch(requestHomeLocation())

    // Check localStorage
    let cachedLocation = localStorage.getItem('canilivehere-geolocation')
    if (cachedLocation) {
      cachedLocation = JSON.parse(cachedLocation);
      dispatch(receiveHomeLocation(cachedLocation));
    }
    
    browserGeolocation.getCurrentPosition(
      (position) => {
        let coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }

        localStorage.setItem('canilivehere-geolocation', JSON.stringify(coords));
        dispatch(receiveHomeLocation(coords));
      },
      (err) => {
        dispatch(receiveHomeLocationError(err))
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
    dispatch(requestHomeLocation())
    return googleService.getCoordinatesFromAddress(addressText)
      .then((response) => {
        let coordinates = {
          latitude: response[0].geometry.location.lat(),
          longitude: response[0].geometry.location.lng() 
        }
        dispatch(receiveHomeLocation(coordinates))
        dispatch(fetchChipotleLocations())
      })
      .catch((err)  => {
        dispatch(receiveHomeLocationError(err))
      })
  }
}


