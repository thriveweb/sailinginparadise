import React from 'react'
import { Link } from 'gatsby'
import _kebabCase from 'lodash/kebabCase'
import { ICONButtonArrows } from './Icons'

import './Button.css'

export default ({ title, url, white, className = '', handlePopup }) => {

	if(white) className += ' buttonWhite'

	return <Link className={`button ${className}`} to={`/${_kebabCase(url)}`}>
			{title}
			<ICONButtonArrows/>
		</Link>
}
