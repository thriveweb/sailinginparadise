import React from 'react'
import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'

import './cms-utils'

import { HomePageTemplate } from '../templates/HomePage'
import { AboutPageTemplate } from '../templates/AboutPage'
import { ContactPageTemplate } from '../templates/ContactPage'
import { DefaultPageTemplate } from '../templates/DefaultPage'
import { BlogIndexTemplate } from '../templates/BlogIndex'
import { SinglePostTemplate } from '../templates/SinglePost'
import { PrivateChartersTemplate } from '../templates/PrivateCharters'
import { BookingPageTemplate } from '../templates/Booking'
import { BookingThankYouPageTemplate } from '../templates/BookingThankYou'
import { CruisesTemplate } from '../templates/Cruises'
import { CaseStudiesTemplate } from '../templates/CaseStudies'
import { BoatsPageTemplate } from '../templates/BoatsPage'
import { SingleCaseStudyTemplate } from '../templates/SingleCaseStudy'
import { SingleBoatTourTemplate } from '../templates/SingleBoatTour'
import { SingleBoatTemplate } from '../templates/SingleBoat'
import { SingleFaqPageTemplate } from '../templates/SingleFaqPage'

// CMS.registerMediaLibrary(uploadcare)

CMS.registerPreviewTemplate('home-page', ({ entry }) => (
  <HomePageTemplate {...entry.getIn(['data']).toJS()} />
))

CMS.registerPreviewTemplate('about-page', ({ entry }) => (
  <AboutPageTemplate {...entry.getIn(['data']).toJS()} />
))
CMS.registerPreviewTemplate('contact-page', ({ entry }) => (
  <ContactPageTemplate {...entry.getIn(['data']).toJS()} />
))
CMS.registerPreviewTemplate('defaultPages', ({ entry }) => (
  <DefaultPageTemplate {...entry.getIn(['data']).toJS()} />
))
CMS.registerPreviewTemplate('blog-page', ({ entry }) => (
  <BlogIndexTemplate {...entry.getIn(['data']).toJS()} />
))
CMS.registerPreviewTemplate('posts', ({ entry }) => (
  <SinglePostTemplate {...entry.getIn(['data']).toJS()} />
))
CMS.registerPreviewTemplate('privateCharters', ({ entry }) => (
  <PrivateChartersTemplate {...entry.getIn(['data']).toJS()} />
))
CMS.registerPreviewTemplate('booking-page', ({ entry }) => (
  <BookingPageTemplate {...entry.getIn(['data']).toJS()} />
))
CMS.registerPreviewTemplate('booking-thank-you-page', ({ entry }) => (
  <BookingThankYouPageTemplate {...entry.getIn(['data']).toJS()} />
))
CMS.registerPreviewTemplate('cruises', ({ entry }) => (
  <CruisesTemplate {...entry.getIn(['data']).toJS()} />
))
CMS.registerPreviewTemplate('case-studies-page', ({ entry }) => (
  <CaseStudiesTemplate {...entry.getIn(['data']).toJS()} />
))
CMS.registerPreviewTemplate('ourBoats', ({ entry }) => (
  <BoatsPageTemplate {...entry.getIn(['data']).toJS()} />
))
CMS.registerPreviewTemplate('caseStudy', ({ entry }) => (
  <SingleCaseStudyTemplate {...entry.getIn(['data']).toJS()} />
))
CMS.registerPreviewTemplate('happySailor', ({ entry }) => (
  <SingleCaseStudyTemplate {...entry.getIn(['data']).toJS()} />
))
CMS.registerPreviewTemplate('boatTours', ({ entry }) => (
  <SingleBoatTourTemplate {...entry.getIn(['data']).toJS()} />
))
CMS.registerPreviewTemplate('boats', ({ entry }) => (
  <SingleBoatTemplate {...entry.getIn(['data']).toJS()} />
))
CMS.registerPreviewTemplate('faqPages', ({ entry }) => (
  <SingleFaqPageTemplate {...entry.getIn(['data']).toJS()} />
))
