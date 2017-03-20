const google = window.google;

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
      this.geocoder = new google.maps.Geocoder;
      this.ready = true;
      return true;
    }
    return false;
  }

  getCoordinatesFromAddress(addressText) {
    return new Promise((resolve,reject) => {

      if (!this.isGoogleMapsLoaded()) {
        return reject(new Error('Library not loaded yet'));
      }

      this.geocoder.geocode({address: addressText}, (results, status) => {
        if (status !== 'OK') {
          return reject(new Error('Some google error'));
        }
        return resolve(results);
      });
    });
  }
}

export default GoogleService