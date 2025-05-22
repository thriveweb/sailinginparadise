import React, { Component } from 'react'

import './BookingIframe.css'

class BookingIframe extends Component {
  render() {
    const { bookingIframe, style } = this.props

    if (!bookingIframe) return null

    return (
      <div
        className="booking-iframe"
        style={style}
        dangerouslySetInnerHTML={{ __html: bookingIframe }}
      />
    )
  }
}

export default BookingIframe
