import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChipotleMap from '../components/ChipotleMap'
import { fetchGeolocation } from '../actions/LocationActions'
import { fetchChipotleLocations, fetchChipotleDistances } from '../actions/ChipotleLocationActions'
import Loading from '../components/Loading'
import LocationSearch from '../components/LocationSearch'

import '../../stylesheets/components/chipotle-map.scss'

class MapContainer extends Component {

  state = {
    bounds: null
  }

  componentWillMount() {
    this.props.dispatch(fetchGeolocation());
  }

  // Store Map Reference
  getMapReference(map) {
    this._googleMapsObject = map;
  }

  handleBoundsChanged() {
    this.setState({
      bounds: this._googleMapsObject.getBounds(),
      center: this._googleMapsObject.getCenter(),
    });
  }

  handleChipotleSearch() {
    this.props.dispatch(fetchChipotleLocations());
  }

  handleChipotleDistanceClick() {
    this.props.dispatch(fetchChipotleDistances('walking'));
    this.props.dispatch(fetchChipotleDistances('driving'));
  }

  renderMapView() {
    let { centerLocation, homeMarker, chipotleLocations } = this.props;

    return (
      <div className="map-container">
        <ChipotleMap 
          onMapLoad={this.getMapReference.bind(this)}
          onBoundsChanged={this.handleBoundsChanged.bind(this)}
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
          onDistanceSearch={this.handleChipotleDistanceClick.bind(this)}
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