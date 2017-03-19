import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../../stylesheets/components/location-selector.scss'

class LocationSelect extends Component {

  componentWillMount() {}

  render() {
    const children = this.props.children;
    return (
      <div className="location-box">
        <div className="site-title">
          Can I Live Here?
        </div>
        <div className="location-input">
          <input placeholder="Current Location?"></input>
        </div>
      </div>
    )
  }
}

export default connect()(LocationSelect)