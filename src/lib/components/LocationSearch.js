import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUserLocation } from '../actions/LocationActions'
import '../../stylesheets/components/location-selector.scss'

class LocationSearch extends Component {

  state = {
    currentInputValue: '',
    recentSearches: []
  }

  componentWillMount() {}

  componentDidMount() {}

  onSubmit(evt) {
    evt.preventDefault();
    let currentSearchText = this.state.currentInputValue;
    this.state.recentSearches.push(currentSearchText);
    this.props.dispatch(fetchUserLocation(currentSearchText))
  }

  handleInputChange(evt) {
    this.setState({
      currentInputValue: evt.target.value 
    });
  }

  render() {
    return (
      <div className="location-box">
        <div className="site-title">
          Can I Live Here?
        </div>
        <form onSubmit={this.onSubmit.bind(this)} className="location-input-container">
          <input type="text" onChange={this.handleInputChange.bind(this)} className="location-input"></input>
          <input type="submit" className="search-button"/>
        </form>
      </div>
    )
  }
}

export default connect()(LocationSearch)