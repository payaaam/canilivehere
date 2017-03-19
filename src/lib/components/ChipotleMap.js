import React, { Component } from 'react'
import { withGoogleMap, GoogleMap } from "react-google-maps";

const ChipotleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={14}
    center={props.center}
  />
));

export default ChipotleMap