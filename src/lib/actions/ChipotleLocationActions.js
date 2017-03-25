import GoogleService from '../utils/GoogleService';
const googleService = new GoogleService();

export const REQUEST_CHIPOTLE_LOCATION = 'REQUEST_CHIPOTLE_LOCATION'
export const RECEIVE_CHIPOTLE_LOCATION = 'RECEIVE_CHIPOTLE_LOCATION'
export const RECEIVE_CHIPOTLE_LOCATION_ERROR = 'RECEIVE_CHIPOTLE_LOCATION_ERROR'

export function requestChipotleLocations() {
  return {
    type: REQUEST_CHIPOTLE_LOCATION
  }
}

export function receiveChipotleLocation(locations) {
  return {
    type: RECEIVE_CHIPOTLE_LOCATION,
    locations
  }
}

export function receiveChipotleLocationError(err) {
  return {
    type: RECEIVE_CHIPOTLE_LOCATION_ERROR,
    err: err
  }
}

/**
 * This function takes address string and gets its coordinates (lat, lng)
 * from Google. 
 * 
 * @param  {Object} currentLocation An object containing {lat:10, lng: 10}
 */
export function fetchChipotleLocations(googleMapReference) {
  return (dispatch, getState) => {
    let { homeLocation } = getState();

    dispatch(requestChipotleLocations())
    return googleService.getChipotleLocations(homeLocation.center, googleMapReference)
      .then((response) => {
        let counter = 0;
        let locations = response.map((chipotleLocation) => {
          return {
            rankByDistancelocation: counter++,
            location: chipotleLocation.geometry.location,
            id: chipotleLocation.id,
            placeId: chipotleLocation.place_id,
            address: chipotleLocation.formatted_address,
          }
        });
        
        return dispatch(receiveChipotleLocation(locations))
      })
      .catch((err)  => {
        dispatch(receiveChipotleLocationError(err))
      })
  }
}