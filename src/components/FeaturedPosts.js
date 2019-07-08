import React from 'react'

import IntroText from './IntroText'
import PostCard from './PostCard'

import './FeaturedPosts.css'

export default ({ latestNews, posts }) => {

	posts = posts ? posts.edges.map(edge => ({ ...edge.node.frontmatter })) : []

	if(!posts) return null

	return <section className='featuredPostsSection'>
		<div className='container large'>
			{latestNews && <IntroText content={latestNews} center />}
			<div className='featuredPosts'>
				{posts.map(( post, index ) =>
					<PostCard {...post} featuredHome key={index} />
				)}
			</div>
		</div>
	</section>
}
