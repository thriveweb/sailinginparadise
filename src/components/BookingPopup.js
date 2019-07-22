import React, { Component } from 'react'
import { Location } from '@reach/router'

import Image from './Image'
import Button from './Button'
import { ICONButtonArrows, ICONClose } from './Icons'

import './BookingPopup.css'

class Popup extends Component {
	render() {
		return (
		 <Location>
			{({ location }) => {
				const { title, contentBoxes, classActive } = this.props

				return <section className={`booking-popup ${classActive}`}>
					<div
						className='popup-close'
						onClick={this.props.handlePopup}
					>
						<ICONClose/>
					</div>
					<div className='container skinny'>
						{title && <h2>{title}</h2>}
						<div className='contentBoxes'>
							{contentBoxes && contentBoxes.map(({ icon, title, buttonTitle, buttonUrl }, index) => {

								return <div className='contentBox' key={index}>
									{icon && <Image src={icon} alt='' />}
									{title && <h3>{title}</h3>}
									{location && location.pathname === `/${buttonUrl}`
										?	<p
												className='button'
												onClick={this.props.handlePopup}
											>
												{buttonTitle}
												<ICONButtonArrows/>
											</p>
										: <div onClick={this.props.handlePopup}>
												<Button
													title={buttonTitle}
													url={buttonUrl}
												/>
											</div>
									}
								</div>
							})}
						</div>
					</div>
				</section>


			}}
		 </Location>
		)


	}
}

export default Popup
