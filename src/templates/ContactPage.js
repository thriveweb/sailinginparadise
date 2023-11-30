import React from 'react'
import Helmet from 'react-helmet'
import _get from 'lodash/get'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import IntroText from '../components/IntroText'
import Content from '../components/Content'
import SecondaryBanner from '../components/SecondaryBanner'
import Image from '../components/Image'
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
  contactInfo = contactInfo
    ? contactInfo.edges.map(edge => ({ ...edge.node.frontmatter }))
    : []
  const phoneTitle = _get(contactInfo[0], 'phoneTitle') || ''
  const phone = _get(contactInfo[0], 'phone') || ''
  const emailTitle = _get(contactInfo[0], 'emailTitle') || ''
  const email = _get(contactInfo[0], 'email') || ''
  const address = _get(contactInfo[0], 'address') || ''
  const addressButtonTitle = _get(contactInfo[0], 'addressButtonTitle') || ''
  const addressButtonUrl = _get(contactInfo[0], 'addressButtonUrl') || ''
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
            <div className="Content Contact--Details--Item">
              {phoneTitle && (
                <p>
                  <strong>CALL US ON</strong>
                </p>
              )}
              {phone && (
                <p>
                  <a className="contact-phone" href={`tel:${phone}`}>
                    {phone}
                  </a>
                </p>
              )}
              {emailTitle && (
                <p>
                  <strong>EMAIL US AT</strong>
                </p>
              )}
              {email && (
                <p>
                  <a className="contact-email" href={`mailto:${email}`}>
                    Click to email
                  </a>
                </p>
              )}
            </div>

            {address && (
              <div className="Contact--Details--Item">
                <Content src={address} />
                {addressButtonUrl && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={addressButtonUrl}
                  >
                    {addressButtonTitle}
                  </a>
                )}
              </div>
            )}

            {hours && (
              <Content className="Contact--Details--Item" src={hours} />
            )}
          </div>
          <div className="contact-body">
            {addressButtonUrl.length > 1 && map ? (
              <div className="map relative">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={addressButtonUrl}
                >
                  <Image
                    src={`${map}-/format/auto/-/quality/lighter/-/progressive/yes/-/resize/700/`}
                  />
                </a>
              </div>
            ) : map ? (
              <div className="map relative">
                <Image
                  src={`${map}-/format/auto/-/quality/lighter/-/progressive/yes/-/resize/700/`}
                />
              </div>
            ) : (
              ''
            )}
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
    globalSections: allMarkdownRemark(
      filter: { fields: { slug: { eq: "/general-contact/" } } }
    ) {
      edges {
        node {
          frontmatter {
            phoneTitle
            phone
            emailTitle
            email
            hours
            address
            addressButtonTitle
            addressButtonUrl
            map
          }
        }
      }
    }
  }
`
