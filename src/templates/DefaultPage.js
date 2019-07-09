import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'

import './DefaultPage.css'

// Export Template for use in CMS preview
export const DefaultPageTemplate = ({ title, featuredImage, content, meta }) => {

  return <main className="DefaultPage">
    <Helmet title={meta ? meta.title : `${title} | Sailing in Paradise`}>
      {meta && <meta name="description" content={meta.description} />}
      {meta && <link rel="canonical" href={meta.canonical} />}
    </Helmet>

    <PageHeader title={title} backgroundImage={featuredImage} />

    <section className="section">
      <div className="container">
        <Content src={content} />
      </div>
    </section>
  </main>
}

const DefaultPage = ({ data: { page } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <DefaultPageTemplate {...page.frontmatter} />
  </Layout>
)

export default DefaultPage

export const pageQuery = graphql`
  query DefaultPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        featuredImage
        content
        meta {
          description
          title
          canonicalLink
        }
      }
    }
  }
`
