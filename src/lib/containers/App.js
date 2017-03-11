import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUserIfNeeded } from '../actions/UserActions'
import { fetchSiteConfigIfNeeded } from '../actions/SiteConfigActions'
import { fetchLogout } from '../actions/LoginActions'
import Header from './Header'
import Footer from './Footer'

import '../../stylesheets/main.scss'


class App extends Component {

  componentWillMount() {
    this.props.dispatch(fetchSiteConfigIfNeeded())
    this.props.dispatch(fetchUserIfNeeded())
  }

  logoutHandler() {
    this.props.dispatch(fetchLogout())
  }

  render() {
    const children = this.props.children;
    return (
      <div className="wrapper-container">
        <Header logoutHandler={this.logoutHandler.bind(this)}/>
        <main className="main-container">
          {children}
        </main>
        <Footer />
      </div>
    )
  }
}

export default connect()(App)