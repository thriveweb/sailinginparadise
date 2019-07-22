import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

import PageHeader from '../components/PageHeader'
import IntroText from '../components/IntroText'
import ContentBox from '../components/ContentBox'
import BookingIframe from '../components/BookingIframe'
import GallerySlider from '../components/GallerySlider'
import Video from '../components/Video'
import Accordion from '../components/Accordion'
import ColumnBanner from '../components/ColumnBanner'
import FeaturedTestimonial from '../components/FeaturedTestimonial'

import './SingleBoatTour.css'

export const SingleBoatTourTemplate = ({
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
  const charterUrl = slug
    ? slug.replace('/private-charter/', '').replace('/', '')
    : ''

  return (
    <main className="SingleBoatTour">
      <Helmet title={meta ? meta.title : `${title} | Sailing in Paradise`}>
        {meta && <meta name="description" content={meta.description} />}
        {meta && <link rel="canonical" href={meta.canonical} />}
      </Helmet>
      <PageHeader title={title} backgroundImage={featuredImage} />
      <div className="BoatTourIntro">
        <div className="container">
          {intro && <IntroText content={intro} />}
          {bookingIframe ? (
            <BookingIframe bookingIframe={bookingIframe} />
          ) : (
            <ContentBox {...contentBox} />
          )}
        </div>
      </div>
      {gallery && <GallerySlider gallery={gallery} />}
      {videoSection && <Video {...videoSection} />}
      {contentColumn && (
        <div className='boat-content-column'>
          <IntroText content={contentColumn} title={contentColumnTitle} />
        </div>
      )}
      <Accordion accordionSection={accordionSection} />
      {columnBanner &&
        <ColumnBanner
          columnBanner={columnBanner}
          boatTour
          charterUrl={charterUrl}
          bookingIframe={bookingIframe}
        />
      }
      <FeaturedTestimonial {...featuredTestimonials} caseStudies={caseStudies} charterTitle={title} />
    </main>
  )
}

const SingleBoatTour = ({ data }) => (
  <Layout meta={data.post.frontmatter.meta || false}>
    <SingleBoatTourTemplate
      {...data.post}
      {...data.post.frontmatter}
      {...data.post.fields}
      caseStudies={data.caseStudies}
      body={data.post.html}
    />
  </Layout>
)

export default SingleBoatTour

export const pageQuery = graphql`
  ## Query for SingleBoatTour data
  query SingleBoatTour($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
      }
      frontmatter {
        tourType
        title
        featuredImage
        intro
        contentBox {
          buttonTitle
          buttonUrl
          title
        }
        bookingIframe
        gallery {
          image
        }
        videoSection {
          video
          title
          imageOverlay
        }
        contentColumnTitle
        contentColumn
        accordionSection {
          sectionTitle
          accordion {
            dropdownContent
            title
          }
        }
        columnBanner {
          buttonTitle
          buttonUrl
          content
          title
          featuredImage
          bookingWidget
        }
        featuredTestimonials {
          title
          description
          testimonial
        }
        meta {
          description
          title
          canonicalLink
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
