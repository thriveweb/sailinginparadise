import React, { Component } from 'react'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Button from './Button'

import './FeaturedSlider.css'

class FeaturedSlider extends Component {

  	render() {
		const settings = {
		  infinite: true,
		  slidesToShow: 3,
		  swipeToSlide: true,
		  slidesToScroll: 1,
		  arrows: true,
		};

	    const { featuredSlider, featuredBanner } = this.props
	    const { title, buttonTitle, buttonUrl, image } = featuredBanner

		if(!featuredSlider) return null

		return <div className='FeaturedHomeSection'>
			<div className='featuredSlider'>
				<h2 className='fancy-title'>Featured</h2>
				<Slider {...settings}>
		    		{featuredSlider.map(({ title, description, buttonUrl }, index) => {
		    			const descriptionLimited = description.slice(0, 60)
		    			const excerpt = description.length > descriptionLimited.length ? descriptionLimited + '...' : descriptionLimited

		    			return <div
		    				className='sliderItem'
		    				key={`featured-${index}`}
		    			>
			    			{title && <h4>{title}</h4>}
			    			{description && <p>{excerpt}</p>}
			    			{buttonUrl && <Button title='Know More' url={buttonUrl} white />}
			    		</div>
		    		})}
		    	</Slider>
			</div>
			<div className='featuredBanner relative'>
        {image &&
          <div
            style={{
              backgroundImage: `url(${`${image}-/quality/lighter/-/progressive/yes/-/resize/1x/-/quality/lighter/`})`,
              backgroundSize: 'cover'
            }}
            data-src={`${image}-/quality/lighter/-/progressive/yes/-/resize/600/`}
            className='BackgroundImage absolute lazy'
          >
          </div>
        }
				<div className='bannerContent'>
					{title && <h3>{title}</h3>}
					{buttonTitle && buttonUrl && <Button title={buttonTitle} url={buttonUrl} white />}
				</div>
			</div>
		</div>
	}
}

export default FeaturedSlider
