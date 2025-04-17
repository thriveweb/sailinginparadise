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
  title,
  featuredImage,
  description,
  contentBox,
  bookingIframe,
  gallery,
  contentColumnTitle,
  contentColumn,
  accordionSection,
  columnBanner,
  videoSection,
  slug,
  caseStudies,
  featuredTestimonials,
  meta
}) => {
  const boatUrl = slug
    ? slug.replace('/boats/', '').replace('/', '')
    : ''
  console.log('**** videoSection ****', videoSection)
  return (
    <main className="SingleBoat">
      <Helmet title={meta ? meta.title : `${title} | Sailing in Paradise`}>
        {meta && <meta name="description" content={meta.description} />}
        {meta && <link rel="canonical" href={meta.canonical} />}
      </Helmet>
      <PageHeader title={title} backgroundImage={featuredImage} />
      <div className="BoatIntro">
        <div className="container">
          {description && <IntroText content={description} />}
        </div>
        <div className="container">
          {bookingIframe ? (
            <BookingIframe bookingIframe={bookingIframe} />
          ) : (
            <ContentBox {...contentBox} charterUrl={boatUrl} />
          )}
        </div>
      </div>
      {gallery && <GallerySlider gallery={gallery} />}
      {videoSection && <VideoPopup {...videoSection} />}
      {contentColumn && (
        <div className="boat-content-column">
          <IntroText content={contentColumn} title={contentColumnTitle} />
        </div>
      )}
      <Accordion accordionSection={accordionSection} />
      {columnBanner && (
        <ColumnBanner
          columnBanner={columnBanner}
          boatTour
          charterUrl={boatUrl}
          bookingIframe={bookingIframe}
        />
      )}
      <FeaturedTestimonial
        {...featuredTestimonials}
        caseStudies={caseStudies}
        charterTitle={title}
      />
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
        description
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
  }
`
