import React from 'react'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import { ICONButtonArrows } from '../components/Icons'

import Layout from '../components/Layout'

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query NotFoundPageQuery {
        globalSettings: settingsYaml {
          siteTitle
        }
      }
    `}
    render={data => (
      <Layout>
        <Helmet>
          <title>404 – Page Not Found</title>
        </Helmet>
        <section className="error-404">
          <div class="container skinny">
            <p>
              <div
                style={{
                  background: `url(/images/logo-new.png) center no-repeat`,
                  with: `500px`,
                  height: `200px`
                }}
              />
            </p>
            <p>Oops sorry, looks like we’ve missed a link.</p>
            <p>Take me to Sailing in Paradise homepage</p>
            <Link className="button" to="/">
              Take me Home
              <ICONButtonArrows />
            </Link>
          </div>
        </section>
      </Layout>
    )}
  />
)
