import React from 'react'
import { Route } from 'react-router'
import Home from './containers/Home'
import Accounts from './containers/Accounts'
import Sell from './containers/Sell'
import Listing from './containers/Listing'
import Login from './containers/Login'
import Checkout from './containers/Checkout'
import App from './containers/App'

const Routes = (
  <Route path="" component={App} >
    <Route path="/" component={Home} />
    <Route path="/listing/:id" component={Listing} />
    <Route path="/account" component={Accounts} />
    <Route path="/checkout" component={Checkout} />
    <Route path="/login" component={Login} />
    <Route path="/sell" component={Sell} />
  </Route>
);

export default Routes
