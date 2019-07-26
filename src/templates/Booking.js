import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'
import _get from 'lodash/get'
import PageHeader from '../components/PageHeader'
import IntroText from '../components/IntroText'
import BookingForm from '../components/BookingForm'

import './Booking.css'

// Export Template for use in CMS preview
export const BookingPageTemplate = ({
  title,
  featuredImage,
  intro,
  location,
  meta
}) => {
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
  }
`
