import React, { Component } from 'react'
import { Link } from 'react-router'

class Watch extends Component {


  viewMoreDetails() {
    console.log('click')
  }

  render() {
    let watch = this.props.watch

    return (
      <Link className="watch" to={"listing/" + watch.id} onClick={this.viewMoreDetails}>
        <div className="info"><span>{watch.brand} {watch.series}</span></div>
        <div className="picture"></div>
        <div className="price">${watch.price}</div>
      </Link>
    )
  }
}

export default Watch