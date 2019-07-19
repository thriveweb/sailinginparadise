import React, { Component } from 'react'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from './Image'

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
			responsive: [
				{
					breakpoint: 768,
					settings: {
						infinite: gallery.length > 3,
						slidesToShow: 3,
						slidesToScroll: 3,
					}
				}
			]
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
						{image && <Image background src={`${image}-/format/auto/-/quality/lighter/-/progressive/yes/-/resize/500x/-/format/auto/-/quality/lighter/`} />}
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
					{image && <Image src={`${image}-/format/auto/-/quality/lighter/-/progressive/yes/-/resize/1000x/-/format/auto/-/quality/lighter/`} />}
				</div>
			})}
		</div>
	}
}

export default GallerySlider
