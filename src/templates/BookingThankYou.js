import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'
import PageHeader from '../components/PageHeader'
import IntroText from '../components/IntroText'

import './Booking.css'

// Export Template for use in CMS preview
export const BookingThankYouPageTemplate = ({
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
        <div className="container large taceter">
          <IntroText content={intro} />
        </div>
      </section>
    </main>
  )
}

const BookingThankYouPage = ({ data: { page, globalSections }, location }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <BookingThankYouPageTemplate
      {...page.frontmatter}
      body={page.html}
      location={location}
      contactInfo={globalSections}
    />
  </Layout>
)

export default BookingThankYouPage

export const pageQuery = graphql`
  query BookingThankYouPage($id: String!) {
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
