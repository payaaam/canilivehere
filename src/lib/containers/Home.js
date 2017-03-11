import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../../stylesheets/components/home-page.scss'
import Watch from '../components/Watch'
import { fetchListingsIfNeeded } from '../actions/ListingActions'

class Home extends Component {

  componentDidMount() {
    this.props.dispatch(fetchListingsIfNeeded())
  }

  render() {
    const watches = this.props.watches

    return (
      <div className="watch-container">
        <section className="watch-row">
        {watches.map((watch)=> <Watch key={watch.id} watch={watch}/>)}
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { listings } = state
  const watches = listings.items
  const isFetching = listings.isFetching

  return {
    watches,
    isFetching,
  }
}

export default connect(mapStateToProps)(Home)