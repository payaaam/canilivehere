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
    let title, message;
    let { isHabitable, travelDuration, travelMode } = this.props;

    if (isHabitable) {
      title = 'Sign the lease!';
      message = `You live ${travelDuration} ${travelMode} from a Chipotle!`
    } else {
      title = 'Do not live here!';
      message = 'There are 0 Chipotles within 10 minutes walking or driving.'
    }


    // The UN says being within 10 minutes driving or 
    // walking of a Chipotle is a basic human right, much like the water and free speech.
    return (
      <div className="decision-modal-container">
        <div className="decision-modal">
          <div className="decision-title">{title}</div>
          <div className="decision-message">
            {message}
          </div>
          <button className="reset-button" onClick={this.searchAgain.bind(this)}>Try again</button>
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => {
  let { placeId, travelMode } = state.chipotleLocations.closestLocation;
  let isHabitable = placeId !== undefined ? true : false;

  let location, travelDuration;
  if (isHabitable) {
    location = state.chipotleLocations.locations.find(loc => loc.placeId === placeId);
    travelDuration = location.distance[travelMode].travelDuration;
  }

  return {
    placeId,
    isHabitable,
    travelMode,
    travelDuration
  }
}

export default connect(mapStateToProps)(DecisionModal)