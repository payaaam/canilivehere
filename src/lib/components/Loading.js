import React from 'react'
import '../../stylesheets/components/loading.scss'

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-text">Find your location</div>
      <div className="chipotle-logo-loading"></div>
    </div>
  )
}