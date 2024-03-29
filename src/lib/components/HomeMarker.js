import React, { Component } from 'react'
import { Marker } from "react-google-maps";
const google = window.google;

class HomeMarker extends Component {

  state = {
    key: 'home',
    defaultAnimation: null,
    icon: {
      url: '/images/home-icon.png',
      size: new google.maps.Size(60, 60),
      scaledSize: new google.maps.Size(30, 30),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(15, 15)
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