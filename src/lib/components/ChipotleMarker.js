import React, { Component } from 'react'
import { Marker } from "react-google-maps";
const google = window.google;

class ChipotleMarker extends Component {

  state = {
    defaultAnimation: 2,
    
    icon: {
      url: '/images/chipotle-marker.png',
      size: new google.maps.Size(33, 50),
      scaledSize: new google.maps.Size(33, 50)
    }
  }

  render() {
    const { placeId, location } = this.props.config;
    const { defaultAnimation, icon } = this.state;
    return (
      <Marker 
        position={location}
        key={placeId}
        defaultAnimation={defaultAnimation}
        icon={icon}
      />
    )
  }
}

export default ChipotleMarker