import React from 'react'
import Button from './Button'
import { Link } from 'gatsby'

import { ICONButtonArrows } from './Icons'

import './ContentBox.css'

export default ({ title, buttonTitle, buttonUrl, charterUrl }) => {
  if (!title) return null

  return (
    <div className="contentBox">
      <div className="contentBox-container">
        {title && <h3>{title}</h3>}
        {charterUrl ? (
          <Link
            className="button"
            to={`/${buttonUrl}${charterUrl &&
              buttonUrl === 'booking-enquiry' &&
              `?charter=${charterUrl}`}`}
          >
            {buttonTitle}
            <ICONButtonArrows />
          </Link>
        ) : (
          <Button title={buttonTitle} url={buttonUrl} />
        )}
      </div>
    </div>
  )
}
