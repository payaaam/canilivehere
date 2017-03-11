import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import routes from '../routes'
//import DevTools from './DevTools'
import { Router } from 'react-router'

function Root({store, history}) {
  return (
    <Provider store={store}>
      <div>
        <Router history={history} routes={routes} />
        {/*<DevTools />*/}
      </div>
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default Root
