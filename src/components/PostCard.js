import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import _get from 'lodash/get'
import _format from 'date-fns/format'

import Image from './Image'
import { ICONButtonArrows } from './Icons'
import './PostCard.css'

const PostCard = ({
  featuredImage,
  icon,
  title,
  cruiseType,
  date,
  slug = '',
  categories = [],
  className = '',
  excerpt,
  featuredHome,
  fields,
  ...props
}) => {
  if (featuredHome) className += ' featuredHome'

  const contentType = _get(fields, 'contentType') || ''

  return (
    <Link to={slug} className={`PostCard ${className}`}>
      {featuredImage && (
        <div className="PostCard--Image relative">
          {featuredImage && (
            <Image
              background
              src={`${featuredImage}-/format/auto/-/quality/lighter/-/progressive/yes/-/resize/700/`}
            />
          )}
        </div>
      )}
      <div className="PostCard--Content">
        <div className="SinglePost--Meta">
          {contentType === 'happySailors' && date ? (
            <time
              className="SinglePost--Meta--Date"
              itemProp="dateCreated pubdate datePublished"
              date={date}
            >
              {_format(date, 'MMM YYYY')}
            </time>
          ) : contentType !== 'happySailors' && date ? (
            <time
              className="SinglePost--Meta--Date"
              itemProp="dateCreated pubdate datePublished"
              date={date}
            >
              {_format(date, 'D.MM.YYYY')}
            </time>
          ) : (
            ''
          )}
          {!!categories.length && (
            <Fragment>
              <span>|</span>
              <div className="meta-categories">
                {categories.map((cat, index) => (
                  <span
                    key={cat.category}
                    className="SinglePost--Meta--Category"
                  >
                    {cat.category}
                    {/* Add a comma on all but last category */}
                    {index !== categories.length - 1 ? ',' : ''}
                  </span>
                ))}
              </div>
            </Fragment>
          )}
        </div>
        {contentType === 'happySailors' && (
          <p className="PostCard--Subtitle">{title}</p>
        )}
        {icon && <Image src={icon} alt="" />}
        {cruiseType ? (
          <h3 className="PostCard--Title">{cruiseType}</h3>
        ) : (
          <h3 className="PostCard--Title">{title}</h3>
        )}
        {excerpt && (
          <Fragment>
            <p className="excerpt">{excerpt.slice(0, 70) + '...'}</p>
            <p className="button">
              Read More <ICONButtonArrows />
            </p>
          </Fragment>
        )}
      </div>
    </Link>
  )
}

export default PostCard
