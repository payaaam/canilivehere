import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const ChipotleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={14}
    center={props.center} >
    {props.markers.map(marker => (
        <Marker
          {...marker}
        />
    ))}
  </GoogleMap>
));

export default ChipotleMap