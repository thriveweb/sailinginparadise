import '../layouts/globalStyles.css'

import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import _get from 'lodash/get'
import Meta from './Meta'
import Nav from './Nav'
import Footer from './Footer'

class Layout extends Component {

  componentDidMount = () => {
    var lazyImages = [].slice.call(document.querySelectorAll(".lazy"));

    if ("IntersectionObserver" in window) {
      let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            let lazyImage = entry.target;

            if(lazyImage.dataset.src) {
              if(lazyImage.classList.contains('BackgroundImage')) {
                lazyImage.style.backgroundImage = `url(${lazyImage.dataset.src})`;
              }  else {
                lazyImage.src = lazyImage.dataset.src;
              }

              lazyImage.classList.remove("lazy");
              lazyImageObserver.unobserve(lazyImage);
            }
          }
        });
      });

      lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });
    }
  }

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
                frontmatter: { tourType: { eq: "Private Charter" } }
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
                  subNavItems {
                    title
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
            contactInfo: markdownRemark(fields: { slug: { eq: "/general-contact/" } }) {
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
          const { settingsYaml, contactInfo, globalSections, navItems, charters, cruises } = data || {}
          const siteTitle = _get(settingsYaml, 'siteTitle') || ''

          const privateCharters = charters
            ? charters.edges.map(edge => ({ ...edge.node }))
            : []
          const cruiseTours = cruises
            ? cruises.edges.map(edge => ({ ...edge.node }))
            : []

          return (
            <Fragment>
              <Helmet
                defaultTitle={siteTitle}
                titleTemplate={`%s | ${siteTitle}`}
              >
                {title}
                <link href="https://ucarecdn.com" rel="preconnect" crossorigin />
                <link rel="dns-prefetch" href="https://ucarecdn.com" />
                {/* Add font link tags here */}
              </Helmet>

              <Meta
                {...meta}
                {...data.settingsYaml}
              />

              <Nav
                charters={privateCharters}
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
