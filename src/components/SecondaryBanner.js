import React from 'react'
import Button from './Button'

import './SecondaryBanner.css'

export default ({ title, subtitle, featuredImage, buttonTitle, buttonUrl, large, className = '', contentBox }) => {
	if (large) className += ' bannerLarge'
	if (contentBox) className += ' contentBox'

	if(!featuredImage) return null

	return <div className={`secondary-banner relative overlay ${className}`}>
	{console.log(`${featuredImage}-/resize/1x/-/quality/lightest/`)}
			{featuredImage &&
				<div
					style={{
						backgroundImage: `url(${`${featuredImage}-/resize/1x/-/quality/lightest/`})`,
						backgroundSize: 'cover'
					}}
					data-src={`${featuredImage}-/resize/2000x/`}
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
