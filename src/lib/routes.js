import React from 'react'
import { Route } from 'react-router'
import MapContainer from './containers/MapContainer'
import App from './containers/App'

const Routes = (
  <Route path="" component={App} >
    <Route path="/" component={MapContainer} />
  </Route>
);

export default Routes
