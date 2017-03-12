import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import Footer from './Footer'

import '../../stylesheets/main.scss'


class App extends Component {

  componentWillMount() {}

  render() {
    const children = this.props.children;
    return (
      <div className="wrapper-container">
        <Header />
        <main className="main-container">
          {children}
        </main>
        <Footer />
      </div>
    )
  }
}

export default connect()(App)