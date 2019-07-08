import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import PostSection from '../components/PostSection.js'
import ColumnBanner from '../components/ColumnBanner.js'

import './CaseStudies.css'

// Export Template for use in CMS preview
export const CaseStudiesTemplate = ({
  title,
  subtitle,
  featuredImage,
  posts = [],
  columnBanner,
  meta,
}) => {

  return (
    <main className="Blog CaseStudies">
      <Helmet title={meta ? meta.title : `${title} | Sailing in Paradise`}>
        {meta && <meta name="description" content={meta.description} />}
        {meta && <link rel="canonical" href={meta.canonical} />}
      </Helmet>

      <PageHeader title={title} backgroundImage={featuredImage} />
      {!!posts.length && (
        <section className="section">
          <div className="container">
            {subtitle && (
              <div className="intro-section alignCenter">
                <h2 className="fancy-title">{subtitle}</h2>
              </div>
            )}
            <PostSection posts={posts} />
          </div>
        </section>
      )}
      <ColumnBanner columnBanner={columnBanner} />
    </main>
  )
}

const CaseStudies = ({ data }) => (
  <Layout meta={data.page.frontmatter.meta || false}>
    <CaseStudiesTemplate
      {...data.page}
      {...data.page.fields}
      {...data.page.frontmatter}
      posts={data.posts.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
      {...data.globalSections.frontmatter}
    />
  </Layout>
)

export default CaseStudies

export const pageQuery = graphql`
  query CaseStudies($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        subtitle
        featuredImage
        meta {
          description
          title
          canonicalLink
        }
      }
    }
    posts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "happySailors" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            contentType
          }
          frontmatter {
            title
            cruiseType
            featuredImage
            date
          }
        }
      }
    }
    globalSections: markdownRemark(
      fields: { slug: { eq: "/global-sections/" } }
    ) {
      frontmatter {
        columnBanner {
          buttonTitle
          buttonUrl
          featuredImage
          title
        }
      }
    }
  }
`
