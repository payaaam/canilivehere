import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChipotleMap from '../components/ChipotleMap'
import { fetchGeolocation, fetchGeolocationAndSearch } from '../actions/LocationActions'
import { fetchChipotleLocations, fetchChipotleDistances } from '../actions/ChipotleLocationActions'
import { hideSearchModal, showSearchModal, hideDecisionModal, showDecisionModal } from '../actions/ModalActions'
import Loading from '../components/Loading'
import DecisionModal from '../components/DecisionModal'
import SearchModal from '../components/SearchModal'

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

  handleChipotleSearch(geoSearch) {
    let { dispatch } = this.props;
    if (geoSearch) {
      return dispatch(fetchGeolocation(true));
    }
    return dispatch(fetchChipotleLocations());
  }

  renderSearchModal() {
    let showSearchModal = this.props.showSearchModal;
    if (showSearchModal) {
      return (
        <SearchModal
          onSearch={this.handleChipotleSearch.bind(this)}
        />
      )
    }
  }

  renderDecisionModal() {
    let showDecisionModal = this.props.showDecisionModal;
    if (showDecisionModal) {
      return (
        <DecisionModal />
      )
    }
  }

  getDirections() {
    try {
      let { placeId, travelMode } = this.props.closestLocation;
      let closestChipotle = this.props.chipotleLocations.find(loc => placeId === loc.placeId);
      return closestChipotle.distance[travelMode].directions;
    } catch(e) {
      return undefined;
    }
  }



  renderMapView() {
    let { centerLocation,
      homeMarker,
      chipotleLocations,
      isFetchingChipotleLocations,
      loadingMessage
    } = this.props;

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
          isFetching={isFetchingChipotleLocations}
          loadingMessage={loadingMessage}
          directions={this.getDirections()}
        />

        { this.renderSearchModal() }
        { this.renderDecisionModal() }
      </div>
    )
  }

  render() {
    let { isFetchingLocation } = this.props;
    return (
      <div>
      { this.renderMapView() }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { homeLocation } = state;
  const { closestLocation } = state.chipotleLocations;
  const { showSearchModal, showDecisionModal } = state.modals
  const chipotleLocations = state.chipotleLocations.locations;
  const isFetchingChipotleLocations = state.chipotleLocations.isFetching;
  const loadingMessage = state.chipotleLocations.loadingMessage;
  const centerLocation = homeLocation.center;
  const isFetchingLocation = homeLocation.isFetching;
  const homeMarker = {
    position: centerLocation
  }


  return {
    centerLocation,
    chipotleLocations,
    isFetchingLocation,
    homeMarker,
    isFetchingChipotleLocations,
    loadingMessage,
    showSearchModal,
    showDecisionModal,
    closestLocation
  }
}

export default connect(mapStateToProps)(MapContainer)