import React from 'react'

import { ICONInstagram, ICONTwitter, ICONFacebook, ICONGooglePlus, ICONLinkedin, ICONTripAdvisor } from './Icons'

import './SocialLinks.css'

export default ({ socialMedia }) => {

	if(!socialMedia) return null

	const { facebook, instagram, twitter, googlePlus, linkedin, tripAdvisor } = socialMedia


	return <div className='share-buttons'>
		{googlePlus &&
			<li>
				<a
					href={googlePlus}
					target="_blank"
					rel="noopener noreferrer"
				>
					<ICONGooglePlus />
				</a>
			</li>
		}
		{instagram &&
			<li>
				<a
					href={instagram}
					target="_blank"
					rel="noopener noreferrer"
				>
					<ICONInstagram />
				</a>
			</li>
		}
		{facebook &&
			<li>
				<a
					href={facebook}
					target="_blank"
					rel="noopener noreferrer"
				>
					<ICONFacebook />
				</a>
			</li>
		}
		{linkedin &&
			<li>
				<a
					href={linkedin}
					target="_blank"
					rel="noopener noreferrer"
				>
					<ICONLinkedin />
				</a>
			</li>
		}
		{twitter &&
			<li>
				<a
					href={twitter}
					target="_blank"
					rel="noopener noreferrer"
				>
					<ICONTwitter />
				</a>
			</li>
		}
		{tripAdvisor &&
			<li>
				<a
					href={tripAdvisor}
					target="_blank"
					rel="noopener noreferrer"
				>
					<ICONTripAdvisor />
				</a>
			</li>
		}
	</div>

}
