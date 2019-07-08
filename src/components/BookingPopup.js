import React, { Component } from 'react'

import Image from './Image'
import Button from './Button'

import './BookingPopup.css'

class Popup extends Component {

	render() {
		const { title, contentBoxes, classActive } = this.props

		return <section className={`booking-popup ${classActive}`}>
			<div className='container skinny'>
				{title && <h2>{title}</h2>}
				<div className='contentBoxes'>
					{contentBoxes && contentBoxes.map(({ icon, title, buttonTitle, buttonUrl }, index) => {
						return <div className='contentBox' key={index}>
							{icon && <Image src={icon} alt='' />}
							{title && <h3>{title}</h3>}
							{buttonTitle && buttonUrl &&
								<Button
									title={buttonTitle}
									url={buttonUrl}
								/>
							}
						</div>
					})}
				</div>
			</div>
		</section>
	}
}

export default Popup
