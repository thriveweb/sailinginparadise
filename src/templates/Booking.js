import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'
import _get from 'lodash/get'


import PageHeader from '../components/PageHeader'
import IntroText from '../components/IntroText'
import Image from '../components/Image'
import Content from '../components/Content'
import BookingForm from '../components/BookingForm'

import './Booking.css'

// Export Template for use in CMS preview
export const BookingPageTemplate = ({
  body,
  title,
  featuredImage,
  intro,
  contactInfo,
  location,
  meta
}) => {

  contactInfo = contactInfo ? contactInfo.edges.map(edge => ({ ...edge.node.frontmatter })) : []
  const phone = _get(contactInfo[0], 'phone') || ''
  const address = _get(contactInfo[0], 'address') || ''
  const hours = _get(contactInfo[0], 'hours') || ''
  const map = _get(contactInfo[0], 'map') || ''

  return (
    <main className="Booking">
      <Helmet title={meta ? meta.title : `${title} | Sailing in Paradise`}>
        {meta && <meta name="description" content={meta.description} />}
        {meta && <link rel="canonical" href={meta.canonical} />}
      </Helmet>

      <PageHeader title={title} backgroundImage={featuredImage} />

      <section className="section Contact--Sections">
        <div className="container large">
          <div className="Contact--Section1">
            <IntroText content={intro} />
            <div className="Contact--Details">
              {address && (
                <div className="Contact--Details--Item">
                  <Content src={address} />
                  {map && (
                    <div className="image-container">
                      <Image
                        background
                        src={map}
                        alt="map image"
                        size="cover"
                      />
                    </div>
                  )}
                </div>
              )}
              {phone && (
                <Content className="Contact--Details--Item" src={phone} />
              )}
              {hours && (
                <Content className="Contact--Details--Item" src={hours} />
              )}
            </div>
          </div>
          <div className="Contact--Section2">
            <BookingForm location={location} />
          </div>
        </div>
      </section>
    </main>
  )
}


const BookingPage = ({ data: { page, globalSections }, location }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <BookingPageTemplate
      {...page.frontmatter}
      body={page.html}
      location={location}
      contactInfo={globalSections}
    />
  </Layout>
)

export default BookingPage

export const pageQuery = graphql`
  query BookingPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        template
        featuredImage
        intro
        meta {
          description
          title
          canonicalLink
        }
      }
    }
    globalSections: allMarkdownRemark(filter: {fields: {slug: {eq: "/general-contact/"}}}) {
  	  edges {
  	    node {
  	      frontmatter {
  					phone
            hours
            address
            map
  	      }
  	    }
  	  }
  	}
  }
`
