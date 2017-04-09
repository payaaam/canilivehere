import GoogleService from '../utils/GoogleService';
const googleService = new GoogleService();

export const REQUEST_CHIPOTLE_LOCATIONS = 'REQUEST_CHIPOTLE_LOCATIONS'
export const RECEIVE_CHIPOTLE_LOCATIONS = 'RECEIVE_CHIPOTLE_LOCATIONS'
export const RECEIVE_CHIPOTLE_LOCATIONS_ERROR = 'RECEIVE_CHIPOTLE_LOCATIONS_ERROR'

export function requestChipotleLocations() {
  return {
    type: REQUEST_CHIPOTLE_LOCATIONS
  }
}

export function receiveChipotleLocations(locations) {
  return {
    type: RECEIVE_CHIPOTLE_LOCATIONS,
    locations
  }
}

export function receiveChipotleLocationsError(err) {
  return {
    type: RECEIVE_CHIPOTLE_LOCATIONS_ERROR,
    err: err
  }
}


export const REQUEST_CHIPOTLE_DISTANCES = 'REQUEST_CHIPOTLE_DISTANCES';
export const RECEIVE_CHIPOTLE_DISTANCES = 'RECEIVE_CHIPOTLE_DISTANCES';
export const RECEIVE_CHIPOTLE_DISTANCES_ERROR = 'RECEIVE_CHIPOTLE_DISTANCES_ERROR';

export function requestChipotleDistances() {
  return {
    type: REQUEST_CHIPOTLE_DISTANCES
  }
}

export function receiveChipotleDistances(response) {
  return {
    type: RECEIVE_CHIPOTLE_DISTANCES,
    response
  }
}

export function receiveChipotleDistancesError(err) {
  return {
    type: RECEIVE_CHIPOTLE_DISTANCES_ERROR,
    err: err
  }
}

/**
 * This function takes address string and gets its coordinates (lat, lng)
 * from Google. 
 * 
 * @param  {Object} currentLocation An object containing {lat:10, lng: 10}
 */
export function fetchChipotleLocations() {
  return (dispatch, getState) => {
    let { homeLocation } = getState();

    dispatch(requestChipotleLocations())
    return googleService.getChipotleLocations(homeLocation.center)
      .then((response) => {
        let counter = 0;
        let locations = response.map((chipotleLocation) => {
          return {
            rankByDistancelocation: counter++,
            location: chipotleLocation.geometry.location,
            id: chipotleLocation.id,
            placeId: chipotleLocation.place_id,
            address: chipotleLocation.formatted_address.replace('United States','USA'),
          }
        });
        
        return dispatch(receiveChipotleLocations(locations))
      })
      .catch((err)  => {
        dispatch(receiveChipotleLocationsError(err))
      })
  }
}

/**
 * This function takes address string and gets its coordinates (lat, lng)
 * from Google. 
 * 
 * @param  {Object} currentLocation An object containing {lat:10, lng: 10}
 */
export function fetchChipotleDistances(travelMode) {
  return (dispatch, getState) => {
    let { homeLocation, chipotleLocations } = getState();

    dispatch(requestChipotleDistances())
    return googleService.getClosestChipotleDistance(homeLocation.center, chipotleLocations.locations, travelMode)
      .then((response) => {
        let distanceResults = response.rows[0].elements;

        let distanceResponse = {};
        distanceResults.forEach((dist, index) => {
          let placeId = response.destinationAddresses[index];
          distanceResponse[placeId] = {
            distance: dist.distance.text,
            duration: dist.duration.text
          }
        });

        let actionResponse = {
          distances: distanceResponse,
          travelMode
        };

        return dispatch(receiveChipotleDistances(actionResponse));
      })
      .catch((err)  => {
        debugger;
        dispatch(receiveChipotleDistancesError(err))
      })
  }
}