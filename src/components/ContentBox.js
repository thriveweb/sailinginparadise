import React from 'react'
import Button from './Button'

import './ContentBox.css'

export default ({ title, buttonTitle, buttonUrl }) => {

	if(!title) return null

	return <div className='contentBox'>
		<div className='contentBox-container'>
			{title && <h3>{title}</h3>}
			{buttonTitle && buttonUrl && <Button title={buttonTitle} url={buttonUrl} />}
		</div>
	</div>
}