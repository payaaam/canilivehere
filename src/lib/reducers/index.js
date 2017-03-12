import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

const defaultReducer = (state={}, action) => {
  return state
}

const rootReducer = combineReducers({
  defaultReducer,
  routing
})

export default rootReducer