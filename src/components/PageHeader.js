import React from 'react'
import PropTypes from 'prop-types'

import './PageHeader.css'

const PageHeader = ({
  title,
  backgroundImage,
  large,
  className = ''
}) => {
  if (large) className += ' PageHeader-large'
  return (
    <div className={`PageHeader relative overlay ${className}`}>
      {backgroundImage &&
        <div
          style={{
            backgroundImage: `url(${`${backgroundImage}-/resize/100x/`})`,
            backgroundSize: 'cover'
          }}
          data-src={`${backgroundImage}-/resize/2000/`}
          className='BackgroundImage absolute lazy'
        >
        </div>
      }
      <div className="container relative">
        <h1 className="PageHeader--Title title-gradient">{title}</h1>
      </div>
    </div>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default PageHeader
