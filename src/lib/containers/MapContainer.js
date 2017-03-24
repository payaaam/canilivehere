import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChipotleMap from '../components/ChipotleMap'
import { fetchGeolocation } from '../actions/LocationActions'
import Loading from '../components/Loading'
import LocationSearch from '../components/LocationSearch'

import '../../stylesheets/components/chipotle-map.scss'

class MapContainer extends Component {

  componentWillMount() {
    this.props.dispatch(fetchGeolocation());
  }

  componentDidMount() {
  }

  newHomeMarker(coords) {
    return {
      position: {
        lat: coords.lat,
        lng: coords.lng,
      },
      key: 'Home',
      defaultAnimation: 2,
    }
  }

  renderMapView() {
    let { centerLocation, markers } = this.props;

    return (
      <div className="map-container">
        <ChipotleMap  
          center={centerLocation}
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          markers={markers}
        />
        <LocationSearch />
      </div>
    )
  }

  render() {
    let { isFetchingLocation } = this.props;

    return (
      <div>
      { isFetchingLocation === true ? <Loading /> : this.renderMapView() }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const location = state.location;
  const centerLocation = location.center;
  const isFetchingLocation = location.isFetching;
  const markers = [location.marker];


  return {
    centerLocation,
    isFetchingLocation,
    markers
  }
}

export default connect(mapStateToProps)(MapContainer)