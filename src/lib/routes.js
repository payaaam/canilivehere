import React from 'react'
import { Route } from 'react-router'
import ChipotleMap from './containers/ChipotleMap'
import App from './containers/App'

const Routes = (
  <Route path="" component={App} >
    <Route path="/" component={ChipotleMap} />
  </Route>
);

export default Routes
