import React from 'react'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import _get from 'lodash/get'
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
          <div class="container">
            <h1>Oops!</h1>
            <h3>Page not found</h3>
            <p>Looks like you're lost..</p>
            <Link className='button' to="/">
              Take me Home
              <ICONButtonArrows/>
            </Link>
          </div>
        </section>
      </Layout>
    )}
  />
)
