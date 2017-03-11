import { REQUEST_USER, RECEIVE_USER } from '../actions/UserActions'
import { REQUEST_LISTINGS, RECEIVE_LISTINGS } from '../actions/ListingActions'
import { REQUEST_LOGIN, RECEIVE_LOGIN, REQUEST_LOGOUT, RECEIVE_LOGOUT } from '../actions/LoginActions'
import { REQUEST_SITE_CONFIG, RECEIVE_SITE_CONFIG } from '../actions/SiteConfigActions'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

const defaultListing = {
  isFetching: false,
  items: []
}

const listings = (state=defaultListing, action) => {
  switch (action.type) {
    case REQUEST_LISTINGS:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_LISTINGS:
      return {
        ...state,
        isFetching: false,
        items: action.listings,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const defaultUser = {
  isFetching: true
}

const user = (state=defaultUser, action) => {
  switch (action.type) {
    case REQUEST_USER:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_USER:
      return {
        ...state,
        isFetching: false,
        email: action.user.email,
        isSeller: action.user.seller,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const defaultAuth = {
  isAuthenticated: false
}

const auth = (state=defaultAuth, action) => {
  switch (action.type) {
    case REQUEST_LOGIN:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        isFetching: false,
        lastUpdated: action.receivedAt
      }
    case REQUEST_LOGOUT:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        isFetching: false,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const defaultSiteConfig = {}

const siteConfig = (state=defaultSiteConfig, action) => {
  switch (action.type) {
    case REQUEST_SITE_CONFIG:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_SITE_CONFIG:
      return {
        ...action.siteConfig,
        isFetching: false,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user,
  listings,
  auth,
  siteConfig,
  routing
})

export default rootReducer