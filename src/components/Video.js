import React, { Component } from 'react'
import { ICONPlay, ICONButtonArrows } from './Icons'
import FeaturedSlider from './FeaturedSlider'
import SocialLinks from './SocialLinks'

import './Video.css'

class Video extends Component {
	constructor(props) {
		super(props)

		this.videoRef = React.createRef()

		this.state = {}
	}

	handleVideo = url => {
		this.videoRef.current.src = `https://www.youtube.com/embed/${url}?autoplay=1&start=0&modestbranding=1&controls=0&disablekb=1&rel=0`
		this.setState({
			videoPlaying: true
		})
	}

	render() {
		const { title, video, imageOverlay, videoBanner, homeVideo, featuredSlider, featuredBanner, socialMedia } = this.props
		const { videoPlaying } = this.state

		if(!video) return null

		const url = video.replace(/^.+v=/,'').replace(/&.*/,'')

		if(homeVideo)
			return <div className={`video-section homeVideo`}>
				{!videoPlaying &&
					<div className='overlay-content'>
						<div className='container'>
							{title && <h1 className='title-gradient'>{title}</h1>}
						</div>
					</div>
				}
				<iframe
					src={`https://www.youtube.com/embed/${url}?autoplay=1&start=0&mute=1&modestbranding=1&rel=0&controls=0&loop=1&playlist=${url}&showinfo=0`}
					frameBorder="0"
					title="home video"
				>
				</iframe>
				<FeaturedSlider featuredSlider={featuredSlider} featuredBanner={featuredBanner} />
				<SocialLinks socialMedia={socialMedia} />
			</div>

		return <div className={`video-section ${videoBanner ? 'videoBanner' : ''}`} onClick={() => !videoPlaying && this.handleVideo(url)}>
			<div className={`overlay-content ${!videoPlaying ? 'active' : ''}`}>
				{imageOverlay &&
					<div
						style={{
							backgroundImage: `url(${`${imageOverlay}-/resize/100x/`})`,
							backgroundSize: 'cover'
						}}
						data-src={`${imageOverlay}-/resize/2000/`}
						className='BackgroundImage absolute lazy'
					>
					</div>
				}
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
