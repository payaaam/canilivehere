import React, { Component } from 'react'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'
import Search from '../components/Search'
import '../../stylesheets/components/header.scss'

class Header extends Component {

  componentDidMount() {}

  handleSearch(event) {
    let userSearch = event.target.value;
    let nextPage = '/'
    if (userSearch !== '') {
      nextPage += `?search=${event.target.value}`
    }
    browserHistory.push(nextPage)
  }

  render() {

    let logoutHandler = this.props.logoutHandler
    return (
      <header className="header-container">
        <div className="header-row">
            <Link to="/" className="logo link">Watch Site</Link>
            <div className="search">
              <Search handler={this.handleSearch} />
            </div>
            <div className="navigation">
              <Link className="link" to="/faq">FAQ</Link>
              <Link className="link" to="/account">Account</Link>
              <a className="link" onClick={logoutHandler}>Logout</a>
            </div>
          </div>
      </header>
    )
  }
}

export default Header