import React, { Component } from 'react'
import { Marker } from "react-google-maps";
const google = window.google;

class HomeMarker extends Component {

  state = {
    key: 'home',
    defaultAnimation: 2,
    icon: {
      //url: '/images/home-icon.png',
      url: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
      size: new google.maps.Size(60, 60),
      scaledSize: new google.maps.Size(30, 30)
    }
  }

  render() {
    const homePosition = this.props.position;
    const { key, defaultAnimation, icon } = this.state;
    return (
      <Marker 
        position={homePosition}
        key={key}
        defaultAnimation={defaultAnimation}
        icon={icon}
      />
    )
  }
}

export default HomeMarker