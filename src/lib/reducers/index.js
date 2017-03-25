import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import homeLocation from './HomeLocationReducer'
import chipotleLocations from './ChipotleLocationReducer'

const rootReducer = combineReducers({
  routing,
  homeLocation,
  chipotleLocations
})

export default rootReducer