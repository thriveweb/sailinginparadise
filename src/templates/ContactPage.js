import React from 'react'
import Helmet from 'react-helmet'
import _get from 'lodash/get'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'


import PageHeader from '../components/PageHeader'
import IntroText from '../components/IntroText'
import Content from '../components/Content'
import SecondaryBanner from '../components/SecondaryBanner'
import './ContactPage.css'

// Export Template for use in CMS preview
export const ContactPageTemplate = ({
  body,
  title,
  featuredImage,
  intro,
  secondaryBanner,
  meta,
  contactInfo
}) => {

  contactInfo = contactInfo ? contactInfo.edges.map(edge => ({ ...edge.node.frontmatter })) : []
  const phone = _get(contactInfo[0], 'phone') || ''
  const address = _get(contactInfo[0], 'address') || ''
  const hours = _get(contactInfo[0], 'hours') || ''
  const map = _get(contactInfo[0], 'map') || ''

  return (
    <main className="Contact">
      <Helmet title={meta ? meta.title : `${title} | Sailing in Paradise`}>
        {meta && <meta name="description" content={meta.description} />}
        {meta && <link rel="canonical" href={meta.canonical} />}
      </Helmet>

      <PageHeader title={title} backgroundImage={featuredImage} />

      <section className="section Contact--Section1">
        <div className="container Contact--Section1--Container">
          <IntroText content={intro} center />
          <div className="Contact--Details">
            {phone && (
              <Content className="Contact--Details--Item" src={phone} />
            )}
            {address && (
              <Content className="Contact--Details--Item" src={address} />
            )}
            {hours && (
              <Content className="Contact--Details--Item" src={hours} />
            )}
          </div>
          <div className="contact-body">
            {map &&
              <div className="image-container">
                <div
                  style={{
                    backgroundImage: `url(${`${map}-/quality/lighter/-/progressive/yes/-/resize/1x/-/quality/lighter/`})`,
                    backgroundSize: 'cover'
                  }}
                  data-src={`${map}-/quality/lighter/-/progressive/yes/-/resize/600/`}
                  className='BackgroundImage absolute lazy'
                >
                </div>
              </div>
            }
            {body && <Content src={body} />}
          </div>
        </div>
      </section>
      <SecondaryBanner {...secondaryBanner} />
    </main>
  )
}

const ContactPage = ({ data: { page, globalSections } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <ContactPageTemplate
      {...page.frontmatter}
      body={page.html}
      contactInfo={globalSections}
    />
  </Layout>
)

export default ContactPage

export const pageQuery = graphql`
  query ContactPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        template
        featuredImage
        intro
        secondaryBanner {
          buttonTitle
          buttonUrl
          subtitle
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
    globalSections: allMarkdownRemark(filter: {fields: {slug: {eq: "/general-contact/"}}}) {
  	  edges {
  	    node {
  	      frontmatter {
  					phone
            hours
            address
            map
  	      }
  	    }
  	  }
  	}
  }
`
