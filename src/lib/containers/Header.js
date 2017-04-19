import React, { Component } from 'react'
import '../../stylesheets/components/header.scss'

class Header extends Component {

  componentDidMount() {}

  render() {
    return (
      <header className="header-container">
        <div className="header-row">
          <div className="chipotle-logo"></div>
          <span>Can I Live Here?</span>
        </div>
      </header>
    )
  }
}

export default Header