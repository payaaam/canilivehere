import React from 'react'
import { Route } from 'react-router'
import Home from './containers/Home'
import App from './containers/App'

const Routes = (
  <Route path="" component={App} >
    <Route path="/" component={Home} />
  </Route>
);

export default Routes
