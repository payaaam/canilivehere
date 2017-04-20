import GoogleService from '../utils/GoogleService';
import DecisionService from '../utils/DecisionService';
import config from '../config';
import { 
  hideSearchModal,
  showDecisionModal 
} from '../actions/ModalActions';
const googleService = new GoogleService();
const decisionService = new DecisionService();
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


export const REQUEST_LIVING_DECISION = 'REQUEST_LIVING_DECISION';
export const RECEIVE_LIVING_DECISION = 'RECEIVE_LIVING_DECISION';
export const RECEIVE_LIVING_DECISION_ERROR = 'RECEIVE_LIVING_DECISION_ERROR';

export function requestLivingDecision() {
  return {
    type: REQUEST_LIVING_DECISION
  }
}

export function receiveLivingDecision(response) {
  return {
    type: RECEIVE_LIVING_DECISION,
    response
  }
}

export function receiveLivingDecisionError(err) {
  return {
    type: RECEIVE_LIVING_DECISION_ERROR,
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

    dispatch(hideSearchModal());
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
        dispatch(fetchChipotleDistances(locations, 'driving'));
      })
      .catch((err)  => {
        dispatch(receiveChipotleLocationsError(err));
        dispatch(determineLivingDecision())
      });
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
          let dist = dirObject.routes[0].legs[0];

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


        dispatch(receiveChipotleDistances(actionResponse));
        dispatch(determineLivingDecision())
      })
      .catch((err)  => {
        dispatch(showDecisionModal())
        dispatch(receiveChipotleDistancesError(err))
      })
  }
}

/**
 * This function takes address string and gets its coordinates (lat, lng)
 * from Google. 
 * 
 * @param  {Object} currentLocation An object containing {lat:10, lng: 10}
 */
export function determineLivingDecision() {
  return (dispatch, getState) => {
    let { chipotleLocations } = getState();
    
    dispatch(requestLivingDecision())
    return decisionService.process(chipotleLocations.locations)
      .then((response) => {
        setTimeout(() => {
          dispatch(receiveLivingDecision(response))
          dispatch(showDecisionModal());
        }, 2000);
      })
      .catch((err) => {
        setTimeout(() => {
          dispatch(receiveLivingDecisionError(err))
          dispatch(showDecisionModal());
        }, 2000);
      });
  }
}