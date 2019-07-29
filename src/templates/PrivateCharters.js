import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import IntroText from '../components/IntroText'
import SortArray from '../components/SortArray'

// Export Template for use in CMS preview
export const PrivateChartersTemplate = ({
  title,
  featuredImage,
  intro,
  posts,
  chartersListing,
  meta
}) => {
  return (
    <main className="Blog">
      <Helmet title={meta ? meta.title : `${title} | Sailing in Paradise`}>
        {meta && <meta name="description" content={meta.description} />}
        {meta && <link rel="canonical" href={meta.canonical} />}
      </Helmet>
      <PageHeader title={title} backgroundImage={featuredImage} />
      <IntroText content={intro} center />
      <SortArray order={chartersListing} items={posts} />
    </main>
  )
}

const PrivateCharters = ({ data }) => (
  <Layout meta={data.page.frontmatter.meta || false}>
    <PrivateChartersTemplate
      {...data.page}
      {...data.page.fields}
      {...data.page.frontmatter}
      posts={data.posts.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
    />
  </Layout>
)

export default PrivateCharters

export const pageQuery = graphql`
  ## Query for PrivateCharters data
  query PrivateCharters($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        template
        featuredImage
        intro
        chartersListing {
          tours
        }
        meta {
          description
          title
          canonicalLink
        }
      }
    }
    posts: allMarkdownRemark(
      filter: {
        fields: { contentType: { eq: "boatTours" } }
        frontmatter: { tourType: { eq: "Boat Charter" } }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            featuredImage
          }
        }
      }
    }
  }
`
