export const DEFAULT_ACTION = 'SELECT_LISTING'

export function defaultAction(actionId) {
  return {
    type: DEFAULT_ACTION,
    actionId
  }
}