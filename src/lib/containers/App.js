import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './Header'

import '../../stylesheets/main.scss'


class App extends Component {

  componentWillMount() {}

  render() {
    const children = this.props.children;
    return (
      <div className="wrapper-container">
        {children}
      </div>
    )
  }
}

export default connect()(App)