import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../../stylesheets/components/home-page.scss'

class Home extends Component {

  componentDidMount() {}

  render() {

    return (
      <div className="home-container">
        <section className="home-row">
          Main Section
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps)(Home)