import { 
  SHOW_SEARCH_MODAL,
  HIDE_SEARCH_MODAL,
  SHOW_DECISION_MODAL,
  HIDE_DECISION_MODAL
} from '../actions/ModalActions'

const defaultModalState = {
  showSearchModal: true,
  showDecisionModal: false
}

const modals = (state=defaultModalState, action) => {
  switch (action.type) {
    case SHOW_SEARCH_MODAL:
      return {
        showSearchModal: true,
        showDecisionModal: false
      }
    case HIDE_SEARCH_MODAL:
      return {
        showSearchModal: false,
        showDecisionModal: false
      }
    case SHOW_DECISION_MODAL:
      return {
        showSearchModal: false,
        showDecisionModal: true
      }
    case HIDE_DECISION_MODAL:
      return {
        showSearchModal: false,
        showDecisionModal: false
      }
    default:
      return state
  }
}

export default modals