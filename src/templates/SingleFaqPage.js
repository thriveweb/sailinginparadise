import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

import PageHeader from '../components/PageHeader'
import Accordion from '../components/Accordion'

export const SingleFaqPageTemplate = ({
  title,
  featuredImage,
  accordionSection,
  meta
}) => {
  return (
    <main className="SingleFaqPage">
      <Helmet title={meta ? meta.title : `${title} | Sailing in Paradise`}>
        {meta && <meta name="description" content={meta.description} />}
        {meta && <link rel="canonical" href={meta.canonical} />}
      </Helmet>
      <PageHeader title={title} backgroundImage={featuredImage} />
      <Accordion accordionSection={accordionSection} />
    </main>
  )
}

const SingleFaqPage = ({ data }) => (
  <Layout meta={data.post.frontmatter.meta || false}>
    <SingleFaqPageTemplate
      {...data.post}
      {...data.post.frontmatter}
      {...data.post.fields}
    />
  </Layout>
)

export default SingleFaqPage

export const pageQuery = graphql`
  ## Query for SingleFaqPage data
  query SingleFaqPage($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      frontmatter {
        title
        featuredImage
        accordionSection {
          sectionTitle
          accordion {
            dropdownContent
            title
          }
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
