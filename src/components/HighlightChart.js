import React from 'react'

import Image from './Image'
import Content from './Content'
import './HighlightChart.css'

export default ({ highlights, highlightsIntro }) => {
	if(!highlights) return null

	return <section className='highlightSection'>
		<div className='container large'>
			{highlightsIntro && <Content src={highlightsIntro} />}
			<div className='highlights'>
				{highlights.map(({ title, icon }, index) => {
					return <div className='highlightItem' key={index}>
						{icon && <Image src={icon} alt='' />}
						{title && <p>{title}</p>}
					</div>
				})}
			</div>
		</div>
	</section>
}
