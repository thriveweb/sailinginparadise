import React from 'react'
import { HomePageTemplate } from '../../templates/HomePage'

const HomePagePreview = ({ entry, widgetFor }) => (
  <HomePageTemplate
    // title={entry.getIn(['data', 'title'])}
    // content={widgetFor('content')}
  />
)

export default HomePagePreview
