import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
// import _format from 'date-fns/format'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

import { ICONQuotes } from '../components/Icons'
import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Video from '../components/Video'
import SocialShare from '../components/SocialShare'
import GallerySlider from '../components/GallerySlider'
import SecondaryBanner from '../components/SecondaryBanner'
import './SingleCaseStudy.css'

export const SingleCaseStudyTemplate = ({
  title,
  name,
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

  return (
    <main className="SingleCaseStudy">
      <Helmet title={meta ? meta.title : `${title} | Sailing in Paradise`}>
        {meta && <meta name="description" content={meta.description} />}
        {meta && <link rel="canonical" href={meta.canonical} />}
      </Helmet>

      {banner &&
        banner.map(({ frontmatter }, index) => {
          const { title, featuredImage } = frontmatter
          return (
            <PageHeader
              key={index}
              title={title}
              backgroundImage={featuredImage}
            />
          )
        })}
 
      <div className="container">
        <div className="SingleCaseStudy--Content">
          {name && <h2>{name}</h2>}
          <div className="SinglePost--Meta">
            {title && <p>{title}</p>}
            {date && (
              <Fragment>
                <span>|</span>
                <time
                  className="SinglePost--Meta--Date"
                  itemProp="dateCreated pubdate datePublished"
                  date={date}
                >
                  {/* {_format(date, 'MMMM, YYYY')} */}
                </time>
              </Fragment>
            )}
          </div>
          <div className="SingleCaseStudy--Body">
            <div className="columnLeft">
              {featuredImage &&
                <div className='img-container'>
                  <div
                    style={{
                      backgroundImage: `url(${`${featuredImage}-/quality/lighter/-/progressive/yes/-/resize/1x/-/quality/lighter/`})`,
                      backgroundSize: 'cover'
                    }}
                    data-src={`${featuredImage}-/quality/lighter/-/progressive/yes/-/resize/500/`}
                    className='BackgroundImage absolute lazy'
                  >
                  </div>
                </div>
              }
              {secondaryImage
                ? <div className='img-container'>
                    <div
          						style={{
          							backgroundImage: `url(${`${secondaryImage}-/quality/lighter/-/progressive/yes/-/resize/1x/-/quality/lighter/`})`,
          							backgroundSize: 'cover'
          						}}
          						data-src={`${secondaryImage}-/quality/lighter/-/progressive/yes/-/resize/1000/`}
          						className='BackgroundImage absolute lazy'
          					>
          					</div>
                  </div>
                : <Video {...videoSection} />
              }
            </div>
            <div className='columnRight'>
              {body && <Content src={body} />}
              {excerpt && (
                <div className='quote'>
                  <p className='name'>{title}</p>
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
        name
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
    archiveBanner: allMarkdownRemark(filter: {id: {eq: "588061a2-5982-5cb1-a55b-36c2e2a7a00a"}}) {
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
