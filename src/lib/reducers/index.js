import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import location from './LocationReducer'

const rootReducer = combineReducers({
  routing,
  location
})

export default rootReducer