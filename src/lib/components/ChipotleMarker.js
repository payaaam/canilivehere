import React, { Component } from 'react'
import { Marker } from "react-google-maps";
const google = window.google;

class ChipotleMarker extends Component {

  state = {
    defaultAnimation: 2,
    icon: {
      url: '/images/chipotle.png',
      size: new google.maps.Size(60, 60),
      scaledSize: new google.maps.Size(30, 30)
    }
  }

  render() {
    const { position, key } = this.props;
    const { defaultAnimation, icon } = this.state;
    return (
      <Marker 
        position={position}
        key={key}
        defaultAnimation={defaultAnimation}
        icon={icon}
      />
    )
  }
}

export default ChipotleMarker