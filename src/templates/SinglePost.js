import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import _get from 'lodash/get'
import _format from 'date-fns/format'
import { graphql, Link } from 'gatsby'
import { ChevronLeft } from 'react-feather'
import Layout from '../components/Layout'

import { ICONSail } from '../components/Icons'
import Content from '../components/Content'
import Image from '../components/Image'
import Video from '../components/Video'
import SocialShare from '../components/SocialShare'
import './SinglePost.css'

export const SinglePostTemplate = ({
  title,
  date,
  featuredImage,
  videoSection,
  body,
  contentSecondary,
  nextPostURL,
  prevPostURL,
  categories = [],
  meta
}) => (
  <main
    className="SinglePost"
    itemScope
    itemType="http://schema.org/BlogPosting"
  >
    <Helmet title={meta ? meta.title : `${title} | Sailing in Paradise`}>
      {meta && <meta name="description" content={meta.description} />}
      {meta && <link rel="canonical" href={meta.canonical} />}
    </Helmet>
    {featuredImage &&
      <div className='SinglePost--Banner'>
        <Image background src={`${featuredImage}-/format/auto/-/quality/lighter/-/progressive/yes/-/resize/2000/`} />
      </div>
    }
    <div className="container skinny">
      <Link className="SinglePost--BackButton" to="/blog/">
        <ChevronLeft /> BACK
      </Link>
      <div className="SinglePost--Content relative">
        <div className="post-icon">
          <ICONSail />
        </div>
        <div className="SinglePost--Meta">
          {date && (
            <time
              className="SinglePost--Meta--Date"
              itemProp="dateCreated pubdate datePublished"
              date={date}
            >
              {_format(date, 'D.MM.YYYY')}
            </time>
          )}
          {categories.length && (
            <Fragment>
              <span>|</span>
              {categories.map((cat, index) => (
                <span key={cat.category} className="SinglePost--Meta--Category">
                  {cat.category}
                  {/* Add a comma on all but last category */}
                  {index !== categories.length - 1 ? ',' : ''}
                </span>
              ))}
            </Fragment>
          )}
        </div>

        {title && (
          <h1 className="SinglePost--Title" itemProp="title">
            {title}
          </h1>
        )}

        <div className="SinglePost--InnerContent">
          <Content src={body} />
          <Video {...videoSection} />
          <Content src={contentSecondary} />
          <SocialShare />
          <div className="SinglePost--Pagination">
            {prevPostURL && (
              <Link
                className="SinglePost--Pagination--Link prev"
                to={prevPostURL}
              >
                Prev
              </Link>
            )}
            {nextPostURL && (
              <Link
                className="SinglePost--Pagination--Link next"
                to={nextPostURL}
              >
                Next
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  </main>
)

const SinglePost = ({ data, pageContext }) => {
  const { post, allPosts } = data
  const thisEdge = allPosts.edges.find(edge => edge.node.id === post.id)
  return (
    <Layout meta={post.frontmatter.meta || false}>
      <SinglePostTemplate
        {...post}
        {...post.frontmatter}
        body={post.html}
        nextPostURL={_get(thisEdge, 'next.fields.slug')}
        prevPostURL={_get(thisEdge, 'previous.fields.slug')}
      />
    </Layout>
  )
}

export default SinglePost

export const pageQuery = graphql`
  ## Query for SinglePost data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SinglePost($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      html
      id
      frontmatter {
        title
        template
        date
        categories {
          category
        }
        featuredImage
        videoSection {
          video
          imageOverlay
        }
        contentSecondary
        meta {
          description
          title
          canonicalLink
        }
      }
    }

    allPosts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        previous {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
