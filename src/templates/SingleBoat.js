import React, { useEffect } from 'react'
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
import Content from '../components/Content'
import Button from '../components/Button'
import BoatFeatureSection from '../components/BoatFeatureSection'


export const SingleBoatTemplate = ({
  title,
  boatFeaturesIntro,
  boatListingFeatures,
  boatFeatures,
  boatFeaturesButtonText,
  boatFeaturesButtonLink,
  featuredImage,
  description,
  contentBox,
  bookingIframe,
  gallery,
  columnsSection,
  contentColumnTitle,
  contentColumn,
  videoSectionOptional,
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

  useEffect(() => {
    // Add target="_blank" to all anchor tags after rendering
    document.querySelectorAll('.single-boat-content-column .contentColumn p a').forEach(anchor => {
      anchor.setAttribute('target', '_blank');
      anchor.setAttribute('rel', 'noopener noreferrer'); // security best practice
    });
  }, []);

  return (
    <main className="SingleBoat">
      <Helmet title={meta ? meta.title : `${title} | Sailing in Paradise`}>
        {meta && <meta name="description" content={meta.description} />}
        {meta && <link rel="canonical" href={meta.canonical} />}
      </Helmet>
      <PageHeader title={title} large={true} backgroundImage={featuredImage} />
      <div className="BoatIntro">
        <div className="container">
          {description && <IntroText content={description} />}
        </div>
        <div className="container">
          {bookingIframe ? (
            <BookingIframe bookingIframe={bookingIframe} style={{ margin: "0" }} />
          ) : (
            <ContentBox {...contentBox} charterUrl={boatUrl} />
          )}
        </div>
      </div>
      {gallery && <GallerySlider gallery={gallery} />}
      <BoatFeatureSection
        boatFeaturesIntro={boatFeaturesIntro}
        boatFeatures={boatFeatures}
        boatFeaturesButtonText={boatFeaturesButtonText}
        boatFeaturesButtonLink={boatFeaturesButtonLink}
      />
      {videoSection && <div className="container"> <VideoPopup {...videoSection} /></div>}
      {columnsSection && columnsSection.map((section, index) => (
        <div className="container single-boat-content-column" key={index}>
          {section.leftColumn && (
            <IntroText className="contentColumn" content={section.leftColumn} />
          )}
          {section.rightColumn && (
            <IntroText className="contentColumn" content={section.rightColumn} />
          )}
        </div>
      ))}
      {videoSectionOptional &&
        <div className="container">
          <VideoPopup {...videoSectionOptional} />
        </div>
      }
      {columnBanner && (
        <ColumnBanner
          className="single-boat-column-banner"
          columnBanner={columnBanner}
          boatTour
          charterUrl={boatUrl}
          bookingIframe={bookingIframe}
        />
      )}
      <Accordion accordionSection={accordionSection} />
      {/* <FeaturedTestimonial
        {...featuredTestimonials}
        caseStudies={caseStudies}
        charterTitle={title}
      /> */}
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
        boatFeaturesIntro
        boatListingFeatures {
          content
        }
        boatFeatures {
          content
        }
        boatFeaturesButtonText
        boatFeaturesButtonLink
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
          ctaText
        }
        columnsSection {
          leftColumn
          rightColumn
        }
        videoSectionOptional {
          video
          title
          imageOverlay
          ctaText
        }        
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
