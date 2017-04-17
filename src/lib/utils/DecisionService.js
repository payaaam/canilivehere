import _ from 'lodash'
import config from '../config'

const minimumTime = config.minTime;
const ERROR_NUMBER = 1000000;

class DecisionService {

  isWithinTimeRange(durationObject) {
    if (durationObject === undefined) {
      return false;
    }

    let travelTime = this.getTravelTime(durationObject.travelDuration);

    return travelTime <= minimumTime;
  }


  getTravelTime(durationString) {
    if (!durationString.includes(' mins')) {
      return ERROR_NUMBER;
    }

    let duration =  durationString.replace(' mins', '');
    try {
      duration = parseInt(duration);
    } catch(e) {
      return ERROR_NUMBER
    }
    return duration;
  }

  process(chipotleLocations) {
    return new Promise((resolve, reject) => {
      chipotleLocations.some((loc) => {
        let walking = _.get(loc, 'distance.walking');
        let driving = _.get(loc, 'distance.driving');

        if (this.isWithinTimeRange(walking)) {
          resolve({
            placeId: loc.placeId,
            travelMode: 'walking'
          });
          return true;
        }

        if (this.isWithinTimeRange(driving)) {
          resolve({
            placeId: loc.placeId,
            travelMode: 'driving'
          });
          return true;
        }
      });

      reject(new Error('No locations within range'));
      return true;
    });
  }
}

export default DecisionService