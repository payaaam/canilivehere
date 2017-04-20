import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUserLocation } from '../actions/LocationActions'
import { fetchChipotleLocations } from '../actions/ChipotleLocationActions'
import '../../stylesheets/components/search-modal.scss'

class SearchModal extends Component {

  state = {
    currentInputValue: '',
    recentSearches: []
  }

  componentWillMount() {}

  componentDidMount() {}

  onSubmit(evt) {
    evt.preventDefault();
    let currentSearchText = this.state.currentInputValue;
    if (currentSearchText === '') {
      this.props.onSearch(true)
      return;
    }
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
    <div className="search-modal-container">
      <div className="search-modal">
        <div className="modal-title">
          Can I Live Here?
        </div>
        <div className="modal-message">
           Enter an address to see if it's habitable.
        </div>
        <form onSubmit={this.onSubmit.bind(this)} className="search-form">
          <input type="text" onChange={this.handleInputChange.bind(this)} className="search-input" placeholder="Current Location"></input>
          <input type="submit" className="search-button" value="TELL ME!"/>
        </form>
      </div>
    </div>
    )
  }
}

export default connect()(SearchModal)