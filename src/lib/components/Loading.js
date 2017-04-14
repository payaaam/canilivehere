import React from 'react'
import '../../stylesheets/components/loading.scss'

export default function Loading(props) {
  return (
    <div className="loading-container">
      <div>
        <div className="loading-text">{props.message}</div>
        <div className="chipotle-logo-loading"></div>
      </div>
    </div>
  )
}