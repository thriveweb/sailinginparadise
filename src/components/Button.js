import React from 'react'
import { Link } from 'gatsby'
import { ICONButtonArrows } from './Icons'

import './Button.css'

export default ({ title, url, white, className = '' }) => {
	if(white) className += ' buttonWhite'

	let target = "_self";
	let pathName = url.toLowerCase().replace(' ', '-')
	if (pathName.startsWith('http')){
		target = "_blank";
	} else {
		pathName = '/'+pathName
	}

	return <Link
			className={`button ${className}`}
			to={`${pathName}`}
			target={target}
		>
			{title}
			<ICONButtonArrows/>
		</Link>
}
