import '../layouts/globalStyles.css'

import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Meta from './Meta'
import Nav from './Nav'
import Footer from './Footer'

class Layout extends Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query IndexLayoutQuery {
            settingsYaml {
              siteTitle
              siteDescription
              siteUrl
              headerScripts
            }
            charters: allMarkdownRemark(
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
                  }
                }
              }
            }
            cruises: allMarkdownRemark(
              filter: {
                fields: { contentType: { eq: "boatTours" } }
                frontmatter: { tourType: { eq: "Cruise" } }
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
                  }
                }
              }
            }
            navItems: markdownRemark(fields: { slug: { eq: "/nav-items/" } }) {
              frontmatter {
                navItems {
                  title
                  optionalTitle
                  subNavItems {
                    title
                    optionalTitle
                  }
                }
              }
            }
            globalSections: markdownRemark(
              fields: { slug: { eq: "/global-sections/" } }
            ) {
              frontmatter {
                bookingPopup {
                  title
                  contentBoxes {
                    buttonTitle
                    buttonUrl
                    icon
                    title
                  }
                }
                footerContent
              }
            }
            contactInfo: markdownRemark(
              fields: { slug: { eq: "/general-contact/" } }
            ) {
              frontmatter {
                socialMedia {
                  facebook
                  instagram
                  googlePlus
                  tripAdvisor
                }
              }
            }
            allPosts: allMarkdownRemark(
              filter: { fields: { contentType: { eq: "postCategories" } } }
              sort: { order: DESC, fields: [frontmatter___date] }
            ) {
              edges {
                node {
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
        `}
        render={data => {
          const { children, meta, title, location } = this.props
          const { contactInfo, globalSections, navItems, charters, cruises } =
            data || {}
          //const siteTitle = _get(settingsYaml, 'siteTitle') || ''

          const boatCharters = charters
            ? charters.edges.map(edge => ({ ...edge.node }))
            : []
          const cruiseTours = cruises
            ? cruises.edges.map(edge => ({ ...edge.node }))
            : []

          return (
            <Fragment>
              <Helmet titleTemplate={`%s`}>
                {title}
                {/* Add font link tags here */}
                <meta
                  name="msvalidate.01"
                  content="B0112812CA622A13C327AF572E2BA5B5"
                />

                <meta 
                  property='og:image'
                  content='/uploads/279fc1b4-8074-4e4c-b836-3632ff3d6597.jpg'
                />
                <meta 
                  property='twitter:image'
                  content='/uploads/279fc1b4-8074-4e4c-b836-3632ff3d6597.jpg'
                />

                <script
                  type="text/javascript"
                  src="https://sailinginparadise.rezdy.com/pluginJs?script=modal"
                ></script>
              </Helmet>

              <Meta {...meta} {...data.settingsYaml} />

              <Nav
                charters={boatCharters}
                cruises={cruiseTours}
                settings={globalSections}
                location={location}
                navList={navItems}
                bookingPopup={globalSections}
              />

              <Fragment>{children}</Fragment>

              <Footer
                contactInfo={contactInfo}
                globalSections={globalSections}
                navList={navItems}
              />
            </Fragment>
          )
        }}
      />
    )
  }
}

export default Layout
