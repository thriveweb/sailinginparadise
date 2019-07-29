import React, { Component } from 'react'
import { ICONPlay, ICONButtonArrows } from './Icons'
import { X } from 'react-feather'
import Image from './Image'

import './Video.css'
import './VideoPopup.css'

class VideoPopup extends Component {
  constructor(props) {
    super(props)
    this.state = { showPopup: false }
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }

  render() {
    const { title, videoURL, imageOverlay, videoBanner } = this.props
    if (!videoURL) return null

    return (
      <div
        className={`video-section ${videoBanner ? 'videoBanner' : ''}`}
        onClick={this.togglePopup.bind(this)}
      >
        {videoBanner}
        <div className={`overlay-content`}>
          {imageOverlay && (
            <Image
              background
              src={`${imageOverlay}-/format/auto/-/quality/lighter/-/progressive/yes/-/resize/2000/`}
            />
          )}
          {title && <h2 className="title-gradient">{title}</h2>}
          <div className="playButton">
            <ICONPlay />
          </div>
          {title && (
            <p className="button buttonWhite">
              Take the tour <ICONButtonArrows />
            </p>
          )}
        </div>
        {this.state.showPopup ? (
          <div className="Popup-Overlay">
            <div
              className="Popup-Background"
              onClick={this.togglePopup.bind(this)}
            ></div>
            <div className="Popup-Inner">
              <X class="Popup-Close" onClick={this.togglePopup.bind(this)} />
              <iframe
                title={`popupvideo-${videoURL}`}
                src={videoURL}
                frameBorder="0"
                width="100%"
                height="100%"
                webkitallowfullscreen
                mozallowfullscreen
                allowfullscreen
              ></iframe>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default VideoPopup
