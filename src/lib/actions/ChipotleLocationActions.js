import GoogleService from '../utils/GoogleService';
import config from '../config';
const googleService = new GoogleService();
const NUMBER_OF_LOCATIONS = config.numberOfLocations;


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
        let locations = response.slice(0, NUMBER_OF_LOCATIONS).map((chipotleLocation) => {
          return {
            rankByDistancelocation: counter++,
            location: chipotleLocation.geometry.location,
            id: chipotleLocation.id,
            placeId: chipotleLocation.place_id,
            address: chipotleLocation.formatted_address.replace('United States','USA')
          }
        });

        dispatch(receiveChipotleLocations(locations));
        dispatch(fetchChipotleDistances(locations, 'walking'));
        //dispatch(fetchChipotleDistances(locations, 'driving'));
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
export function fetchChipotleDistances(locations, travelMode) {
  return (dispatch, getState) => {
    let { homeLocation } = getState();

    let placeIdArray = locations.map((chipotle) => {
      return {
        placeId: chipotle.placeId
      }
    });

    dispatch(requestChipotleDistances())
    return googleService.getChipotleDirections(homeLocation.center, placeIdArray, travelMode)
      .then((response) => {

        let distanceResponse = {};
        response.forEach((dirObject) => {
          let placeId = dirObject.request.destination.placeId;
          let dist = response[0].routes[0].legs[0];

          distanceResponse[placeId] = {
            distance: dist.distance.text,
            duration: dist.duration.text,
            directions: dirObject
          };
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