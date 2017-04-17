import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showSearchModal } from '../actions/ModalActions'
import '../../stylesheets/components/decision-modal.scss'

class DecisionModal extends Component {

  state = {
    currentInputValue: '',
    recentSearches: []
  }

  componentWillMount() {}

  componentDidMount() {}

  searchAgain() {
    this.props.dispatch(showSearchModal())
  }

  handleInputChange(evt) {
    this.setState({
      currentInputValue: evt.target.value 
    });
  }

  render() {

    // The UN says being within 10 minutes driving or 
    // walking of a Chipotle is a basic human right, much like the water and free speech.
    return (
      <div className="decision-modal-container">
        <div className="decision-modal">
          <div className="decision-title">DO NOT LIVE HERE!</div>
          <div className="decision-message">
            There are 0 Chipotles within 10 minutes walking or driving.
          </div>
          <button className="reset-button" onClick={this.searchAgain.bind(this)}>Try again</button>
      </div>
    </div>
    )
  }
}

export default connect()(DecisionModal)