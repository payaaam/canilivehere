export const SHOW_SEARCH_MODAL = 'SHOW_SEARCH_MODAL'
export const HIDE_SEARCH_MODAL = 'HIDE_SEARCH_MODAL'
export const SHOW_DECISION_MODAL = 'SHOW_DECISION_MODAL'
export const HIDE_DECISION_MODAL = 'HIDE_DECISION_MODAL'

export function showSearchModal() {
  return {
    type: SHOW_SEARCH_MODAL,
    show: true
  }
}

export function hideSearchModal() {
  return {
    type: HIDE_SEARCH_MODAL,
    show: false
  }
}

export function showDecisionModal() {
  return {
    type: SHOW_DECISION_MODAL,
    show: true
  }
}

export function hideDecisionModal() {
  return {
    type: HIDE_DECISION_MODAL,
    show: false
  }
}