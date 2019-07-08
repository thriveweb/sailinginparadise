import CMS from 'netlify-cms-app'
<<<<<<< HEAD
import uploadcare from 'netlify-cms-media-library-uploadcare';
import HomePagePreview from './previews/HomePagePreview'

// import { HomePageTemplate } from '../templates/HomePage'
// import { AboutPageTemplate } from '../templates/AboutPage'
// import { ContactPageTemplate } from '../templates/ContactPage'
// import { DefaultPageTemplate } from '../templates/DefaultPage'
// import { BlogIndexTemplate } from '../templates/BlogIndex'
// import { SinglePostTemplate } from '../templates/SinglePost'
// import { PrivateChartersTemplate } from '../templates/PrivateCharters'
// import { BookingPageTemplate } from '../templates/Booking'
// import { CruisesTemplate } from '../templates/Cruises'
// import { CaseStudiesTemplate } from '../templates/CaseStudies'
// import { BoatsPageTemplate } from '../templates/BoatsPage'
// import { SingleCaseStudyTemplate } from '../templates/SingleCaseStudy'
// import { SingleBoatTourTemplate } from '../templates/SingleBoatTour'

CMS.registerMediaLibrary(uploadcare)

// CMS.registerPreviewStyle('/styles.css')



CMS.registerPreviewTemplate('home-page', HomePagePreview)



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
=======
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import ProductPagePreview from './preview-templates/ProductPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('products', ProductPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
>>>>>>> 3a6f4bfb11fe05440fd95d2e7727f5f60d86dc13
