import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChipotleMap from '../components/ChipotleMap'
import { fetchGeolocation } from '../actions/LocationActions'
import { fetchChipotleLocations } from '../actions/ChipotleLocationActions'
import Loading from '../components/Loading'
import LocationSearch from '../components/LocationSearch'

import '../../stylesheets/components/chipotle-map.scss'

class MapContainer extends Component {

  componentWillMount() {
    this.props.dispatch(fetchGeolocation());
  }

  // Store Map Reference
  getMapReference(map) {
    if (map) {
      this.googleMapsObject = map.getDiv();  
    } 
  }

  handleChipotleSearch() {
    this.props.dispatch(fetchChipotleLocations(this.googleMapsObject));
  }

  renderMapView() {
    let { centerLocation, homeMarker, chipotleLocations } = this.props;

    return (
      <div className="map-container">
        <ChipotleMap 
          onMapLoad={this.getMapReference.bind(this)}
          center={centerLocation}
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          homeMarker={homeMarker}
          chipotleMarkers={chipotleLocations}
        />
        <LocationSearch 
          onSearch={this.handleChipotleSearch.bind(this)}
        />
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
  const { homeLocation } = state;
  const chipotleLocations = state.chipotleLocations.locations;
  const centerLocation = homeLocation.center;
  const isFetchingLocation = homeLocation.isFetching;
  const homeMarker = {
    position: centerLocation
  }

  return {
    centerLocation,
    chipotleLocations,
    isFetchingLocation,
    homeMarker
  }
}

export default connect(mapStateToProps)(MapContainer)