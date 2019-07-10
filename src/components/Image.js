import React from 'react'

import './Image.css'

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

    const imageSrc = src || source

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

export default Image