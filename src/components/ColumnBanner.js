import React from 'react'
import { Link } from 'gatsby'

import { ICONButtonArrows } from './Icons'
import Button from './Button'
import Content from './Content'
import Image from './Image'
import './ColumnBanner.css'

export default ({
  columnBanner,
  boatTour,
  className = '',
  charterUrl,
  bookingIframe
}) => {
  if (!columnBanner) return null

  if (boatTour) className += ' boatTour'

  if (bookingIframe)
    return (
      <div className={`bookingIframe columnsBanner ${className}`}>
        {columnBanner.map(
          (
            {
              title,
              buttonTitle,
              buttonUrl,
              featuredImage,
              content,
              bookingWidget
            },
            index
          ) => {
            if (!title && !content)
              return (
                <div className="bannerColumn relative overlay" key={index}>
                  {featuredImage && (
                    <Image
                      background
                      src={`${featuredImage}-/format/auto/-/quality/lighter/-/progressive/yes/-/resize/1000/`}
                    />
                  )}
                </div>
              )

            return (
              <div className="bannerColumn relative overlay" key={index}>
                {featuredImage && (
                  <Image
                    background
                    src={`${featuredImage}-/format/auto/-/quality/lighter/-/progressive/yes/-/resize/1000/`}
                  />
                )}
                <div className="container">
                  {title && <h2 className="title-gradient">{title}</h2>}
                  {content && <Content src={content} />}
                  {bookingWidget ? (
                    <Content src={bookingWidget} />
                  ) : (
                    <Link className="button" to={`/${buttonUrl}`}>
                      {buttonTitle}
                      <ICONButtonArrows />
                    </Link>
                  )}
                </div>
              </div>
            )
          }
        )}
      </div>
    )

  if (charterUrl)
    return (
      <div className={`columnsBanner${className}`}>
        {columnBanner.map(
          (
            { title, buttonTitle, buttonUrl, featuredImage, content },
            index
          ) => {
            return (
              <div className="bannerColumn relative overlay" key={index}>
                {featuredImage && (
                  <Image
                    background
                    src={`${featuredImage}-/format/auto/-/quality/lighter/-/progressive/yes/-/resize/1000/`}
                  />
                )}
                <div className="container">
                  {title && <h2 className="title-gradient">{title}</h2>}
                  {content && <Content src={content} />}

                  {buttonTitle && buttonUrl && (
                    <Link
                      className="button"
                      to={`/${buttonUrl}${charterUrl &&
                        `?charter=${charterUrl}`}`}
                    >
                      {buttonTitle}
                      <ICONButtonArrows />
                    </Link>
                  )}
                </div>
              </div>
            )
          }
        )}
      </div>
    )

  return (
    <div className={`columnsBanner${className}`}>
      {columnBanner.map(
        ({ title, buttonTitle, buttonUrl, featuredImage, content }, index) => {
          return (
            <div className="bannerColumn relative overlay" key={index}>
              {featuredImage && (
                <Image
                  background
                  src={`${featuredImage}-/format/auto/-/quality/lighter/-/progressive/yes/-/resize/1000/`}
                />
              )}
              <div className="container">
                {title && <h2 className="title-gradient">{title}</h2>}
                {content && <Content src={content} />}
                {buttonTitle && buttonUrl && (
                  <Button title={buttonTitle} url={buttonUrl} white />
                )}
              </div>
            </div>
          )
        }
      )}
    </div>
  )
}
