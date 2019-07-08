import React, { Component } from 'react'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ICONMagnify, ICONClose } from './Icons'
import './GallerySlider.css'

class GallerySlider extends Component {

	state = {
		popupActive: null
	}

	handlePopup = (index = null) => {
		this.setState({
			popupActive: index
		})

		document.body.style.overflow = index || index === 0 ? 'hidden' : 'auto'
		document.documentElement.style.overflow = index || index === 0 ? 'hidden' : 'auto'
	}

  render() {
		const { gallery = [] } = this.props

		const settings = {
		  infinite: gallery.length > 4,
		  slidesToShow: 4,
		  swipeToSlide: true,
		  slidesToScroll: 1,
		  arrows: true,
		};

		if(!gallery) return null

		return <div className='gallery'>
			<Slider {...settings}>
    		{gallery.map(({ image }, index) => {
    			return <div
    				className='galleryImage'
    				key={`image-${index}`}
    				onClick={() => this.handlePopup(index)}
    			>
						{image &&
							<div
								style={{
									backgroundImage: `url(${`${image}-/resize/100x/`})`,
									backgroundSize: 'cover'
								}}
								data-src={`${image}-/resize/500/`}
								className='BackgroundImage absolute lazy'
							>
							</div>
						}
	    			<ICONMagnify />
	    		</div>
    		})}
	    </Slider>
			{gallery.map(({ image }, index) => {
				return <div
					className={`galleryImage--Popup ${this.state.popupActive === index ? 'active' : ''}`}
					key={`image-full-${index}`}
				>
					<div className='popup-close' onClick={() => this.handlePopup()}>
						<ICONClose />
					</div>
						{image &&
							<div
								style={{
									backgroundImage: `url(${`${image}-/resize/100x/`})`,
									backgroundSize: 'cover'
								}}
								data-src={`${image}-/resize/1000/`}
								className='BackgroundImage absolute lazy'
							>
							</div>
						}
	    		</div>
			})}
		</div>
	}
}

export default GallerySlider
