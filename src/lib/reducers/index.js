import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import homeLocation from './HomeLocationReducer'
import chipotleLocations from './ChipotleLocationReducer'
import modals from './ModalReducer'

const rootReducer = combineReducers({
  routing,
  homeLocation,
  chipotleLocations,
  modals
})

export default rootReducer