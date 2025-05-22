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
import FeatureTickIcon from '../components/FeatureTickIcon'

import './SingleBoat.css'
import Content from '../components/Content'
import Button from '../components/Button'

export const SingleBoatTemplate = ({
  title,
  boatListingFeatures,
  boatFeatures,
  featuredImage,
  description,
  contentBox,
  bookingIframe,
  gallery,
  columnsSection,
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
  console.log('**** columnsSection ****', columnsSection)
  const title123 = "Optional intro section lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud."
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
      <div className="container boat-features-list">
        <h4>BOAT FEATURES</h4>
        <Content src={title123}/>
        <div className="features-columns">
          <div className="feature-column">
            {boatListingFeatures && boatListingFeatures.map((feature, i) => (
              <div className="feature-item-row" key={i}>
                <div className="feature-item">
                  <span className="feature-dot"><FeatureTickIcon size={10} /></span>
                  <span className="feature-text">{feature.content}</span>
                </div>
                <div className="feature-divider" />
              </div>
            ))}
          </div>
          <div className="feature-column">
            {boatFeatures && boatFeatures.map((feature, i) => (
              <div className="feature-item-row" key={i}>
                <div className="feature-item">
                  <span className="feature-dot"><FeatureTickIcon size={10} /></span>
                  <span className="feature-text">{feature.content}</span>
                </div>
                <div className="feature-divider" />
              </div>
            ))}
          </div>
        </div>
        <div className="features-button-row">
          <button className="nav-button">ENQUIRE NOW</button>
        </div>
      </div>
      
      {videoSection && <VideoPopup {...videoSection} />}
      {columnsSection && columnsSection.map((section, index) => (
        <div className="container boat-content-column" key={index}>
          {section.leftColumn && (
            <IntroText className="contentColumn" content={section.leftColumn} />
          )}
          {section.rightColumn && (
            <IntroText className="contentColumn" content={section.rightColumn} />
          )}
        </div>
      ))}
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
        boatListingFeatures {
          content
        }
        boatFeatures {
          content
        }
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
        columnsSection {
          leftColumn
          rightColumn
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
