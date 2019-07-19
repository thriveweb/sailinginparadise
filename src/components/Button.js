import React from 'react'
import { Link } from 'gatsby'
import { ICONButtonArrows } from './Icons'

import './Button.css'

export default ({ title, url, white, className = '' }) => {
	if(white) className += ' buttonWhite'

	const pathName = url.toLowerCase().replace(' ', '-')

	return <Link
			className={`button ${className}`}
			to={`/${pathName}`}
		>
			{title}
			<ICONButtonArrows/>
		</Link>
}
