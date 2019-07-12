import React from 'react'

import Content from './Content'
import Button from './Button'

import './HomeAboutBanner.css'

export default ({ featuredImage, title, subtitle, content, buttons }) => {

	if(!featuredImage) return null

	return <section className='aboutUs relative'>
			{featuredImage && <div
				style={{
					backgroundImage: `url(${`${featuredImage}-/format/auto/-/quality/lighter/-/progressive/yes/-/resize/1x/-/format/auto/-/quality/lighter/`})`,
					backgroundSize: 'cover'
				}}
				data-src={`${featuredImage}-/format/auto/-/quality/lighter/-/progressive/yes/-/resize/2000x/`}
				className='BackgroundImage absolute lazy'
			></div>}
			{title && <h2 className='title-gradient'>{title}</h2>}
			<div className='aboutUs-Content'>
				{subtitle && <h3 className='fancy-title'>{subtitle}</h3>}
				{content && <Content src={content} />}
				{buttons &&
					buttons.map(({ buttonTitle, buttonUrl}, index) =>
						<Button  key={buttonUrl + index} title={buttonTitle} url={buttonUrl} />
					)
				}
			</div>
		</section>
}
