import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import IntroText from '../components/IntroText'
import GallerySlider from '../components/GallerySlider'
import CaptainListing from '../components/CaptainListing'
import CrewGallery from '../components/CrewGallery'
import SecondaryBanner from '../components/SecondaryBanner'
import ColumnBanner from '../components/ColumnBanner'
import Video from '../components/Video'
import './AboutPage.css'

// Export Template for use in CMS preview
export const AboutPageTemplate = ({
  title,
  intro,
  gallery,
  featuredImage,
  captainSection,
  crewSection,
  secondaryBanner,
  columnBanner,
  videoSection,
  meta
}) => {
  return (
    <main className="About">
      <Helmet title={meta ? meta.title : `${title} | Sailing in Paradise`}>
        {meta && <meta name="description" content={meta.description} />}
        {meta && <link rel="canonical" href={meta.canonical} />}
      </Helmet>
      <PageHeader title={title} backgroundImage={featuredImage} />
      <IntroText content={intro} center />
      <GallerySlider gallery={gallery} />
      <CaptainListing {...captainSection} />
      <CrewGallery {...crewSection} />
      <SecondaryBanner {...secondaryBanner} large />
      <Video {...videoSection} videoBanner />
      <ColumnBanner columnBanner={columnBanner} />
    </main>
  )
}

const AboutPage = ({ data: { page, globalVideo } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <AboutPageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default AboutPage

export const pageQuery = graphql`
  query AboutPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        featuredImage
        intro
        gallery {
          image
        }
        captainSection {
          captainIntro
          captain {
            description
            name
            title
            image
            socialMedia {
              linkedin
              twitter
            }
          }
        }
        crewSection {
          crewIntro
          crew {
            name
            title
            image
            content
          }
        }
        secondaryBanner {
          buttonTitle
          buttonUrl
          title
          subtitle
          featuredImage
        }
        videoSection {
          imageOverlay
          title
          video
        }
        columnBanner {
          buttonTitle
          buttonUrl
          title
          featuredImage
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
