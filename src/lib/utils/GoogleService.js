const google = window.google;
import config from '../config'
const PLACES_BASE_URL ='https://maps.googleapis.com/maps/api/place/textsearch/json';

class GoogleService {

  constructor(googleMaps) {
    this.ready = false;
  }

  isGoogleMapsLoaded() {
    if (this.ready === true) {
      return true;
    }

    if (google && google.maps) {
      this.googleMaps = google.maps;
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

      let geocoder = new this.googleMaps.Geocoder;

      geocoder.geocode({address: addressText}, (results, status) => {
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
  getChipotleLocations(currentLocation, googleMapReference) {
    return new Promise((resolve,reject) => {
      if (!this.isGoogleMapsLoaded()) {
        return reject(new Error('Library not loaded yet'));
      }

      //let placesService = new this.googleMaps.places.PlacesService(googleMapReference);
      let { lat, lng }  = currentLocation;
      //let placesApiSearch = `${PLACES_BASE_URL}?query=chipotle&location=${lat},${lng}&key=${config.googleMapsApiKey}`

      let requestOptions = {
        query: 'Chipotle',
        location: new this.googleMaps.LatLng(lat, lng),
        rankBy: this.googleMaps.places.RankBy.DISTANCE
      }

      let tempResult = JSON.parse(localStorage.getItem('google-response'));
      return resolve(tempResult);

      /*
      placesService.textSearch(requestOptions, (results, status) => {
        if (status !== 'OK') {
          return reject(new Error('Some google error'));
        }
        return resolve(results);
      });
      */
    });
  }
}

export default GoogleService