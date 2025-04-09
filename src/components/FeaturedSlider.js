import React, { Component } from 'react'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Button from './Button'
import Image from './Image'

import './FeaturedSlider.css'

class FeaturedSlider extends Component {

	render() {
		const settings = {
			infinite: true,
			slidesToShow: 3,
			swipeToSlide: true,
			slidesToScroll: 1,
			arrows: true,
			responsive: [
				{
					breakpoint: 1250,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				},
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					}
				}
			]
		};

		const { featuredSlider, featuredBanner } = this.props
		const { title, buttonTitle, buttonUrl, image } = featuredBanner

		if (!featuredSlider) return null

		return <div className='FeaturedHomeSection'>
			<div className='featuredSlider'>
				<h2 className='fancy-title'>Plan your charter</h2>
				<Slider {...settings}>
					{featuredSlider.map(({ title, description, buttonUrl }, index) => {
						const descriptionLimited = description.slice(0, 60)
						const excerpt = description.length > descriptionLimited.length ? descriptionLimited + '...' : descriptionLimited

						return <div
							className='sliderItem'
							key={`featured-${index}`}
						>
							<a href={buttonUrl || "#"}>
								{title && <h4>{title}</h4>}
								{description && <p>{excerpt}</p>}
							</a>
							{/* {buttonUrl && <Button title='Know More' url={buttonUrl} />} */}
						</div>
					})}
				</Slider>
			</div>
			<div className='featuredBanner relative'>
				{image && <Image background src={`${image}-/format/auto/-/quality/lighter/-/progressive/yes/-/resize/600/`} />}
				<div className='bannerContent'>
					{title && <h3>{title}</h3>}
					{buttonTitle && buttonUrl && <Button title={buttonTitle} url={buttonUrl} white />}
				</div>
			</div>
		</div>
	}
}

export default FeaturedSlider
