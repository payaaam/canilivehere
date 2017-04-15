import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import HomeMarker from './HomeMarker';
import ChipotleMarker from './ChipotleMarker';
import Loading from './Loading'
import chipotleStyle from "../utils/MapStyle";

// Helper function to display all of the chipotle locations
const displayChipotleMarkers = (props) => {
  return props.chipotleMarkers.map((loc) => {
    if (loc.show === true) {
      return <ChipotleMarker config={loc}/>
    }
  });
}

const generateDefaultOptions = (props) => {
  return {
    styles: chipotleStyle,
    mapTypeControl: props.showMapControls || false
  }
}

// Helper function to display the home marker
const displayHomeMarker = (props) => {
  let { position } = props.homeMarker;
  return <HomeMarker position={position} />
}

const displayLoadingIcon = (props) => {
  let { isFetching, loadingMessage } = props;
  return ( isFetching ? <Loading message={loadingMessage} /> : false )
}

// Generates a Google Map Object
const ChipotleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={14}
    onBoundsChanged={props.onBoundsChanged}
    center={props.center}
    defaultOptions={generateDefaultOptions(props)}>
    {displayHomeMarker(props)}
    {displayChipotleMarkers(props)}
    {displayLoadingIcon(props)}

  </GoogleMap>
));

export default ChipotleMap