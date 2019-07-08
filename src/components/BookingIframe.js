import React, { Component } from 'react'

import './BookingIframe.css'

class BookingIframe extends Component {
  render() {
    const { bookingIframe } = this.props

    if (!bookingIframe) return null

    return (
      <div
        className="booking-iframe"
        dangerouslySetInnerHTML={{ __html: bookingIframe }}
      />
    )
  }
}

export default BookingIframe
