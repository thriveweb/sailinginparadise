import React from 'react'
import CMS from 'netlify-cms-app'
import './cms-utils'

import { HomePageTemplate } from '../templates/HomePage'
import { AboutPageTemplate } from '../templates/AboutPage'
import { ContactPageTemplate } from '../templates/ContactPage'
import { DefaultPageTemplate } from '../templates/DefaultPage'
import { BlogIndexTemplate } from '../templates/BlogIndex'
import { SinglePostTemplate } from '../templates/SinglePost'
import { PrivateChartersTemplate } from '../templates/PrivateCharters'
import { BookingPageTemplate } from '../templates/Booking'
import { CruisesTemplate } from '../templates/Cruises'
import { CaseStudiesTemplate } from '../templates/CaseStudies'
import { BoatsPageTemplate } from '../templates/BoatsPage'
import { SingleCaseStudyTemplate } from '../templates/SingleCaseStudy'
import { SingleBoatTourTemplate } from '../templates/SingleBoatTour'

CMS.init()
// CMS.registerPreviewStyle('/styles.css')

CMS.registerPreviewTemplate('home-page', <HomePageTemplate />)

// CMS.registerPreviewTemplate('about-page', ({ entry }) => (
//   <AboutPageTemplate {...entry.toJS().data} />
// ))
// CMS.registerPreviewTemplate('contact-page', ({ entry }) => (
//   <ContactPageTemplate {...entry.toJS().data} />
// ))
// CMS.registerPreviewTemplate('infoPages', ({ entry }) => (
//   <DefaultPageTemplate {...entry.toJS().data} />
// ))
// CMS.registerPreviewTemplate('blog-page', ({ entry }) => (
//   <BlogIndexTemplate {...entry.toJS().data} />
// ))
// CMS.registerPreviewTemplate('posts', ({ entry }) => (
//   <SinglePostTemplate {...entry.toJS().data} />
// ))
// CMS.registerPreviewTemplate('privateCharters', ({ entry }) => (
//   <PrivateChartersTemplate {...entry.toJS().data} />
// ))
// CMS.registerPreviewTemplate('booking-page', ({ entry }) => (
//   <BookingPageTemplate {...entry.toJS().data} />
// ))
// CMS.registerPreviewTemplate('cruises', ({ entry }) => (
//   <CruisesTemplate {...entry.toJS().data} />
// ))
// CMS.registerPreviewTemplate('case-studies-page', ({ entry }) => (
//   <CaseStudiesTemplate {...entry.toJS().data} />
// ))
// CMS.registerPreviewTemplate('ourBoats', ({ entry }) => (
//   <BoatsPageTemplate {...entry.toJS().data} />
// ))
// CMS.registerPreviewTemplate('caseStudy', ({ entry }) => (
//   <SingleCaseStudyTemplate {...entry.toJS().data} />
// ))
// CMS.registerPreviewTemplate('boatTours', ({ entry }) => (
//   <SingleBoatTourTemplate {...entry.toJS().data} />
// ))
