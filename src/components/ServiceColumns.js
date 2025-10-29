import React, { Fragment } from 'react'
import _get from 'lodash/get'
import { Link } from 'gatsby'
import Image from './Image'
import Button from './Button'

import './ServiceColumns.css'

export default ({ services, serviceBanner }) => {
	const title = _get(serviceBanner, 'title') || ''
	const subtitle = _get(serviceBanner, 'subtitle') || ''
	const buttonUrl = _get(serviceBanner, 'buttonUrl') || ''
	const buttonTitle = _get(serviceBanner, 'buttonTitle') || ''
	const featuredImage = _get(serviceBanner, 'featuredImage') || ''

	return <section className='serviceSection relative'>
		<div className='serviceColumns'>
			{services && services.map(({ serviceContent, image }, index) => {
				const { icon, title, description, buttonUrl } = serviceContent

				const excerpt = description.length > 213
					? description.slice(0, 213) + '...'
					: description

				return <Fragment key={index}>
					<div className='serviceContent'>
						{icon && <Image src={icon} alt='' />}
						{title && <Link className='fancy-title' to={buttonUrl}>{title}</Link>}
						{excerpt && <p><a href={buttonUrl || "#"} className="serviceLink">{excerpt}</a></p>}
						{/* {buttonUrl && <Button title='Know More' url={buttonUrl} />} */}
					</div>
					<div className='serviceImage relative'>
						{image && <Image background src={`${image}-/format/auto/-/quality/lighter/-/progressive/yes/-/resize/700/`} />}
					</div>
				</Fragment>
			})}
		</div>
		<div className='serviceBanner'>
			{featuredImage && <Image background src={`${featuredImage}-/format/auto/-/quality/lighter/-/progressive/yes/-/resize/1400/`} />}
			<div className='serviceBanner-Content'>
				{title && <p>{title}</p>}
				{subtitle && <h3>{subtitle}</h3>}
				{buttonTitle && buttonUrl && <Button title={buttonTitle} url={buttonUrl} white />}
			</div>
		</div>
	</section>
}
