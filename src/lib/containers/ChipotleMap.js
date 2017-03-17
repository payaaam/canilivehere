import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withGoogleMap, GoogleMap } from "react-google-maps";
import '../../stylesheets/components/chipotle-map.scss'

const SimpleMapExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  />
));

class ChipotleMap extends Component {

  componentDidMount() {}

  render() {
    return (
      <div className="map-container">
        <SimpleMapExampleGoogleMap
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
        />
        <div className="floating-div"></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps)(ChipotleMap)