import React from 'react'
import Button from './Button'

import './SecondaryBanner.css'

export default ({ title, subtitle, featuredImage, buttonTitle, buttonUrl, large, className = '', contentBox }) => {
	if (large) className += ' bannerLarge'
	if (contentBox) className += ' contentBox'

	if(!featuredImage) return null

	return <div className={`secondary-banner relative overlay ${className}`}>
			{featuredImage &&
				<div
					style={{
						backgroundImage: `url(${`${featuredImage}-/format/auto/-/quality/lighter/-/progressive/yes/-/resize/1x/-/format/auto/-/quality/lighter/`})`,
						backgroundSize: 'cover'
					}}
					data-src={`${featuredImage}-/format/auto/-/quality/lighter/-/progressive/yes/-/resize/2000x/`}
					className='BackgroundImage absolute lazy'
				></div>
			}
			<div className='container'>
				{title && <h2 className='title-gradient'>{title}</h2>}
				{subtitle && <h4>{subtitle}</h4>}
				{buttonTitle && buttonUrl && <Button white title={buttonTitle} url={buttonUrl} />}
			</div>
		</div>
}
