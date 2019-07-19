import React from 'react'
import IntroText from './IntroText'
import Content from './Content'
import Image from './Image'
import SocialLinks from './SocialLinks'

import './CaptainListing.css'

export default ({ captainIntro, captain }) => {
	return <div className='captain-section'>
		<div className='container'>
			<IntroText content={captainIntro} center />
			{captain &&
				<div className='captains-listing'>
					{captain.map(({ name, image, title, description, socialMedia }, index ) => {

						return <div className='member' key={`member ${index}`}>
							{image &&
								<div className='image-container relative'>
									<Image background src={`${image}-/format/auto/-/quality/lighter/-/progressive/yes/-/resize/230/`}/>
								</div>
							}
							{name && <h4>{name}</h4>}
							{title && <p>{title}</p>}
							{description && <Content src={description} />}
							{socialMedia && <SocialLinks socialMedia={socialMedia} />}
						</div>

					})}
				</div>
			}
		</div>
	</div>
}
