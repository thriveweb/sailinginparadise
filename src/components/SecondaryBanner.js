import React from 'react'
import Button from './Button'
import Image from './Image'

import './SecondaryBanner.css'

export default ({ title, subtitle, featuredImage, buttonTitle, buttonUrl, large, className = '', contentBox }) => {
	if (large) className += ' bannerLarge'
	if (contentBox) className += ' contentBox'

	if(!featuredImage) return null

	return <div className={`secondary-banner relative overlay ${className}`}>
			{featuredImage && <Image background src={`${featuredImage}-/format/auto/-/quality/lighter/-/progressive/yes/-/resize/2000x/`} />}
			<div className='container'>
				{title && <h2 className='title-gradient'>{title}</h2>}
				{subtitle && <h4>{subtitle}</h4>}
				{buttonTitle && buttonUrl && <Button white title={buttonTitle} url={buttonUrl} />}
			</div>
		</div>
}
