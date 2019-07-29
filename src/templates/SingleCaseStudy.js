import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import _format from 'date-fns/format'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import _get from 'lodash/get'

import { ICONQuotes } from '../components/Icons'
import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Image from '../components/Image'
import VideoPopup from '../components/VideoPopup'
import SocialShare from '../components/SocialShare'
import GallerySlider from '../components/GallerySlider'
import SecondaryBanner from '../components/SecondaryBanner'
import './SingleCaseStudy.css'

export const SingleCaseStudyTemplate = ({
  title,
  cruiseType,
  date,
  featuredImage,
  videoSection,
  secondaryImage,
  body,
  excerpt,
  gallery,
  banner,
  secondaryBanner,
  meta
}) => {
  const bannerTitle = _get(banner, '[0]frontmatter.title') || ''
  const bannerImage = _get(banner, '[0]frontmatter.featuredImage') || ''

  return (
    <main className="SingleCaseStudy">
      <Helmet title={meta ? meta.title : `${title} | Sailing in Paradise`}>
        {meta && <meta name="description" content={meta.description} />}
        {meta && <link rel="canonical" href={meta.canonical} />}
      </Helmet>

      <PageHeader title={bannerTitle} backgroundImage={bannerImage} />

      <div className="container">
        <div className="SingleCaseStudy--Content">
          {title && <h2>{title}</h2>}
          <div className="SinglePost--Meta">
            {cruiseType && <p>{cruiseType}</p>}
            {date && (
              <Fragment>
                <span>|</span>
                <time
                  className="SinglePost--Meta--Date"
                  itemProp="dateCreated pubdate datePublished"
                  date={date}
                >
                  {_format(date, 'MMMM, YYYY')}
                </time>
              </Fragment>
            )}
          </div>
          <div className="SingleCaseStudy--Body">
            <div className="columnLeft">
              {featuredImage && (
                <div className="img-container">
                  <Image
                    background
                    src={`${featuredImage}-/format/auto/-/quality/lighter/-/progressive/yes/-/resize/500/`}
                  />
                </div>
              )}
              {secondaryImage ? (
                <div className="img-container">
                  <Image
                    background
                    src={`${secondaryImage}-/format/auto/-/quality/lighter/-/progressive/yes/-/resize/1000/`}
                  />
                </div>
              ) : (
                <VideoPopup {...videoSection} />
              )}
            </div>
            <div className="columnRight">
              {body && <Content src={body} />}
              {excerpt && (
                <div className="quote">
                  <p className="name">{title}</p>
                  <ICONQuotes />
                  <p>{excerpt}</p>
                </div>
              )}
            </div>
          </div>
          <SocialShare />
        </div>
      </div>
      {gallery && <GallerySlider gallery={gallery} />}
      {secondaryBanner && <SecondaryBanner {...secondaryBanner} />}
    </main>
  )
}

const SingleCaseStudy = ({ data, pageContext }) => {
  const { post, archiveBanner, globalVideo } = data
  const banner = archiveBanner
    ? archiveBanner.edges.map(edge => ({ ...edge.node }))
    : []
  return (
    <Layout meta={post.frontmatter.meta || false}>
      <SingleCaseStudyTemplate
        {...post}
        {...post.frontmatter}
        {...globalVideo}
        banner={banner}
        body={post.html}
      />
    </Layout>
  )
}

export default SingleCaseStudy

export const pageQuery = graphql`
  ## Query for SingleCaseStudy data
  query SingleCaseStudy($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        cruiseType
        date
        excerpt
        featuredImage
        videoSection {
          video
          imageOverlay
        }
        secondaryImage
        gallery {
          image
        }
        secondaryBanner {
          buttonTitle
          buttonUrl
          title
          subtitle
          featuredImage
        }
        meta {
          description
          title
          canonicalLink
        }
      }
    }
    archiveBanner: allMarkdownRemark(
      filter: { fields: { slug: { eq: "/happy-sailors/" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            featuredImage
          }
        }
      }
    }
  }
`
