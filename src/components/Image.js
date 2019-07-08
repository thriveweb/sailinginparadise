import React from 'react'
import _get from 'lodash/get'

import './Image.css'

const extractChildImageSharp = (src = '', format) => {
  if (!format) {
    if (typeof src === 'string' && !format) return src
    const childImageSharp = _get(src, 'childImageSharp')
    if (!childImageSharp) return _get(src, 'publicURL')
  }
  if (format === 'sizes' || format === 'resolutions')
    return _get(src, `childImageSharp.${format}`)
  return src
}

class Image extends React.Component {
  render() {
    let {
      background,
      backgroundSize = 'cover',
      className = '',
      src,
      source,
      onClick,
      sizes,
      alt
    } = this.props

    const imageSrc = extractChildImageSharp(src || source)

    if (background) {
      let style = {}

      if (typeof imageSrc === 'string') {
        style = { backgroundImage: `url(${imageSrc})`, backgroundSize }
      }

      return (
        <div className={`BackgroundImage absolute ${className}`} style={style}>
          {!style.backgroundImage && (
            <Image
              src={imageSrc}
              alt={alt}
              style={{
                position: 'absolute',
                width: 'auto',
                height: 'auto'
              }}
              imgStyle={{
                objectFit: backgroundSize
              }}
            />
          )}
        </div>
      )
    }

    return (
      <img
        className={`Image ${className}`}
        src={imageSrc}
        sizes={sizes || '100vw'}
        onClick={onClick}
        alt={alt}
      />
    )
  }
}

Image.propTypes = {
  alt: PropTypes.string.isRequired
}

export default Image