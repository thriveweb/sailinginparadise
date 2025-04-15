import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

import PageHeader from '../components/PageHeader'
import IntroText from '../components/IntroText'
import ContentBox from '../components/ContentBox'
import BookingIframe from '../components/BookingIframe'
import GallerySlider from '../components/GallerySlider'
import VideoPopup from '../components/VideoPopup'
import Accordion from '../components/Accordion'
import ColumnBanner from '../components/ColumnBanner'
import FeaturedTestimonial from '../components/FeaturedTestimonial'

import './SingleBoat.css'

export const SingleBoatTemplate = ({
  body,
  tourType,
  title,
  featuredImage,
  intro,
  contentBox,
  bookingIframe,
  gallery,
  contentColumnTitle,
  contentColumn,
  accordionSection,
  columnBanner,
  videoSection,
  slug,
  post,
  caseStudies,
  featuredTestimonials,
  meta
}) => {
  // const charterUrl = slug
  //   ? slug.replace('/boat-charter/', '').replace('/', '')
  //   : ''

  return (
    <main className="SingleBoat">
      <Helmet title={meta ? meta.title : `${title} | Sailing in Paradise`}>
        {meta && <meta name="description" content={meta.description} />}
        {meta && <link rel="canonical" href={meta.canonical} />}
      </Helmet>
      <PageHeader title={title} backgroundImage={featuredImage} />
      <div className="BoatIntro">
        <div className="container">
          {intro && <IntroText content={intro} />}
        </div>
      </div>
      {gallery && <GallerySlider gallery={gallery} />}
      {videoSection && <VideoPopup {...videoSection} />}
    </main>
  )
}

const SingleBoat = ({ data }) => (
  <Layout meta={data.post.frontmatter.meta || false}>
    <SingleBoatTemplate
      {...data.post}
      {...data.post.frontmatter}
      {...data.post.fields}
      body={data.post.html}
    />
  </Layout>
)

export default SingleBoat

export const pageQuery = graphql`
  ## Query for SingleBoat data
  query SingleBoat($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        featuredImage
        gallery {
          image
        }
        videoSection {
          video
          title
          imageOverlay
        }        
        meta {
          description
          title
          canonicalLink
        }
      }
    }
  }
`
