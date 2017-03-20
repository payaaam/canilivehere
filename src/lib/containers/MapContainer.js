import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChipotleMap from '../components/ChipotleMap'
import { fetchGeolocation } from '../actions/LocationActions'
import Loading from '../components/Loading'
import LocationSelect from '../components/LocationSelect'
import '../../stylesheets/components/chipotle-map.scss'


class MapContainer extends Component {

  componentWillMount() {
    this.props.dispatch(fetchGeolocation())
  }

  componentDidMount() {}

  renderMapView() {
    let { centerLocation } = this.props;

    return (
      <div className="map-container">
        <ChipotleMap  
          center={centerLocation}
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
        />
        <LocationSelect />
      </div>
    )
  }

  render() {
    let { isFetchingLocation } = this.props;
    return (
      <div>
      { isFetchingLocation === true ? <Loading /> : this.renderMapView() }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const location = state.location;
  const centerLocation = location.center;
  const isFetchingLocation = location.isFetching;

  return {
    centerLocation,
    isFetchingLocation
  }
}

export default connect(mapStateToProps)(MapContainer)