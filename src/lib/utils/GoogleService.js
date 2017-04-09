import _ from 'lodash'
import config from '../config'
const google = window.google;
const TRAVEL_MODE_MAP = {
  'walking': 'WALKING',
  'driving': 'DRIVING'
}

class GoogleService {

  constructor(googleMaps) {
    this.ready = false;
  }

  generateMapReference() {
   return new google.maps.Map(document.getElementById(config.tempMapId), {
      zoom: 8
    });
  }

  isGoogleMapsLoaded() {
    if (this.ready === true) {
      return true;
    }

    if (google && google.maps) {
      this.googleMaps = google.maps;
      this.mapReference = this.generateMapReference();
      this.geocodeService = new this.googleMaps.Geocoder;
      this.placesService = new this.googleMaps.places.PlacesService(this.mapReference);
      this.distanceService = new google.maps.DistanceMatrixService();
      this.ready = true;
      return true;
    }
    return false;
  }

  /**
   * [getCoordinatesFromAddress description]
   * @param  {[type]} addressText [description]
   * @return {[type]}             [description]
   */
  getCoordinatesFromAddress(addressText) {
    return new Promise((resolve,reject) => {

      if (!this.isGoogleMapsLoaded()) {
        return reject(new Error('Library not loaded yet'));
      }

      this.geocodeService.geocode({address: addressText}, (results, status) => {
        if (status !== 'OK') {
          return reject(new Error('Some google error'));
        }
        return resolve(results);
      });
    });
  }

  /**
   * [getChipotleLocations description]
   * @param  {[type]} currentLocation [description]
   * @return {[type]}                 [description]
   */
  getChipotleLocations(currentLocation) {
    return new Promise((resolve,reject) => {
      if (!this.isGoogleMapsLoaded()) {
        return reject(new Error('Library not loaded yet'));
      }

      let { lat, lng }  = currentLocation;
      let requestOptions = {
        query: 'Chipotle',
        location: new this.googleMaps.LatLng(lat, lng),
        rankBy: this.googleMaps.places.RankBy.DISTANCE
      }
      
      this.placesService.textSearch(requestOptions, (results, status) => {
        if (status !== 'OK') {
          return reject(new Error('Some google error'));
        }
        return resolve(results);
      });
    });
  }

  /**
   * This function hits the matrix map API to get walking / driving distance
   * to the closest chipotle location
   * @param  {[type]} currentLocation [description]
   * @return {[type]}                 [description]
   */
  getClosestChipotleDistance(currentLocation, chipotleLocations, travelMode) {
    return new Promise((resolve,reject) => {
      if (!this.isGoogleMapsLoaded()) {
        return reject(new Error('Library not loaded yet'));
      }
  
      let { lat, lng }  = currentLocation;
      let currentOrigin = new this.googleMaps.LatLng(lat, lng);
      let destinationLocations = chipotleLocations.map(chipotle => chipotle.address);
      /*
      let destinationLocations = chipotleLocations.map((chipotle) => {
        return {
          placeId: chipotle.placeId
        }
      });
      */

      let distanceOptions = {
        origins: [currentOrigin],
        destinations: destinationLocations,
        travelMode: TRAVEL_MODE_MAP[travelMode],
        unitSystem: this.googleMaps.UnitSystem.IMPERIAL
      }
      
      this.distanceService.getDistanceMatrix(distanceOptions, (results, status) => {
        if (status !== 'OK') {
          return reject(new Error('Some google error'));
        }
        return resolve(results);
      });
    });
  }
}

export default GoogleService