import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import HomeMarker from './HomeMarker';
import ChipotleMarker from './ChipotleMarker';

// Helper function to display all of the chipotle locations
const displayChipotleMarkers = (props) => {
  return props.chipotleMarkers.map((loc) => {
    return <ChipotleMarker position={loc.location} />
  });
}

// Helper function to display the home marker
const dispalyHomeMarker = (props) => {
  let { position } = props.homeMarker;
  return <HomeMarker position={position} />
}

// Generates a Google Map Object
const ChipotleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={14}
    center={props.center}>
    {dispalyHomeMarker(props)}
    {displayChipotleMarkers(props)}

  </GoogleMap>
));

export default ChipotleMap