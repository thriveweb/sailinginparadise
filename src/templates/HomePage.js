import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'

import Video from '../components/Video'
import ServiceColumns from '../components/ServiceColumns'
import SecondaryBanner from '../components/SecondaryBanner'
import HomeAboutBanner from '../components/HomeAboutBanner'
import HighlightChart from '../components/HighlightChart'
import TestimonialSlider from '../components/TestimonialSlider'
import FeaturedPosts from '../components/FeaturedPosts'
import InstagramFeed from '../components/InstagramFeed'
import SubscribeForm from '../components/SubscribeForm'


// Export Template for use in CMS preview
export const HomePageTemplate = ({
  title,
  featuredVideo,
  buttonTitle,
  buttonUrl,
  featuredSlider,
  featuredBanner,
  services,
  serviceBanner,
  secondaryBanner,
  aboutSection,
  highlightsIntro,
  highlights,
  featuredTestimonials,
  caseStudies,
  latestNews,
  posts,
  socialMedia,
  meta
}) => {

  return (
    <main className="Home">
      <Helmet title={meta ? meta.title : `${title} | Sailing in Paradise`}>
        {meta && <meta name="description" content={meta.description} />}
        {meta && <link rel="canonical" href={meta.canonical} />}
      </Helmet>
      <Video
        video={featuredVideo}
        homeVideo
        title={title}
        buttonTitle={buttonTitle}
        buttonUrl={buttonUrl}
        featuredSlider={featuredSlider}
        featuredBanner={featuredBanner}
        socialMedia={socialMedia}
      />
      <ServiceColumns
        services={services}
        serviceBanner={serviceBanner}
      />
      <SecondaryBanner
        {...secondaryBanner}
        contentBox
      />
      <HomeAboutBanner {...aboutSection} />
      <HighlightChart
        highlights={highlights}
        highlightsIntro={highlightsIntro}
      />
      <TestimonialSlider
        {...featuredTestimonials}
        caseStudies={caseStudies}
      />
      <FeaturedPosts
        latestNews={latestNews}
        posts={posts}
      />
      <InstagramFeed />
      <SubscribeForm />
    </main>
  )
}

// Export Default HomePage for front-end
const HomePage = ({ data: { page, posts, caseStudies } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <HomePageTemplate {...page.frontmatter} posts={posts} caseStudies={caseStudies} />
  </Layout>
)

export default HomePage

export const pageQuery = graphql`
  query HomePage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        buttonTitle
        buttonUrl
        featuredVideo
        featuredSlider {
          description
          title
          buttonUrl
        }
        featuredBanner {
          title
          buttonTitle
          buttonUrl
          image
        }
        services {
          serviceContent {
            icon
            description
            title
            buttonUrl
          }
          image
        }
        serviceBanner {
          subtitle
          title
          buttonTitle
          buttonUrl
          featuredImage
        }
        secondaryBanner {
          buttonTitle
          buttonUrl
          title
          subtitle
          featuredImage
        }
        aboutSection {
          content
          title
          subtitle
          featuredImage
          buttons {
            buttonTitle
            buttonUrl
          }
        }
        highlightsIntro
        highlights {
          title
          icon
        }
        featuredTestimonials {
          title
          description
          buttonTitle
          buttonUrl
          testimonialsListing {
            testimonial
          }
        }
        latestNews
        meta {
          description
          title
          canonicalLink
        }
      }
    }
    posts: allMarkdownRemark(
      limit: 3
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
      ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            excerpt
            featuredImage
          }
        }
      }
    }
    caseStudies: allMarkdownRemark(filter: {fields: {contentType: {eq: "happySailors"}}}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            featuredImage
            excerpt
          }
        }
      }
    }
  }
`
