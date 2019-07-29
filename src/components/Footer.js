import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import _kebabCase from 'lodash/kebabCase'
import _get from 'lodash/get'
import { ICONSail } from './Icons'
import Content from './Content'
import SocialLinks from './SocialLinks'
import EnquiryForm from './EnquiryForm'

import './Footer.css'

export default props => {
  const navList = _get(props, 'navList') || []
  const globalSections = _get(props, 'globalSections') || []
  const contactInfo = _get(props, 'contactInfo') || []

  const navItems = (navList && _get(navList.frontmatter, 'navItems')) || []
  const footerContent = _get(globalSections.frontmatter, 'footerContent')
  const socialMedia = _get(contactInfo.frontmatter, 'socialMedia')

  const charters = navItems.filter(item => item.title === 'Catamaran Charters')
  const cruises = navItems.filter(item => item.title === 'Cruise Tickets')

  const today = new Date()
  const yyyy = today.getFullYear()

  return (
    <footer className="Footer" id="footer-blur">
      <div className="container large">
        <div className="Footer-Top">
          <div className="sail-icon">
            <ICONSail />
          </div>
          <div className="footer-col col1">
            <h4>
              <Link to="/about/">About</Link>
            </h4>
            {footerContent && <Content src={footerContent} />}
            {socialMedia && <SocialLinks socialMedia={socialMedia} />}
          </div>
          <div className="footer-col col2">
            {cruises.map(({ title, subNavItems }, index) => {
              return (
                <Fragment key={`cruise-nav-${index}`}>
                  <h4>
                    <Link to="/cruise-tickets/">{title}</Link>
                  </h4>
                  {subNavItems &&
                    subNavItems.map(({ title, slug }, index) => (
                      <Link
                        key={`cruise-subNav-${index}`}
                        className="NavLink"
                        to={`/cruise/${_kebabCase(title)}`}
                      >
                        {title}
                      </Link>
                    ))}
                </Fragment>
              )
            })}
            <h4>Info</h4>
            <Link className="NavLink" to="/our-boats/">
              Our Boats
            </Link>
            <Link className="NavLink" to="/about-us/">
              About us
            </Link>
            <Link className="NavLink" to="/happy-sailors/">
              Happy Sailors
            </Link>
            <Link className="NavLink" to="/latest-news/">
              Latest News
            </Link>
            <Link className="NavLink" to="/contact-us/">
              Contact us
            </Link>
          </div>
          <div className="footer-col col3">
            {charters.map(({ title, subNavItems }, index) => {
              return (
                <Fragment key={`charter-nav-${index}`}>
                  <h4>
                    <Link to="/boat-charters/">{title}</Link>
                  </h4>
                  {subNavItems &&
                    subNavItems.map(({ title }, index) => (
                      <Link
                        key={`charter-subNav-${index}`}
                        className="NavLink"
                        to={`/boat-charters/${_kebabCase(title)}`}
                      >
                        {title}
                      </Link>
                    ))}
                </Fragment>
              )
            })}
          </div>
          <div className="footer-col col4">
            <h4>Quick contact</h4>
            <EnquiryForm />
            <Link className="button" to="/booking-enquiry/">
              Enquire About Hiring our Boats
            </Link>
            <Link className="button" to="/cruises/">
              Book Tickets on a Cruise
            </Link>
          </div>
        </div>
        <div className="Footer-Bottom">
          <span>
            © {yyyy} All rights reserved. {' | '}
            <Link className="" to="/terms-of-use/">
              Terms of Use
            </Link>
            {' | '}
            <Link className="" to="/privacy-policy/">
              Privacy Policy
            </Link>
          </span>

          <p>
            <a
              href="https://thriveweb.com.au/"
              title="website design"
              target="_blank"
              rel="noopener noreferrer"
            >
              Website Design
            </a>{' '}
            - by THRIVE
          </p>
        </div>
      </div>
    </footer>
  )
}
