import React, { Component } from 'react'
import { ICONPlay, ICONButtonArrows } from './Icons'
import FeaturedSlider from './FeaturedSlider'
import SocialLinks from './SocialLinks'
import Image from './Image'
import Button from './Button'

import './Video.css'

class Video extends Component {
	constructor(props) {
		super(props)

		this.videoRef = React.createRef()

		this.state = {}
	}

	handleVideo = url => {
		this.videoRef.current.src = `https://player.vimeo.com/video/${url}?autoplay=1&start=0&modestbranding=1&controls=0&disablekb=1&rel=0`
		this.setState({
			videoPlaying: true
		})
	}

	render() {
		const { title, buttonTitle, buttonUrl, video, imageOverlay, videoBanner, homeVideo, featuredSlider, featuredBanner, socialMedia } = this.props
		const { videoPlaying } = this.state

		if(!video) return null

		const url = video.replace(/^.+v=/,'').replace(/&.*/,'')

		if(homeVideo)
			return <div className={`video-section homeVideo`}>
				{title &&
					<div className='overlay-content'>
						<div className='container'>
							<h1 className='title-gradient'>{title}</h1>
							<Button title={buttonTitle} url={buttonUrl} white />
						</div>
					</div>
				}
				<div className="background-video">
					<video className="video" preload="true" playsInline autoPlay muted loop>
						<source src={video} type="video/mp4"></source>
					</video>
				</div>
				<FeaturedSlider featuredSlider={featuredSlider} featuredBanner={featuredBanner} />
				<SocialLinks socialMedia={socialMedia} />
			</div>

		return <div className={`video-section ${videoBanner ? 'videoBanner' : ''}`} onClick={() => !videoPlaying && this.handleVideo(url)}>
			<div className={`overlay-content ${!videoPlaying ? 'active' : ''}`}>
				{imageOverlay && <Image background src={`${imageOverlay}-/format/auto/-/quality/lighter/-/progressive/yes/-/resize/2000/`}/>}
				{title && <h2 className='title-gradient'>{title}</h2>}
				<div className='playButton'><ICONPlay /></div>
				{title && <p className='button buttonWhite'>Watch Video <ICONButtonArrows /></p>}
			</div>
			<iframe
				ref={this.videoRef}
				frameBorder="0"
				allowFullScreen
				title="video banner"
			>
			</iframe>
		</div>
	}
}

export default Video
